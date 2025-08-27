<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estimate;

class EstimateController extends Controller
{
    public function store(Request $request)
    {
       // 1. Validate updated input fields
        $validated = $request->validate([
            'container_type'  => 'required|string|in:20,40', // Validate against specific values
            'num_containers'  => 'required|numeric|min:1|max:4',
            'organization_name' => 'required|string',
            'user_name'       => 'required|string',
            'email'           => 'required|email',
            'phone'           => 'required|string',
            'product_type'    => 'required|string',
            'service_time'    => 'required|string',
        ]);

        // 2. Calculate CBM based on the new logic
        $cbm = 0;
        $baseCBM = 0;
        if ($validated['container_type'] === '40') {
            $baseCBM = 60; // 40 footer = 60 CBM
        } elseif ($validated['container_type'] === '20') {
            $baseCBM = 30; // 20 footer = 30 CBM
        }
        $cbm = $baseCBM * $validated['num_containers'];


        // 3. Calculate price based on total CBM
        // NOTE: The pricing model has been changed from per-unit to per-CBM.
        // You may need to adjust this rate to match your business requirements.
        $pricePerCBMFor15Days = 1500; // Example: Rs. 1500 per CBM for 15 days
        $pricePerCBMFor30Days = 2800; // Example: Rs. 2800 per CBM for 30 days (slight discount)

        $price_15_days = $pricePerCBMFor15Days * $cbm;
        $price_30_days = $pricePerCBMFor30Days * $cbm;


        // 4. Save to database with new fields
        $estimate = Estimate::create([
            'container_type'    => $validated['container_type'],
            'num_containers'    => $validated['num_containers'],
            'cbm'               => $cbm,
            'price_15_days'     => $price_15_days,
            'price_30_days'     => $price_30_days,
            'organization_name' => $validated['organization_name'],
            'user_name'         => $validated['user_name'],
            'email'             => $validated['email'],
            'phone'             => $validated['phone'],
            'product_type'      => $validated['product_type'],
            'service_time'      => $validated['service_time'],
        ]);

        // 5. Return response
        return response()->json([
            'success' => true,
            'estimate' => $estimate,
        ]);
    }

    // 7. Retrieve all estimates ordered by newest first
    public function index()
    {
        
        $estimates = Estimate::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $estimates
        ]);
    }

    // 8. To get the data by ID
    public function show($id)
{
    $estimate = Estimate::find($id);

    if (!$estimate) {
        return response()->json([
            'success' => false,
            'message' => 'Estimate not found'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $estimate
    ]);
}

}
