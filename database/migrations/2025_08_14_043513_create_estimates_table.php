<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   public function up()
{
    Schema::create('estimates', function (Blueprint $table) {
        $table->id();
        $table->string('packing_type');
        $table->string('container_type');
        $table->integer('units');
        $table->decimal('cbm', 8, 2);
        $table->decimal('price_15_days', 10, 2);
        $table->decimal('price_30_days', 10, 2);
        $table->string('organization_name');
        $table->string('user_name');
        $table->string('email');
        $table->string('phone');
        $table->string('product_type');
        $table->string('service_time');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estimates');
    }
};
