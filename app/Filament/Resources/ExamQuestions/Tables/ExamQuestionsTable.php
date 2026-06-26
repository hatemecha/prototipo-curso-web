<?php

namespace App\Filament\Resources\ExamQuestions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ExamQuestionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('order')
            ->columns([
                TextColumn::make('exam.title')
                    ->label('Examen')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('question_text')
                    ->label('Pregunta')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('order')
                    ->label('Orden')
                    ->sortable(),
                TextColumn::make('points')
                    ->label('Puntos'),
                TextColumn::make('options_count')
                    ->counts('options')
                    ->label('Opciones'),
            ])
            ->filters([
                SelectFilter::make('exam_id')
                    ->label('Examen')
                    ->relationship('exam', 'title')
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
