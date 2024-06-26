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
        Schema::create('user_activities', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable();
            $table->foreignId('activity_id')->constrained('activities');
            $table->integer('duree_par_min');
            $table->integer('nbr_fois');
            $table->integer('consomation');
            $table->string('points');
            $table->string('ideal_rate');
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
        Schema::dropIfExists('user_activities');
    }
};
