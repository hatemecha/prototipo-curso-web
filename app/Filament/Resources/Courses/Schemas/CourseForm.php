<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Título del curso')
                    ->placeholder('Ej.: Introducción a la ecografía clínica')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (string $operation, $state, callable $set) {
                        if ($operation === 'create') {
                            $set('slug', Str::slug($state));
                        }
                    }),
                TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true)
                    ->helperText('Se genera automáticamente desde el título; podés editarlo.'),
                Textarea::make('description')
                    ->label('Descripción para el alumno')
                    ->rows(4)
                    ->columnSpanFull(),
                TextInput::make('price')
                    ->label('Precio')
                    ->numeric()
                    ->minValue(0)
                    ->default(0)
                    ->prefix('$')
                    ->required(),
                Select::make('status')
                    ->label('Estado')
                    ->helperText('Publicá el curso cuando su contenido y evaluación estén listos.')
                    ->options([
                        'draft' => 'Borrador',
                        'published' => 'Publicado',
                    ])
                    ->default('draft')
                    ->required(),
                FileUpload::make('cover_image')
                    ->label('Imagen de portada')
                    ->image()
                    ->directory('course-covers')
                    ->columnSpanFull(),
            ]);
    }
}
