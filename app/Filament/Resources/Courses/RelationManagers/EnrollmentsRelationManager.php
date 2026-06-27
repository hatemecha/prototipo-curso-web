<?php

namespace App\Filament\Resources\Courses\RelationManagers;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class EnrollmentsRelationManager extends RelationManager
{
    protected static string $relationship = 'enrollments';

    protected static ?string $title = 'Inscripciones';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('user_id')->label('Alumno')->relationship('user', 'name')->searchable()->preload()->required(),
            Select::make('status')->label('Estado')->options([
                'active' => 'Activa',
                'cancelled' => 'Cancelada',
                'expired' => 'Expirada',
            ])->default('active')->required(),
            DateTimePicker::make('enrolled_at')->label('Fecha de inscripción')->default(now()),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->heading("Inscripciones a {$this->getOwnerRecord()->title}")
            ->defaultSort('enrolled_at', 'desc')
            ->columns([
                TextColumn::make('user.name')->label('Alumno')->searchable(),
                TextColumn::make('user.email')->label('Email')->searchable(),
                TextColumn::make('status')->label('Estado')->badge(),
                TextColumn::make('enrolled_at')->label('Inscripción')->dateTime(),
            ])
            ->headerActions([CreateAction::make()->label('Inscribir alumno')])
            ->recordActions([EditAction::make(), DeleteAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
