<?php

use Illuminate\Support\Facades\Route;
use Statamic\Facades\Entry;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route::statamic('/', 'home');

// // Route::get('/about', function () {
// //     return view('about');
// // });


// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);


Route::statamic('/calculator', 'calculator', ['title' => 'Pricing Calculator']);


Route::get('/privacy-policy', function () {
    return view('privacy-policy');
});

// Temporary route for local testing

// Route::view('/yoosuf-test', 'frontend');
// Route::statamic('/yoosuf-test', 'frontend');
Route::get('/yoosuf-test', function () {
    return view('frontend');
});
Route::statamic('frontend', 'frontend', ['layout' => 'layout']);
// Route::statamic('frontend', 'frontend', ['layout' => false]);