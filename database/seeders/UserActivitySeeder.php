<?php

namespace Database\Seeders;

use App\Models\UserActivity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserActivity::create([
            "activity_id" => 1,
            "duree_par_min" => 10,
            "nbr_fois" => 1,
            "consomation" => 5,
            "points" => "3",
            "ideal_rate" => "10",
            "created_at" => "2024-04-16T16:01:48.000000Z",
        ]);
    }
}
