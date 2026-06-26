<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
    <h2>Tu certificado está disponible</h2>
    <p>Hola {{ $name }},</p>
    <p>Tu certificado del curso <strong>{{ $courseTitle }}</strong> ya está disponible.</p>
    <p>Número de certificado: <strong>{{ $certificateNumber }}</strong></p>
    <p><a href="{{ $certificatesUrl }}">Ver y descargar mis certificados</a></p>
    <p>Saludos,<br>Equipo de Aula Clínica</p>
</body>
</html>
