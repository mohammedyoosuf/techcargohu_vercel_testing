<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ZohoCRMService;
use Illuminate\Support\Facades\Log;
use Throwable;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string',
            'email'         => 'required|email',
            'country_code'  => 'nullable|string',
            'mobile_number' => 'required|string',
            'message'       => 'required|string',
        ]);

        // country_code is stored as e.g. "🇱🇰 SL  (  +94 )" — pull out just the dial code
        preg_match('/\+\d+/', (string) ($validated['country_code'] ?? ''), $matches);
        $dialCode = $matches[0] ?? '';

        $mobileNumber = preg_replace('/\D/', '', $validated['mobile_number']);
        $phone = trim($dialCode . ' ' . $mobileNumber);

        try {
            $zoho = new ZohoCRMService();
            $leadData = $zoho->mapContactFormToLead([
                'name'    => $validated['name'],
                'email'   => $validated['email'],
                'phone'   => $phone,
                'message' => $validated['message'],
            ]);
            $zohoResult = $zoho->createLead($leadData);

            if (!$zohoResult['success']) {
                Log::error('❌ Failed to create contact form lead in Zoho CRM', ['error' => $zohoResult['error']]);

                return response()->json([
                    'success' => false,
                    'message' => 'An unexpected error occurred. Please try again later.',
                ], 500);
            }

            Log::info('✅ Contact form lead successfully created in Zoho CRM');

            return response()->json([
                'success' => true,
                'message' => 'Our team will contact you soon.',
            ]);

        } catch (Throwable $e) {
            Log::error('Contact form submission failed: ' . $e->getMessage() . ' in ' . $e->getFile() . ' on line ' . $e->getLine());
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred. Please try again later.',
            ], 500);
        }
    }
}
