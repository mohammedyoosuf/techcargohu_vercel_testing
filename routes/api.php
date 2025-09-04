<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EstimateController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\QuotationMail;

Route::post('/submit-estimate', [EstimateController::class, 'store']);
Route::get('/estimates', [EstimateController::class, 'index']);
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
        Mail::to($validatedData['email'])->send(new QuotationMail($validatedData['fullPayload']));

        return response()->json(['success' => true, 'message' => 'Quotation sent successfully!']);

    } catch (\Exception $e) {
        \Log::error('Mail Sending Error: ' . $e->getMessage());
        return response()->json([
            'success' => false, 
            'message' => 'Failed to send quotation. Server error: ' . $e->getMessage()
        ], 500);
    }
});