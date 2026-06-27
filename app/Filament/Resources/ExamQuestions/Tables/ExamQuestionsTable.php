<?php

namespace App\Filament\Resources\ExamQuestions\Tables;

use App\Filament\Resources\Exams\ExamResource;
use App\Models\Exam;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ExamQuestionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort(fn (Builder $query): Builder => $query
                ->orderBy(Exam::query()->select('course_id')->whereColumn('exams.id', 'exam_questions.exam_id'))
                ->orderBy('exam_id')
                ->orderBy('order'))
            ->columns([
                TextColumn::make('exam.course.title')
                    ->label('Curso')
                    ->searchable(),
                TextColumn::make('exam.title')
                    ->label('Examen')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('question_text')
                    ->label('Pregunta')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('order')
                    ->label('Orden')
                    ->sortable(),
                TextColumn::make('points')
                    ->label('Puntos')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('options_count')
                    ->counts('options')
                    ->label('Opciones'),
            ])
            ->filters([
                SelectFilter::make('exam_id')
                    ->label('Examen')
                    ->relationship('exam', 'title')
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                ActionGroup::make([
                    EditAction::make()->label('Editar pregunta'),
                    Action::make('editExam')
                        ->label('Editar examen')
                        ->icon('heroicon-o-arrow-top-right-on-square')
                        ->url(fn ($record): string => ExamResource::getUrl('edit', ['record' => $record->exam_id])),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
