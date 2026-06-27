<?php

namespace App\Filament\Resources\LessonMaterials\Tables;

use App\Filament\Resources\Lessons\LessonResource;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class LessonMaterialsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('lesson.course.title')
                    ->label('Curso')
                    ->searchable(),
                TextColumn::make('lesson.module.title')
                    ->label('Módulo')
                    ->placeholder('Sin módulo')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('lesson.title')
                    ->label('Clase')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Material')
                    ->searchable(),
                TextColumn::make('file_path')
                    ->label('Archivo')
                    ->formatStateUsing(fn (string $state): string => basename($state))
                    ->limit(30)
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('file_type')
                    ->label('Tipo')
                    ->badge(),
                IconColumn::make('is_downloadable')
                    ->label('Descargable')
                    ->boolean(),
            ])
            ->filters([
                SelectFilter::make('lesson_id')
                    ->label('Clase')
                    ->relationship('lesson', 'title')
                    ->searchable()
                    ->preload(),
                SelectFilter::make('course')
                    ->label('Curso')
                    ->relationship('lesson.course', 'title')
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                ActionGroup::make([
                    EditAction::make()->label('Editar material'),
                    Action::make('editLesson')
                        ->label('Editar clase')
                        ->icon('heroicon-o-arrow-top-right-on-square')
                        ->url(fn ($record): string => LessonResource::getUrl('edit', ['record' => $record->lesson_id])),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
