<?php

namespace App\Filament\Resources\Lessons\Schemas;

use App\Models\CourseModule;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Collection;

class LessonForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('course_id')
                    ->relationship('course', 'title')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->live()
                    ->afterStateUpdated(fn (callable $set) => $set('course_module_id', null)),
                Select::make('course_module_id')
                    ->label('Módulo')
                    ->options(function (callable $get): Collection {
                        $courseId = $get('course_id');

                        if (! $courseId) {
                            return collect();
                        }

                        return CourseModule::query()
                            ->where('course_id', $courseId)
                            ->orderBy('order')
                            ->pluck('title', 'id');
                    })
                    ->searchable()
                    ->preload()
                    ->helperText('Opcional. Se filtra según el curso elegido.'),
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Textarea::make('description')
                    ->rows(2)
                    ->columnSpanFull(),
                Textarea::make('content')
                    ->rows(6)
                    ->columnSpanFull(),
                TextInput::make('video_url')
                    ->url()
                    ->maxLength(255),
                TextInput::make('order')
                    ->numeric()
                    ->default(0)
                    ->required(),
            ]);
    }
}
