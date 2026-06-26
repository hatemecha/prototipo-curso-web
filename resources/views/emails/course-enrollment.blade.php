<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
    <h2>Ya tenés acceso al curso</h2>
    <p>Hola {{ $name }},</p>
    <p>Te inscribiste correctamente en <strong>{{ $courseTitle }}</strong>. Ya podés ver todas las clases y materiales del curso.</p>
    <p><a href="{{ $courseUrl }}">Ir al curso</a></p>
    <p>Saludos,<br>Equipo de Mini LMS Médico</p>
</body>
</html>
