<?php

namespace App\Filament\Resources\LessonMaterials;

use App\Filament\Resources\LessonMaterials\Pages\CreateLessonMaterial;
use App\Filament\Resources\LessonMaterials\Pages\EditLessonMaterial;
use App\Filament\Resources\LessonMaterials\Pages\ListLessonMaterials;
use App\Filament\Resources\LessonMaterials\Schemas\LessonMaterialForm;
use App\Filament\Resources\LessonMaterials\Tables\LessonMaterialsTable;
use App\Models\LessonMaterial;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LessonMaterialResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;

    protected static ?string $model = LessonMaterial::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static string|\UnitEnum|null $navigationGroup = 'Académico';

    protected static ?int $navigationSort = 6;

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $modelLabel = 'Material';

    protected static ?string $pluralModelLabel = 'Materiales';

    public static function form(Schema $schema): Schema
    {
        return LessonMaterialForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LessonMaterialsTable::configure($table);
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
            'index' => ListLessonMaterials::route('/'),
            'create' => CreateLessonMaterial::route('/create'),
            'edit' => EditLessonMaterial::route('/{record}/edit'),
        ];
    }
}
