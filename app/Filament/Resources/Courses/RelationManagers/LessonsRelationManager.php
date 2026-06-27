<?php

namespace App\Filament\Resources\Courses\RelationManagers;

use App\Filament\Resources\Lessons\LessonResource;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class LessonsRelationManager extends RelationManager
{
    protected static string $relationship = 'lessons';

    protected static ?string $title = 'Clases';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('course_module_id')
                ->label('Módulo del curso')
                ->options(fn () => $this->getOwnerRecord()->modules()->orderBy('order')->pluck('title', 'id'))
                ->searchable()
                ->placeholder('Sin módulo')
                ->helperText('Solo se muestran módulos de este curso.'),
            TextInput::make('title')->label('Título')->required()->maxLength(255),
            Textarea::make('description')->label('Descripción')->rows(2)->columnSpanFull(),
            Textarea::make('content')->label('Contenido')->rows(5)->columnSpanFull(),
            TextInput::make('video_url')->label('URL del video')->url()->maxLength(255),
            TextInput::make('order')->label('Orden')->numeric()->minValue(0)->default(0)->required(),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->heading("Clases de {$this->getOwnerRecord()->title}")
            ->recordTitleAttribute('title')
            ->defaultSort(fn ($query) => $query
                ->orderBy('course_module_id')
                ->orderBy('order'))
            ->columns([
                TextColumn::make('module.title')->label('Módulo')->placeholder('Sin módulo'),
                TextColumn::make('order')->label('Orden')->sortable(),
                TextColumn::make('title')->label('Clase')->searchable(),
                TextColumn::make('materials_count')->counts('materials')->label('Materiales'),
            ])
            ->headerActions([CreateAction::make()->label('Agregar clase')])
            ->recordActions([
                Action::make('manage')
                    ->label('Administrar clase')
                    ->icon(Heroicon::OutlinedArrowTopRightOnSquare)
                    ->url(fn ($record): string => LessonResource::getUrl('edit', ['record' => $record])),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
