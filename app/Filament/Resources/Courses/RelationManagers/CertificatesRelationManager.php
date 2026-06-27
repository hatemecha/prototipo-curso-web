<?php

namespace App\Filament\Resources\Courses\RelationManagers;

use App\Services\CertificateService;
use Filament\Actions\Action;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class CertificatesRelationManager extends RelationManager
{
    protected static string $relationship = 'certificates';

    protected static ?string $title = 'Certificados';

    public function table(Table $table): Table
    {
        return $table
            ->heading("Certificados de {$this->getOwnerRecord()->title}")
            ->defaultSort('issued_at', 'desc')
            ->columns([
                TextColumn::make('certificate_number')->label('Número')->searchable(),
                TextColumn::make('user.name')->label('Alumno')->searchable(),
                TextColumn::make('issued_at')->label('Emitido')->dateTime(),
            ])
            ->headerActions([])
            ->recordActions([
                Action::make('download')
                    ->label('Descargar PDF')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->visible(fn ($record): bool => $record->pdf_path
                        && Storage::disk(CertificateService::DISK)->exists($record->pdf_path))
                    ->action(fn ($record) => Storage::disk(CertificateService::DISK)
                        ->download($record->pdf_path, $record->certificate_number.'.pdf')),
            ])
            ->toolbarActions([]);
    }
}
