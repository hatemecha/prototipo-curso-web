<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            [
                'title' => 'Introducción a la Ecografía Clínica',
                'description' => 'Fundamentos de la ecografía aplicada a la práctica médica: física del ultrasonido, planos y artefactos.',
                'price' => 0,
                'status' => 'published',
                'modules' => [
                    [
                        'title' => 'Fundamentos físicos del ultrasonido',
                        'description' => 'Principios físicos básicos detrás de la formación de la imagen ecográfica.',
                        'lessons' => [
                            ['title' => '¿Qué es el ultrasonido?', 'content' => 'Definición y rango de frecuencias usadas en medicina.', 'video_url' => 'https://example.com/eco/1'],
                            ['title' => 'Interacción del sonido con los tejidos', 'content' => 'Reflexión, refracción y atenuación.', 'video_url' => 'https://example.com/eco/2'],
                        ],
                    ],
                    [
                        'title' => 'Manejo del equipo y planos básicos',
                        'description' => 'Uso del transductor y obtención de planos estándar.',
                        'lessons' => [
                            ['title' => 'Tipos de transductores', 'content' => 'Lineal, convexo y sectorial: cuándo usar cada uno.', 'video_url' => null],
                            ['title' => 'Planos longitudinal y transversal', 'content' => 'Orientación espacial y referencias anatómicas.', 'video_url' => 'https://example.com/eco/4'],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Radiología Torácica Básica',
                'description' => 'Lectura sistemática de la radiografía de tórax e identificación de patrones patológicos frecuentes.',
                'price' => 0,
                'status' => 'published',
                'modules' => [
                    [
                        'title' => 'Lectura sistemática de la Rx de tórax',
                        'description' => 'Método ordenado para no omitir hallazgos.',
                        'lessons' => [
                            ['title' => 'Criterios de calidad técnica', 'content' => 'Inspiración, rotación y penetración.', 'video_url' => 'https://example.com/rx/1'],
                            ['title' => 'Abordaje ABCDE', 'content' => 'Vía aérea, hueso, corazón, diafragma y campos pulmonares.', 'video_url' => 'https://example.com/rx/2'],
                        ],
                    ],
                    [
                        'title' => 'Patrones patológicos frecuentes',
                        'description' => 'Reconocimiento de condensación, derrame y neumotórax.',
                        'lessons' => [
                            ['title' => 'Patrón de condensación alveolar', 'content' => 'Signo de la silueta y broncograma aéreo.', 'video_url' => null],
                            ['title' => 'Derrame pleural y neumotórax', 'content' => 'Signos radiológicos diferenciales.', 'video_url' => 'https://example.com/rx/4'],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Diagnóstico por Imágenes Avanzado (Borrador)',
                'description' => 'Curso en preparación sobre TC y RM aplicadas al diagnóstico avanzado.',
                'price' => 49.99,
                'status' => 'draft',
                'modules' => [],
            ],
        ];

        foreach ($courses as $courseData) {
            $modules = $courseData['modules'];
            unset($courseData['modules']);

            $courseData['slug'] = Str::slug($courseData['title']);

            $course = Course::updateOrCreate(
                ['slug' => $courseData['slug']],
                $courseData,
            );

            foreach ($modules as $moduleIndex => $moduleData) {
                $lessons = $moduleData['lessons'];
                unset($moduleData['lessons']);

                $moduleData['order'] = $moduleIndex + 1;

                $module = $course->modules()->updateOrCreate(
                    ['title' => $moduleData['title']],
                    $moduleData,
                );

                foreach ($lessons as $lessonIndex => $lessonData) {
                    $lessonData['order'] = $lessonIndex + 1;
                    $lessonData['course_id'] = $course->id;

                    $module->lessons()->updateOrCreate(
                        ['title' => $lessonData['title']],
                        $lessonData,
                    );
                }
            }
        }
    }
}
