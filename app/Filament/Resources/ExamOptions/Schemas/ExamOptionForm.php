<?php

namespace App\Filament\Resources\ExamOptions\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ExamOptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('exam_question_id')
                    ->label('Pregunta')
                    ->relationship('question', 'question_text')
                    ->searchable()
                    ->preload()
                    ->required(),
                Textarea::make('option_text')
                    ->label('Texto de la opción')
                    ->required()
                    ->rows(2)
                    ->columnSpanFull(),
                Toggle::make('is_correct')
                    ->label('Correcta'),
                TextInput::make('order')
                    ->label('Orden')
                    ->numeric()
                    ->default(0)
                    ->required(),
            ]);
    }
}
