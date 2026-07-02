<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\ContactController;

/*
|--------------------------------------------------------------------------
| Estimate Routes
|--------------------------------------------------------------------------
|
| Here is where you can register the routes for your estimate calculator.
| These routes are loaded by the RouteServiceProvider.
|
*/

Route::post('/submit-estimate', [EstimateController::class, 'store']);

Route::post('/submit-contact', [ContactController::class, 'store']);

Route::get('/estimates', [EstimateController::class, 'index']);

Route::get('/estimates/{id}', [EstimateController::class, 'show']);