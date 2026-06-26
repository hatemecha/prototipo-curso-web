<?php

namespace App\Filament\Resources\Exams\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ExamForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('course_id')
                    ->label('Curso')
                    ->relationship('course', 'title')
                    ->searchable()
                    ->preload()
                    ->unique(table: 'exams', column: 'course_id', ignoreRecord: true)
                    ->validationMessages([
                        'unique' => 'Este curso ya tiene un examen asociado.',
                    ])
                    ->required(),
                TextInput::make('title')
                    ->label('Título')
                    ->required()
                    ->maxLength(255),
                TextInput::make('passing_score')
                    ->label('Puntaje mínimo de aprobación')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100)
                    ->default(70)
                    ->required(),
                TextInput::make('max_attempts')
                    ->label('Máximo de intentos')
                    ->numeric()
                    ->minValue(1)
                    ->helperText('Dejar vacío para intentos ilimitados.'),
                Toggle::make('is_active')
                    ->label('Activo')
                    ->default(true),
            ]);
    }
}
