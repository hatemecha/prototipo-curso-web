<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
    <h2>¡Aprobaste el examen!</h2>
    <p>Hola {{ $name }},</p>
    <p>Aprobaste el examen de <strong>{{ $courseTitle }}</strong> con una calificación de <strong>{{ $score }}%</strong>. ¡Felicitaciones!</p>
    <p><a href="{{ $courseUrl }}">Ver el curso</a></p>
    <p>Saludos,<br>Equipo de Aula Clínica</p>
</body>
</html>
