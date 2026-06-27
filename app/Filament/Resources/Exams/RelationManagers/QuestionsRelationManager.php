<?php

namespace App\Filament\Resources\Exams\RelationManagers;

use Closure;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class QuestionsRelationManager extends RelationManager
{
    protected static string $relationship = 'questions';

    public static function getTitle(Model $ownerRecord, string $pageClass): string
    {
        return "Preguntas del examen: {$ownerRecord->title}";
    }

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Textarea::make('question_text')
                ->label('Pregunta')
                ->placeholder('Escribí una consigna clara y completa.')
                ->required()
                ->rows(2)
                ->columnSpanFull(),
            TextInput::make('order')->label('Orden en el examen')->numeric()->minValue(0)->default(0)->required(),
            TextInput::make('points')->label('Puntos')->numeric()->minValue(1)->default(1)->required(),
            Repeater::make('options')
                ->label('Opciones de respuesta')
                ->relationship('options')
                ->schema([
                    Textarea::make('option_text')->label('Opción')->placeholder('Texto de la respuesta')->required()->rows(1)->columnSpanFull(),
                    Toggle::make('is_correct')->label('Respuesta correcta'),
                    TextInput::make('order')->label('Orden')->numeric()->minValue(0)->default(0),
                ])
                ->defaultItems(4)
                ->minItems(2)
                ->rules([
                    function (string $attribute, mixed $value, Closure $fail): void {
                        if (! collect($value ?? [])->contains(fn ($option): bool => (bool) data_get($option, 'is_correct'))) {
                            $fail('Marcá al menos una opción correcta.');
                        }
                    },
                ])
                ->helperText('Las opciones se administran acá. Marcá al menos una como correcta.')
                ->columnSpanFull(),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('question_text')
            ->defaultSort('order')
            ->columns([
                TextColumn::make('order')->label('Orden')->sortable(),
                TextColumn::make('question_text')->label('Pregunta')->wrap()->searchable(),
                TextColumn::make('points')->label('Puntos'),
                TextColumn::make('options_count')->counts('options')->label('Opciones'),
            ])
            ->headerActions([CreateAction::make()->label('Agregar pregunta')])
            ->recordActions([EditAction::make(), DeleteAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
