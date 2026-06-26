<?php

namespace App\Filament\Resources\CourseEnrollments\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class CourseEnrollmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Alumno')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('course_id')
                    ->label('Curso')
                    ->relationship('course', 'title')
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('status')
                    ->label('Estado')
                    ->options([
                        'active' => 'Activa',
                        'cancelled' => 'Cancelada',
                        'expired' => 'Expirada',
                    ])
                    ->default('active')
                    ->required(),
                DateTimePicker::make('enrolled_at')
                    ->label('Fecha de inscripción')
                    ->default(now()),
            ]);
    }
}
