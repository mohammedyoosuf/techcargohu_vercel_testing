<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EstimateController;

Route::post('/submit-estimate', [EstimateController::class, 'store']);
Route::post('/submit-warehouse-estimate', [EstimateController::class, 'storeWarehouseEstimate']);
Route::get('/estimates', [EstimateController::class, 'index']);
Route::get('/estimates/{id}', [EstimateController::class, 'show']);
