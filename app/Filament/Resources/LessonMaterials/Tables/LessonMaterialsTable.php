<?php

namespace App\Filament\Resources\LessonMaterials\Tables;

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
                TextColumn::make('title')
                    ->label('Título')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('lesson.title')
                    ->label('Clase')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('lesson.course.title')
                    ->label('Curso')
                    ->searchable(),
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
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
