<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Estimate;

class EstimateController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validate input
        $validated = $request->validate([
            'packing_type'    => 'required|string',
            'container_type'  => 'required|string',
            'units'           => 'required|numeric',
            'organization_name' => 'required|string',
            'user_name'       => 'required|string',
            'email'           => 'required|email',
            'phone'           => 'required|string',
            'product_type'    => 'required|string',
            'service_time'    => 'required|string',
        ]);

        // 2. Calculate CBM
        $cbm = 0;
        if ($validated['packing_type'] === 'pallet') {
            $cbm = max(5, $validated['units']); // 1 pallet = 1 CBM, min 5
        } elseif ($validated['packing_type'] === 'carton') {
            $cbm = max(5, ceil($validated['units'] / 15)); // 15 cartons = 1 CBM, min 5
        }

        // 3. Adjust for container type
        if ($validated['container_type'] === 'LCL') {
            $cbm = max($cbm, 5); // min 5 CBM
        } elseif ($validated['container_type'] === '20"') {
            $cbm = min($cbm, 30); // max 30 CBM
        } elseif ($validated['container_type'] === '40"') {
            $cbm = min($cbm, 60); // max 60 CBM
        }

        // 4. Calculate price
        $pricePerCBM = 118;
        $price_15_days = $pricePerCBM * $validated['units'] * 15;
        $price_30_days = $pricePerCBM * $validated['units'] * 30;

        // 5. Save to database
        $estimate = Estimate::create([
            'packing_type'      => $validated['packing_type'],
            'container_type'    => $validated['container_type'],
            'units'             => $validated['units'],
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

        // 6. Return response
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
