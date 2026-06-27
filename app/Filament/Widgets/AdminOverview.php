<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Certificates\CertificateResource;
use App\Filament\Resources\Courses\CourseResource;
use App\Filament\Resources\ExamAttempts\ExamAttemptResource;
use App\Filament\Resources\Exams\ExamResource;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Exam;
use App\Models\ExamAttempt;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AdminOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Accesos principales';

    protected ?string $description = 'Gestioná el contenido y revisá la actividad de la plataforma.';

    protected int|array|null $columns = 4;

    protected function getStats(): array
    {
        return [
            Stat::make('Cursos', Course::count())
                ->description('Gestionar catálogo')
                ->descriptionIcon(Heroicon::ArrowRight)
                ->icon(Heroicon::OutlinedRectangleStack)
                ->color('primary')
                ->url(CourseResource::getUrl()),
            Stat::make('Exámenes', Exam::count())
                ->description('Configurar evaluaciones')
                ->descriptionIcon(Heroicon::ArrowRight)
                ->icon(Heroicon::OutlinedAcademicCap)
                ->color('warning')
                ->url(ExamResource::getUrl()),
            Stat::make('Intentos', ExamAttempt::count())
                ->description('Revisar resultados')
                ->descriptionIcon(Heroicon::ArrowRight)
                ->icon(Heroicon::OutlinedPencilSquare)
                ->color('gray')
                ->url(ExamAttemptResource::getUrl()),
            Stat::make('Certificados', Certificate::count())
                ->description('Consultar certificados')
                ->descriptionIcon(Heroicon::ArrowRight)
                ->icon(Heroicon::OutlinedDocumentCheck)
                ->color('primary')
                ->url(CertificateResource::getUrl()),
        ];
    }
}
