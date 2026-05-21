<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ZohoCRMService
{
    private $client;
    private $clientId;
    private $clientSecret;
    private $refreshToken;
    private $accountsUrl;
    private $apiUrl;

    public function __construct()
    {
        $this->client = new Client();
        $this->clientId = env('ZOHO_CLIENT_ID');
        $this->clientSecret = env('ZOHO_CLIENT_SECRET');
        $this->refreshToken = env('ZOHO_REFRESH_TOKEN');

        // Region-aware URLs
        $this->accountsUrl = rtrim(env('ZOHO_ACCOUNTS_URL', 'https://accounts.zoho.com'), '/');
        $this->apiUrl      = rtrim(env('ZOHO_API_URL', 'https://www.zohoapis.com'), '/');
    }

    /**
     * Retrieve a valid Zoho access token with safe caching
     */
    private function getAccessToken()
    {
        $token = Cache::get('zoho_access_token');

        if ($token) {
            return $token;
        }

        // Generate a fresh token
        try {
            $response = $this->client->post($this->accountsUrl . '/oauth/v2/token', [
                'form_params' => [
                    'refresh_token' => $this->refreshToken,
                    'client_id'     => $this->clientId,
                    'client_secret' => $this->clientSecret,
                    'grant_type'    => 'refresh_token',
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if (!isset($data['access_token'])) {
                throw new \Exception('Zoho did not return an access token.');
            }

            $token = $data['access_token'];

            // Cache for 55 minutes
            Cache::put('zoho_access_token', $token, 55 * 60);

            Log::info('Zoho: New access token generated.');

            return $token;

        } catch (\Exception $e) {
            Log::error('Zoho: Failed to fetch access token - ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Create a Lead in Zoho CRM
     */
    public function createLead(array $leadData)
    {
        try {
            $accessToken = $this->getAccessToken();

            $response = $this->client->post($this->apiUrl . '/crm/v2/Leads', [
                'headers' => [
                    'Authorization' => 'Zoho-oauthtoken ' . $accessToken,
                    'Content-Type'  => 'application/json',
                ],
                'json' => [
                    'data' => [$leadData],
                    'trigger' => ['approval', 'workflow', 'blueprint'],
                ],
            ]);

            $result = json_decode($response->getBody()->getContents(), true);

            // Handle Zoho validation errors
            if (isset($result['data'][0]['status']) && $result['data'][0]['status'] === 'error') {
                throw new \Exception($result['data'][0]['message']);
            }

            Log::info('Zoho: Lead created successfully.', [
                'lead_id' => $result['data'][0]['details']['id'] ?? null
            ]);

            return [
                'success' => true,
                'data'    => $result,
            ];

        } catch (\Exception $e) {
            Log::error('Zoho: Failed to create lead - ' . $e->getMessage());

            return [
                'success' => false,
                'error'   => $e->getMessage(),
            ];
        }
    }

    /**
     * Map estimate values to Zoho Lead structure, including custom Deal fields
     */
    public function mapEstimateToLead(array $estimate)
    {
        // Split user name
        $nameParts = explode(' ', $estimate['user_name'], 2);
        $firstName = $nameParts[0] ?? 'Customer';
        $lastName  = $nameParts[1] ?? 'User';

        return [
            'First_Name' => $firstName,
            'Last_Name'  => $lastName,
            'Company'    => $estimate['organization_name'] ?: 'N/A',
            'Email'      => $estimate['email'],
            'Phone'      => $estimate['phone'],
            'Lead_Source' => 'Website Calculator',

            // Full description
            'Description' => $this->buildDescription($estimate),

            // 🔥 Custom fields to pass through Lead → Deal conversion
            'Type_of_Container' => $estimate['container_type'],
            'No_of_Containers'  => $estimate['num_containers'],
            'Expected_Volume'   => $estimate['cbm'],     // "Expected Volume (min 15 days)"
            'Amount'            => $estimate['price_30_days'], // Deal → Amount
        ];
    }

    /**
     * Build formatted text description
     */
    private function buildDescription(array $estimate)
    {
        return collect([
            'Product Type' => $estimate['product_type'],
            'Service Time' => $estimate['service_time'],
            'Container Type' => $estimate['container_type'] . ' Footer',
            'Number of Containers' => $estimate['num_containers'],
            'Total CBM' => number_format($estimate['cbm'], 2),
            'Estimated Cost (30 days)' => 'Rs. ' . number_format($estimate['price_30_days'], 2),
        ])
        ->map(fn ($v, $k) => "$k: $v")
        ->implode("\n");
    }
    /**
     * Map warehouse estimate values to Zoho Lead structure
     */
    public function mapWarehouseEstimateToLead(array $data)
    {
        // Split user name
        $nameParts = explode(' ', $data['yourName'], 2);
        $firstName = $nameParts[0] ?? 'Customer';
        $lastName  = $nameParts[1] ?? 'User';

        $stepOne = $data['stepOne'];
        $result = $data['result'];

        return [
            'First_Name' => $firstName,
            'Last_Name'  => $lastName,
            'Company'    => $data['organizationName'] ?: 'N/A',
            'Email'      => $data['email'],
            'Phone'      => $data['phone'],
            'Lead_Source' => 'Warehouse Calculator',

            // Full description
            'Description' => $this->buildWarehouseDescription($data),

            // 🔥 Custom fields to pass through Lead → Deal conversion
            'Type_of_Container' => $stepOne['containerType'] ?? null,
            'No_of_Containers'  => null, 
            'Expected_Volume'   => $stepOne['cbm'] ?? null,
            'Amount'            => $result['monthlyTotalCost'] ?? null,
        ];
    }

    /**
     * Build formatted text description for Warehouse Calculator
     */
    private function buildWarehouseDescription(array $data)
    {
        $stepOne = $data['stepOne'];
        $result = $data['result'];

        return collect([
            'Product Type' => $data['productTypeLabel'],
            'Weight Range' => $stepOne['productWeight'],
            'CBM' => $stepOne['cbm'],
            'Days' => $stepOne['days'],
            'Container Type' => $stepOne['containerType'],
            'Monthly Total Cost' => 'Rs. ' . number_format($result['monthlyTotalCost'] ?? 0, 2),
            'Estimated Total Cost' => 'Rs. ' . number_format($result['totalCost'] ?? 0, 2),
        ])
        ->filter(fn($v) => !empty($v))
        ->map(fn ($v, $k) => "$k: $v")
        ->implode("\n");
    }
}
