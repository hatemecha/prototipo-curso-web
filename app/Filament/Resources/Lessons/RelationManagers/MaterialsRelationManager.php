<?php

namespace App\Filament\Resources\Lessons\RelationManagers;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class MaterialsRelationManager extends RelationManager
{
    protected static string $relationship = 'materials';

    public static function getTitle(Model $ownerRecord, string $pageClass): string
    {
        return "Materiales de la clase: {$ownerRecord->title}";
    }

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->label('Título visible para el alumno')->required()->maxLength(255),
            FileUpload::make('file_path')
                ->label('Archivo')
                ->disk('local')
                ->visibility('private')
                ->directory('lesson-materials')
                ->acceptedFileTypes([
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.ms-powerpoint',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                ])
                ->maxSize(10240)
                ->helperText('PDF, Word o PowerPoint. Máximo 10 MB; se guarda en almacenamiento privado.')
                ->required(),
            Toggle::make('is_downloadable')->label('Permitir descarga al alumno')->default(true),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                TextColumn::make('title')->label('Material')->searchable(),
                TextColumn::make('file_path')->label('Archivo')->formatStateUsing(fn (string $state): string => basename($state))->limit(35),
                TextColumn::make('file_type')->label('Tipo')->badge(),
                IconColumn::make('is_downloadable')->label('Descargable')->boolean(),
            ])
            ->headerActions([CreateAction::make()->label('Agregar material')])
            ->recordActions([EditAction::make(), DeleteAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
