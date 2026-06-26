<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@minilms.test'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
        );

        $student = User::updateOrCreate(
            ['email' => 'alumno@minilms.test'],
            [
                'name' => 'Alumno Demo',
                'password' => Hash::make('password'),
                'role' => 'student',
            ],
        );

        $this->call(CourseSeeder::class);

        $ecografia = Course::where('slug', 'introduccion-a-la-ecografia-clinica')->first();

        if ($ecografia) {
            $student->enrollments()->firstOrCreate(
                ['course_id' => $ecografia->id],
                [
                    'status' => 'active',
                    'enrolled_at' => now(),
                ],
            );
        }
    }
}
