<?php

namespace App\Filament\Resources\LessonProgress\Tables;

use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class LessonProgressTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('completed_at', 'desc')
            ->columns([
                TextColumn::make('user.name')
                    ->label('Alumno')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('course.title')
                    ->label('Curso')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('lesson.title')
                    ->label('Clase')
                    ->searchable(),
                IconColumn::make('completed_at')
                    ->label('Completada')
                    ->boolean()
                    ->getStateUsing(fn ($record): bool => $record->completed_at !== null),
                TextColumn::make('completed_at')
                    ->label('Fecha')
                    ->dateTime()
                    ->sortable()
                    ->placeholder('—'),
            ])
            ->filters([
                SelectFilter::make('course_id')
                    ->label('Curso')
                    ->relationship('course', 'title')
                    ->searchable()
                    ->preload(),
                SelectFilter::make('user_id')
                    ->label('Alumno')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload(),
            ]);
    }
}
