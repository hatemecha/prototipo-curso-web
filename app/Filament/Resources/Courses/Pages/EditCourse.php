<?php

namespace App\Filament\Resources\Courses\Pages;

use App\Filament\Resources\Courses\CourseResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCourse extends EditRecord
{
    protected static string $resource = CourseResource::class;

    public function getHeading(): string
    {
        return "Administrar curso: {$this->record->title}";
    }

    public function getSubheading(): ?string
    {
        return 'Configurá el curso y usá las secciones relacionadas para administrar módulos, clases, examen, inscripciones y certificados.';
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
