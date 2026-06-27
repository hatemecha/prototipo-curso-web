<?php

namespace App\Filament\Resources\Courses\RelationManagers;

use App\Filament\Resources\Exams\ExamResource;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ExamRelationManager extends RelationManager
{
    protected static string $relationship = 'exam';

    protected static ?string $title = 'Examen';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->label('Título')->required()->maxLength(255),
            TextInput::make('passing_score')->label('Puntaje mínimo')->numeric()->minValue(0)->maxValue(100)->suffix('%')->default(70)->required(),
            TextInput::make('max_attempts')->label('Máximo de intentos')->numeric()->minValue(1)->placeholder('Ilimitados'),
            Toggle::make('is_active')->label('Activo')->default(true),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->heading("Examen de {$this->getOwnerRecord()->title}")
            ->recordTitleAttribute('title')
            ->columns([
                TextColumn::make('title')->label('Examen'),
                TextColumn::make('passing_score')->label('Aprobación')->suffix('%'),
                TextColumn::make('questions_count')->counts('questions')->label('Preguntas'),
                IconColumn::make('is_active')->label('Activo')->boolean(),
            ])
            ->headerActions([
                CreateAction::make()
                    ->label('Crear examen')
                    ->visible(fn (): bool => $this->getOwnerRecord()->exam()->doesntExist()),
            ])
            ->recordActions([
                Action::make('manage')
                    ->label('Administrar preguntas')
                    ->icon(Heroicon::OutlinedArrowTopRightOnSquare)
                    ->url(fn ($record): string => ExamResource::getUrl('edit', ['record' => $record])),
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
}
