<?php

namespace App\Filament\Resources\ExamAttempts\Tables;

use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ExamAttemptsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('submitted_at', 'desc')
            ->columns([
                TextColumn::make('user.name')
                    ->label('Alumno')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('exam.title')
                    ->label('Examen')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('exam.course.title')
                    ->label('Curso')
                    ->searchable(),
                TextColumn::make('score')
                    ->label('Score')
                    ->suffix('%'),
                TextColumn::make('status')
                    ->label('Estado')
                    ->badge()
                    ->colors([
                        'success' => 'passed',
                        'danger' => 'failed',
                        'gray' => 'in_progress',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'passed' => 'Aprobado',
                        'failed' => 'Desaprobado',
                        'in_progress' => 'En progreso',
                        default => $state,
                    }),
                TextColumn::make('submitted_at')
                    ->label('Enviado')
                    ->dateTime()
                    ->placeholder('—')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('exam_id')
                    ->label('Examen')
                    ->relationship('exam', 'title')
                    ->searchable()
                    ->preload(),
                SelectFilter::make('status')
                    ->label('Estado')
                    ->options([
                        'in_progress' => 'En progreso',
                        'passed' => 'Aprobado',
                        'failed' => 'Desaprobado',
                    ]),
            ])
            ->recordActions([
                ViewAction::make(),
            ]);
    }
}
