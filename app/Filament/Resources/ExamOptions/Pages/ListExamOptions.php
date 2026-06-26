<?php

namespace App\Filament\Resources\ExamOptions\Pages;

use App\Filament\Resources\ExamOptions\ExamOptionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListExamOptions extends ListRecords
{
    protected static string $resource = ExamOptionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
