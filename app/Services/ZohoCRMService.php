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

    public function __construct()
    {
        $this->client = new Client();
        $this->clientId = env('ZOHO_CLIENT_ID');
        $this->clientSecret = env('ZOHO_CLIENT_SECRET');
        $this->refreshToken = env('ZOHO_REFRESH_TOKEN');
    }

    /**
     * Get valid access token (with caching)
     */
    private function getAccessToken()
    {
        // Check cache first (tokens valid for 1 hour)
        return Cache::remember('zoho_access_token', 55 * 60, function () {
            try {
                $response = $this->client->post('https://accounts.zoho.com/oauth/v2/token', [
                    'form_params' => [
                        'refresh_token' => $this->refreshToken,
                        'client_id' => $this->clientId,
                        'client_secret' => $this->clientSecret,
                        'grant_type' => 'refresh_token',
                    ],
                ]);

                $data = json_decode($response->getBody()->getContents(), true);
                Log::info('Zoho: New access token generated');
                
                return $data['access_token'];
            } catch (\Exception $e) {
                Log::error('Zoho: Failed to get access token - ' . $e->getMessage());
                throw $e;
            }
        });
    }

    /**
     * Create a lead in Zoho CRM
     */
    public function createLead(array $leadData)
    {
        try {
            $accessToken = $this->getAccessToken();

            $response = $this->client->post('https://www.zohoapis.com/crm/v2/Leads', [
                'headers' => [
                    'Authorization' => 'Zoho-oauthtoken ' . $accessToken,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'data' => [$leadData],
                    'trigger' => ['approval', 'workflow', 'blueprint'],
                ],
            ]);

            $result = json_decode($response->getBody()->getContents(), true);
            
            Log::info('Zoho: Lead created successfully', ['lead_id' => $result['data'][0]['details']['id'] ?? null]);
            
            return [
                'success' => true,
                'data' => $result,
            ];
        } catch (\Exception $e) {
            Log::error('Zoho: Failed to create lead - ' . $e->getMessage());
            
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Map estimate data to Zoho Lead format
     */
    public function mapEstimateToLead(array $estimate)
    {
        // Split name into First and Last (Zoho requires both)
        $nameParts = explode(' ', $estimate['user_name'], 2);
        $firstName = $nameParts[0] ?? 'N/A';
        $lastName = $nameParts[1] ?? $nameParts[0]; // Use first name as last if no last name

        return [
            'First_Name' => $firstName,
            'Last_Name' => $lastName,
            'Company' => $estimate['organization_name'],
            'Email' => $estimate['email'],
            'Phone' => $estimate['phone'],
            'Lead_Source' => 'Website Calculator',
            'Description' => $this->buildDescription($estimate),
            // Custom fields (if you have them in Zoho)
            // 'Container_Type' => $estimate['container_type'],
            // 'Number_of_Containers' => $estimate['num_containers'],
        ];
    }

    /**
     * Build description with all estimate details
     */
    private function buildDescription(array $estimate)
    {
        return sprintf(
            "Product Type: %s\n" .
            "Service Time: %s\n" .
            "Container Type: %s\n" .
            "Number of Containers: %d\n" .
            "Total CBM: %.2f\n" .
            "Estimated Cost (30 days): Rs. %s\n",
            $estimate['product_type'],
            $estimate['service_time'],
            $estimate['container_type'] . ' Footer',
            $estimate['num_containers'],
            $estimate['cbm'],
            number_format($estimate['price_30_days'], 2)
        );
    }
}