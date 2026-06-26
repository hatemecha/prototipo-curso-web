<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class ExamSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedExam('introduccion-a-la-ecografia-clinica', 'Evaluación básica de ecografía', [
            [
                'q' => '¿Qué tipo de onda utiliza la ecografía?',
                'options' => [
                    ['Ondas sonoras de alta frecuencia', true],
                    ['Radiación ionizante', false],
                    ['Ondas de radio', false],
                    ['Luz infrarroja', false],
                ],
            ],
            [
                'q' => '¿Qué transductor conviene para estructuras superficiales?',
                'options' => [
                    ['Lineal de alta frecuencia', true],
                    ['Convexo de baja frecuencia', false],
                    ['Sectorial cardíaco', false],
                    ['Endocavitario', false],
                ],
            ],
            [
                'q' => '¿Qué fenómeno físico genera la imagen ecográfica?',
                'options' => [
                    ['La reflexión del ultrasonido en las interfaces', true],
                    ['La absorción de rayos X', false],
                    ['El campo magnético', false],
                    ['La emisión de positrones', false],
                ],
            ],
        ]);

        $this->seedExam('radiologia-toracica-basica', 'Evaluación básica de radiología torácica', [
            [
                'q' => '¿Qué signo sugiere condensación alveolar?',
                'options' => [
                    ['Broncograma aéreo', true],
                    ['Líneas B', false],
                    ['Signo del menisco', false],
                    ['Doble contorno cardíaco', false],
                ],
            ],
            [
                'q' => '¿Qué evalúa el criterio de penetración en una Rx de tórax?',
                'options' => [
                    ['La visualización de los cuerpos vertebrales tras el corazón', true],
                    ['La rotación del paciente', false],
                    ['El grado de inspiración', false],
                    ['La magnificación cardíaca', false],
                ],
            ],
            [
                'q' => '¿Qué hallazgo es típico del neumotórax?',
                'options' => [
                    ['Ausencia de trama pulmonar periférica', true],
                    ['Broncograma aéreo', false],
                    ['Cardiomegalia', false],
                    ['Derrame subpulmonar', false],
                ],
            ],
        ]);
    }

    private function seedExam(string $courseSlug, string $title, array $questions): void
    {
        $course = Course::where('slug', $courseSlug)->first();

        if (! $course) {
            return;
        }

        $exam = $course->exam()->updateOrCreate(
            [],
            [
                'title' => $title,
                'passing_score' => 70,
                'max_attempts' => null,
                'is_active' => true,
            ],
        );

        $exam->questions()->delete();

        foreach ($questions as $index => $questionData) {
            $question = $exam->questions()->create([
                'question_text' => $questionData['q'],
                'order' => $index + 1,
                'points' => 1,
            ]);

            foreach ($questionData['options'] as $optIndex => [$text, $isCorrect]) {
                $question->options()->create([
                    'option_text' => $text,
                    'is_correct' => $isCorrect,
                    'order' => $optIndex + 1,
                ]);
            }
        }
    }
}
