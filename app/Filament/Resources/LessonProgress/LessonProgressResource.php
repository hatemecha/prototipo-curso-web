<?php

namespace App\Filament\Resources\LessonProgress;

use App\Filament\Resources\LessonProgress\Pages\ListLessonProgress;
use App\Filament\Resources\LessonProgress\Tables\LessonProgressTable;
use App\Models\LessonProgress;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LessonProgressResource extends Resource
{
    protected static ?string $model = LessonProgress::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChartBar;

    protected static string|\UnitEnum|null $navigationGroup = 'Académico';

    protected static ?int $navigationSort = 5;

    protected static ?string $modelLabel = 'Progreso';

    protected static ?string $pluralModelLabel = 'Progreso de clases';

    public static function table(Table $table): Table
    {
        return LessonProgressTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListLessonProgress::route('/'),
        ];
    }
}
