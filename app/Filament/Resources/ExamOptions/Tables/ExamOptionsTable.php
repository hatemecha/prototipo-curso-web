<?php

namespace App\Filament\Resources\ExamOptions\Tables;

use App\Filament\Resources\ExamQuestions\ExamQuestionResource;
use App\Models\ExamQuestion;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ExamOptionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort(fn (Builder $query): Builder => $query
                ->orderBy(ExamQuestion::query()->select('exam_id')->whereColumn('exam_questions.id', 'exam_options.exam_question_id'))
                ->orderBy('exam_question_id')
                ->orderBy('order'))
            ->columns([
                TextColumn::make('question.exam.course.title')
                    ->label('Curso')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('question.exam.title')
                    ->label('Examen')
                    ->searchable(),
                TextColumn::make('question.question_text')
                    ->label('Pregunta')
                    ->limit(40)
                    ->searchable(),
                TextColumn::make('option_text')
                    ->label('Opción')
                    ->limit(40)
                    ->searchable(),
                IconColumn::make('is_correct')
                    ->label('Correcta')
                    ->boolean(),
                TextColumn::make('order')
                    ->label('Orden')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->recordActions([
                ActionGroup::make([
                    Action::make('editQuestion')
                        ->label('Editar pregunta')
                        ->icon('heroicon-o-arrow-top-right-on-square')
                        ->url(fn ($record): string => ExamQuestionResource::getUrl('edit', ['record' => $record->exam_question_id])),
                    EditAction::make()->label('Editar opción'),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
