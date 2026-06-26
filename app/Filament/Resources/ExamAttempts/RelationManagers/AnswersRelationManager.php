<?php

namespace App\Filament\Resources\ExamAttempts\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AnswersRelationManager extends RelationManager
{
    protected static string $relationship = 'answers';

    protected static ?string $title = 'Respuestas';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('question.question_text')
                    ->label('Pregunta')
                    ->limit(50)
                    ->wrap(),
                TextColumn::make('option.option_text')
                    ->label('Respuesta elegida')
                    ->limit(40)
                    ->placeholder('Sin responder'),
                IconColumn::make('is_correct')
                    ->label('Correcta')
                    ->boolean(),
                TextColumn::make('points_earned')
                    ->label('Puntos'),
            ])
            ->headerActions([])
            ->recordActions([])
            ->toolbarActions([]);
    }
}
