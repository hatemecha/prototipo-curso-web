<?php

namespace App\Filament\Resources\ExamQuestions\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ExamQuestionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('exam_id')
                    ->label('Examen')
                    ->relationship('exam', 'title')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->helperText('Preferentemente administrá las preguntas desde la edición del examen.'),
                Textarea::make('question_text')
                    ->label('Pregunta')
                    ->placeholder('Escribí una consigna clara y completa.')
                    ->required()
                    ->rows(2)
                    ->columnSpanFull(),
                TextInput::make('order')
                    ->label('Orden')
                    ->numeric()
                    ->minValue(0)
                    ->default(0)
                    ->required(),
                TextInput::make('points')
                    ->label('Puntos')
                    ->numeric()
                    ->minValue(1)
                    ->default(1)
                    ->required(),
                Repeater::make('options')
                    ->label('Opciones de respuesta')
                    ->relationship('options')
                    ->schema([
                        Textarea::make('option_text')
                            ->label('Opción')
                            ->placeholder('Texto de la respuesta')
                            ->required()
                            ->rows(1)
                            ->columnSpanFull(),
                        Toggle::make('is_correct')
                            ->label('Correcta'),
                        TextInput::make('order')
                            ->label('Orden')
                            ->numeric()
                            ->default(0),
                    ])
                    ->defaultItems(4)
                    ->minItems(2)
                    ->rules([
                        function (string $attribute, mixed $value, \Closure $fail): void {
                            $hasCorrectOption = collect($value ?? [])
                                ->contains(fn ($option): bool => (bool) data_get($option, 'is_correct'));

                            if (! $hasCorrectOption) {
                                $fail('Marcá al menos una opción correcta.');
                            }
                        },
                    ])
                    ->columnSpanFull()
                    ->helperText('Las opciones se administran dentro de la pregunta. Marcá al menos una como correcta.'),
            ]);
    }
}
