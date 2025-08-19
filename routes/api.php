<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EstimateController;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;

Route::post('/submit-estimate', [EstimateController::class, 'store']);
Route::get('/estimates', [EstimateController::class, 'index']); // Added for history retrieval
Route::get('/estimates/{id}', [EstimateController::class, 'show']);




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/send-quotation', function (Request $request) {

    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'fullPayload' => 'required|array'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validation failed.',
            'errors' => $validator->errors()
        ], 422);
    }

    $validatedData = $validator->validated();
    
    try {
        $apiKey = env('RESEND_API_KEY');

        if (empty($apiKey)) {
            throw new \Exception('RESEND_API_KEY is not set in your .env file.');
        }

        $htmlContent = View::make('emails.quotation', ['data' => $validatedData['fullPayload']])->render();

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])->post('https://api.resend.com/emails', [
            'from' => 'onboarding@resend.dev',
            'to' => ['wpslakshitha@gmail.com'],
            'subject' => 'Warehousing Quotation from Tech Cargo Hub',
            'html' => $htmlContent,
        ]);

        if ($response->failed()) {
            throw new \Exception('Resend API returned an error: ' . $response->body());
        }

        return response()->json(['success' => true, 'message' => 'Test email sent successfully!']);

    } catch (\Exception $e) {
        \Log::error('Resend HTTP Error: ' . $e->getMessage());
        return response()->json([
            'success' => false, 
            'message' => 'Failed to send test email. Server error: ' . $e->getMessage()
        ], 500);
    }
});