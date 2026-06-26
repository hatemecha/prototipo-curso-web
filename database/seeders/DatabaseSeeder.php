<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\LessonMaterial;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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
        $this->call(ExamSeeder::class);

        $ecografia = Course::where('slug', 'introduccion-a-la-ecografia-clinica')->first();

        if ($ecografia) {
            $student->enrollments()->firstOrCreate(
                ['course_id' => $ecografia->id],
                [
                    'status' => 'active',
                    'enrolled_at' => now(),
                ],
            );

            $firstLesson = $ecografia->lessons()->orderBy('order')->first();

            if ($firstLesson) {
                $student->lessonProgress()->updateOrCreate(
                    ['lesson_id' => $firstLesson->id],
                    [
                        'course_id' => $ecografia->id,
                        'completed_at' => now(),
                    ],
                );

                $this->seedMaterial(
                    $firstLesson,
                    'Guía de introducción al ultrasonido',
                    'lesson-materials/guia-ultrasonido.pdf',
                    true,
                );
            }
        }

        $radiologia = Course::where('slug', 'radiologia-toracica-basica')->first();

        if ($radiologia) {
            $radioLesson = $radiologia->lessons()->orderBy('order')->first();

            if ($radioLesson) {
                $this->seedMaterial(
                    $radioLesson,
                    'Checklist de lectura de Rx de tórax',
                    'lesson-materials/checklist-rx-torax.pdf',
                    false,
                );
            }
        }
    }

    private function seedMaterial($lesson, string $title, string $path, bool $downloadable): void
    {
        if (! Storage::disk(LessonMaterial::DISK)->exists($path)) {
            Storage::disk(LessonMaterial::DISK)->put(
                $path,
                "%PDF-1.4\nMaterial de prueba: {$title}\n",
            );
        }

        $lesson->materials()->updateOrCreate(
            ['title' => $title],
            [
                'file_path' => $path,
                'file_type' => strtolower(pathinfo($path, PATHINFO_EXTENSION)),
                'is_downloadable' => $downloadable,
            ],
        );
    }
}
