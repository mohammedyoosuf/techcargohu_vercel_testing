<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estimate;
use App\Services\ZohoCRMService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\QuotationMail;
use App\Mail\InternalNotificationMail;
use App\Mail\WarehouseQuotationMail;
use App\Mail\WarehouseInternalNotificationMail;
use Throwable;

class EstimateController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'container_type' => 'required|string|in:20,40',
            'num_containers' => 'required|numeric|min:1|max:4',
            'organization_name' => 'required|string',
            'user_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'product_type' => 'required|string',
            'service_time' => 'required|string',
        ]);

        try {
            // Calculate estimates
            $baseCBM = ($validated['container_type'] === '40') ? 60 : 30;
            $cbm = $baseCBM * $validated['num_containers'];
            $pricePerCBMPerDay = 118;
            $price_15_days = $cbm * $pricePerCBMPerDay * 15;
            $price_30_days = $cbm * $pricePerCBMPerDay * 30;

            $estimate = [
                'container_type' => $validated['container_type'],
                'num_containers' => $validated['num_containers'],
                'cbm' => $cbm,
                'price_15_days' => $price_15_days,
                'price_30_days' => $price_30_days,
                'organization_name' => $validated['organization_name'],
                'user_name' => $validated['user_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'product_type' => $validated['product_type'],
                'service_time' => $validated['service_time'],
            ];

            // Prepare email data
            $emailData = [
                'name' => $estimate['user_name'],
                'organization' => $estimate['organization_name'],
                'phone' => $estimate['phone'],
                'email' => $estimate['email'],
                'containerType' => $estimate['container_type'],
                'num_containers' => $estimate['num_containers'],
                'calculatedCBM' => $estimate['cbm'],
                'cost15Days' => $estimate['price_15_days'],
                'cost30Days' => $estimate['price_30_days'],
                'productType' => $estimate['product_type'],
                'serviceTime' => $estimate['service_time'],
            ];

            // Send emails
            Mail::to($estimate['email'])->send(new QuotationMail($emailData));
            
            $ownerEmail = env('COMPANY_OWNER_EMAIL', 'crm@techcargohub.com');
            Mail::to($ownerEmail)->send(new InternalNotificationMail($emailData));

            // Send to Zoho CRM
            try {
                $zohoCRM = new ZohoCRMService();
                $leadData = $zohoCRM->mapEstimateToLead($estimate);
                $zohoResult = $zohoCRM->createLead($leadData);
                
                if ($zohoResult['success']) {
                    Log::info('✅ Lead successfully created in Zoho CRM');
                } else {
                    Log::warning('⚠️ Failed to create lead in Zoho CRM', ['error' => $zohoResult['error']]);
                }
            } catch (\Exception $e) {
                // Don't fail the entire request if Zoho fails
                Log::error('❌ Zoho CRM integration error: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Estimate processed and emails sent successfully.',
                'estimate' => $estimate,
            ]);

        } catch (Throwable $e) {
            Log::error('Estimate processing failed: ' . $e->getMessage() . ' in ' . $e->getFile() . ' on line ' . $e->getLine());
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
            ], 500);
        }
    }

    public function storeWarehouseEstimate(Request $request)
    {
        $validated = $request->validate([
            'stepOne' => 'required|array',
            'presentCosts' => 'required|array',
            'businessDetails' => 'required|array',
            'result' => 'required|array',
            'productTypeLabel' => 'required|string',
        ]);

        try {
            $data = [
                'stepOne' => $validated['stepOne'],
                'presentCosts' => $validated['presentCosts'],
                'yourName' => $validated['businessDetails']['yourName'],
                'organizationName' => $validated['businessDetails']['organizationName'],
                'email' => $validated['businessDetails']['email'],
                'phone' => $validated['businessDetails']['phone'],
                'productTypeLabel' => $validated['productTypeLabel'],
                'result' => $validated['result'],
            ];

            // Debugging Mail Configuration
            Log::info('Attempting to send warehouse estimate emails.', [
                'recipient' => $data['email'],
                'mailer' => config('mail.default'),
                'host' => config('mail.mailers.smtp.host'),
                'port' => config('mail.mailers.smtp.port'),
                'username' => config('mail.mailers.smtp.username'),
                'encryption' => config('mail.mailers.smtp.encryption'),
                'from_address' => config('mail.from.address'),
            ]);

            // Send to customer
            Mail::to($data['email'])->send(new WarehouseQuotationMail($data));

            // Send to company
            $ownerEmail = env('COMPANY_OWNER_EMAIL', 'crm@techcargohub.com');
            Mail::to($ownerEmail)->send(new WarehouseInternalNotificationMail($data));

            // Log success
            Log::info('Warehouse estimate emails sent for: ' . $data['email']);

            // Send to Zoho CRM
            try {
                $zohoCRM = new ZohoCRMService();
                $leadData = $zohoCRM->mapWarehouseEstimateToLead($data);
                $zohoResult = $zohoCRM->createLead($leadData);
                
                if ($zohoResult['success']) {
                    Log::info('✅ Warehouse Lead successfully created in Zoho CRM');
                } else {
                    Log::warning('⚠️ Failed to create warehouse lead in Zoho CRM', ['error' => $zohoResult['error']]);
                }
            } catch (\Exception $e) {
                // Don't fail the entire request if Zoho fails
                Log::error('❌ Zoho CRM integration error: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Warehouse estimate processed and emails sent successfully.',
            ]);

        } catch (Throwable $e) {
            Log::error('Warehouse estimate processing failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to send emails, but your result is ready.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $estimates = Estimate::orderBy('created_at', 'desc')->get();
        return response()->json(['success' => true, 'data' => $estimates]);
    }

    public function show($id)
    {
        $estimate = Estimate::find($id);
        if (!$estimate) {
            return response()->json(['success' => false, 'message' => 'Estimate not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $estimate]);
    }
}