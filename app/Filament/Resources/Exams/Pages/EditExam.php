<?php

namespace App\Filament\Resources\Exams\Pages;

use App\Filament\Resources\Exams\ExamResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditExam extends EditRecord
{
    protected static string $resource = ExamResource::class;

    public function getHeading(): string
    {
        return "Administrar examen: {$this->record->title}";
    }

    public function getSubheading(): ?string
    {
        return "Curso: {$this->record->course->title}. Administrá preguntas y opciones desde la sección de preguntas del examen.";
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
