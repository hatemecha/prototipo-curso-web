<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['lesson_id', 'title', 'file_path', 'file_type', 'is_downloadable'])]
class LessonMaterial extends Model
{
    public const DISK = 'local';

    protected function casts(): array
    {
        return [
            'is_downloadable' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (LessonMaterial $material): void {
            if ($material->file_path) {
                $extension = pathinfo($material->file_path, PATHINFO_EXTENSION);
                $material->file_type = $extension ? strtolower($extension) : null;
            }
        });
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}
