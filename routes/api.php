<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EstimateController;

Route::post('/submit-estimate', [EstimateController::class, 'store']);
Route::get('/estimates', [EstimateController::class, 'index']);
Route::get('/estimates/{id}', [EstimateController::class, 'show']);
