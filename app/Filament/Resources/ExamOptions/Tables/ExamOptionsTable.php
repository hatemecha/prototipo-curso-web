<?php

namespace App\Filament\Resources\ExamOptions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ExamOptionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('order')
            ->columns([
                TextColumn::make('question.question_text')
                    ->label('Pregunta')
                    ->limit(40)
                    ->searchable(),
                TextColumn::make('option_text')
                    ->label('Opción')
                    ->limit(40)
                    ->searchable(),
                IconColumn::make('is_correct')
                    ->label('Correcta')
                    ->boolean(),
                TextColumn::make('order')
                    ->label('Orden')
                    ->sortable(),
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
