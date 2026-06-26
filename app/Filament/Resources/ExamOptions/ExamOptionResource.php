<?php

namespace App\Filament\Resources\ExamOptions;

use App\Filament\Resources\ExamOptions\Pages\CreateExamOption;
use App\Filament\Resources\ExamOptions\Pages\EditExamOption;
use App\Filament\Resources\ExamOptions\Pages\ListExamOptions;
use App\Filament\Resources\ExamOptions\Schemas\ExamOptionForm;
use App\Filament\Resources\ExamOptions\Tables\ExamOptionsTable;
use App\Models\ExamOption;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ExamOptionResource extends Resource
{
    protected static ?string $model = ExamOption::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedListBullet;

    protected static string|\UnitEnum|null $navigationGroup = 'Exámenes';

    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'option_text';

    protected static ?string $modelLabel = 'Opción';

    protected static ?string $pluralModelLabel = 'Opciones';

    public static function form(Schema $schema): Schema
    {
        return ExamOptionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ExamOptionsTable::configure($table);
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
            'index' => ListExamOptions::route('/'),
            'create' => CreateExamOption::route('/create'),
            'edit' => EditExamOption::route('/{record}/edit'),
        ];
    }
}
