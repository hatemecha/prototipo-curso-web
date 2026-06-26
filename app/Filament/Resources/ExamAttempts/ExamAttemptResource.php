<?php

namespace App\Filament\Resources\ExamAttempts;

use App\Filament\Resources\ExamAttempts\Pages\ListExamAttempts;
use App\Filament\Resources\ExamAttempts\Pages\ViewExamAttempt;
use App\Filament\Resources\ExamAttempts\RelationManagers\AnswersRelationManager;
use App\Filament\Resources\ExamAttempts\Tables\ExamAttemptsTable;
use App\Models\ExamAttempt;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ExamAttemptResource extends Resource
{
    protected static ?string $model = ExamAttempt::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPencilSquare;

    protected static string|\UnitEnum|null $navigationGroup = 'Exámenes';

    protected static ?int $navigationSort = 4;

    protected static ?string $modelLabel = 'Intento';

    protected static ?string $pluralModelLabel = 'Intentos';

    public static function table(Table $table): Table
    {
        return ExamAttemptsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            AnswersRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListExamAttempts::route('/'),
            'view' => ViewExamAttempt::route('/{record}'),
        ];
    }
}
