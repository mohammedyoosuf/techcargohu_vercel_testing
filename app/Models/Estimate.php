<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estimate extends Model
{
    use HasFactory;

protected $fillable = [
    'container_type',
    'num_containers',
    'cbm',
    'price_15_days',
    'price_30_days',
    'organization_name',
    'user_name',
    'email',
    'phone',
    'product_type',
    'service_time',
];
}
