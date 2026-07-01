<?php

namespace App\Listeners;

use App\Services\ZohoCRMService;
use Illuminate\Support\Facades\Log;

class ContactFormSubmitted
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param object $event
     * @return void
     */
    public function handle($event)
    {
        // Check if listener is firing
        Log::info('ContactFormSubmitted listener fired.');

        $form = $event->submission->form();

        // Only process the contact_us form
        if ($form->handle() !== 'contact_us') {
            return;
        }

        $submission = $event->submission;

        // country_code is stored as e.g. "🇱🇰 SL  (  +94 )" — pull out just the dial code
        preg_match('/\+\d+/', (string) $submission->get('country_code'), $matches);
        $dialCode = $matches[0] ?? '';

        $mobileNumber = preg_replace('/\D/', '', (string) $submission->get('mobile_number'));

        // Get submitted form values
        $data = [
            'name'    => $submission->get('name'),
            'email'   => $submission->get('email'),
            'phone'   => trim($dialCode . ' ' . $mobileNumber),
            'message' => $submission->get('message'),
        ];

        try {

            $zoho = new ZohoCRMService();

            // Convert to Zoho Lead format
            $leadData = $zoho->mapContactFormToLead($data);

            Log::info('Zoho Lead Data', $leadData);

            // Create Lead
            $result = $zoho->createLead($leadData);

            

            Log::info('Zoho Response', $result);

if ($result['success']) {
    Log::info('Contact Form Lead created successfully.');
} else {
    Log::error('Contact Form Lead failed.', [
        'error' => $result['error']
    ]);
}

        } catch (\Exception $e) {

            Log::error('❌ Contact Form Zoho Exception: ' . $e->getMessage());

        }
    }
}