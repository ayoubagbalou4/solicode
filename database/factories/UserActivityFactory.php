<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserActivity>
 */
class UserActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'activity_id' => $this->faker->numberBetween(1, 3), // Assuming Activity model exists
            'duree_par_min' => $this->faker->numberBetween(1, 20),
            'nbr_fois' => $this->faker->numberBetween(1, 5),
            'consomation' => $this->faker->numberBetween(10, 20),
            'points' => $this->faker->numberBetween(1, 5),
            'ideal_rate' => 10,
            "created_at" => $this->faker->dateTimeBetween('2024-01-01', '2024-12-31'),
            "updated_at" => $this->faker->dateTimeBetween('2024-01-01', '2024-12-31'),
        ];
    }
}
