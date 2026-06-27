<?php

namespace App\Filament\Resources\Lessons\Pages;

use App\Filament\Resources\Lessons\LessonResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditLesson extends EditRecord
{
    protected static string $resource = LessonResource::class;

    public function getHeading(): string
    {
        return "Administrar clase: {$this->record->title}";
    }

    public function getSubheading(): ?string
    {
        return "Curso: {$this->record->course->title}. Cargá y editá los materiales desde la sección relacionada.";
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
