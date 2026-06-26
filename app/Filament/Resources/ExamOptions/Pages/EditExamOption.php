<?php

namespace App\Filament\Resources\ExamOptions\Pages;

use App\Filament\Resources\ExamOptions\ExamOptionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditExamOption extends EditRecord
{
    protected static string $resource = ExamOptionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
