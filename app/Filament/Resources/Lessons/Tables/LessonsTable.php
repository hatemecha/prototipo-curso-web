<?php

namespace App\Filament\Resources\Lessons\Tables;

use App\Filament\Resources\Courses\CourseResource;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class LessonsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort(fn (Builder $query): Builder => $query
                ->orderBy('course_id')
                ->orderBy('course_module_id')
                ->orderBy('order'))
            ->columns([
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('course.title')
                    ->label('Curso')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('module.title')
                    ->label('Módulo')
                    ->searchable()
                    ->placeholder('Sin módulo'),
                TextColumn::make('order')
                    ->sortable(),
                TextColumn::make('video_url')
                    ->label('Video')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->placeholder('—')
                    ->limit(30),
            ])
            ->filters([
                SelectFilter::make('course_id')
                    ->label('Curso')
                    ->relationship('course', 'title')
                    ->searchable()
                    ->preload(),
                SelectFilter::make('course_module_id')
                    ->label('Módulo')
                    ->relationship('module', 'title')
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                ActionGroup::make([
                    EditAction::make()->label('Editar clase'),
                    Action::make('editCourse')
                        ->label('Editar curso')
                        ->icon('heroicon-o-arrow-top-right-on-square')
                        ->url(fn ($record): string => CourseResource::getUrl('edit', ['record' => $record->course_id])),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
