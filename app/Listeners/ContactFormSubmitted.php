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

        // Get submitted form values
        $data = [
            'name'    => $submission->get('name'),
            'email'   => $submission->get('email'),
            'phone'   => trim($submission->get('country_code') . ' ' . $submission->get('mobile_number')),
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