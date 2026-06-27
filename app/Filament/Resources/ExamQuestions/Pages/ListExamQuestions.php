<?php

namespace App\Filament\Resources\ExamQuestions\Pages;

use App\Filament\Resources\ExamQuestions\ExamQuestionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListExamQuestions extends ListRecords
{
    protected static string $resource = ExamQuestionResource::class;

    public function getHeading(): string
    {
        return 'Preguntas por examen';
    }

    public function getSubheading(): ?string
    {
        return 'Esta vista global es de consulta. Para trabajar con contexto, abrí un examen y administrá allí sus preguntas y opciones.';
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
