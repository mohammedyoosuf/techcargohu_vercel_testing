<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Statamic\Statamic;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Force HTTPS for all URLs when in production
        if (config('app.env') === 'production' || config('app.force_https')) {
            URL::forceScheme('https');
        }
        
        // Statamic::script('app', 'cp');
        // Statamic::style('app', 'cp');
    }
}