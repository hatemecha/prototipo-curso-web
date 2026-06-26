<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <style>
        @page { margin: 0; }
        body {
            font-family: DejaVu Sans, sans-serif;
            margin: 0;
            color: #1f2937;
        }
        .frame {
            margin: 30px;
            border: 6px solid #4f46e5;
            padding: 40px 50px;
            height: 660px;
            text-align: center;
        }
        .platform {
            font-size: 14px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #4f46e5;
            margin-bottom: 10px;
        }
        .title {
            font-size: 34px;
            font-weight: bold;
            margin: 20px 0 10px;
        }
        .subtitle {
            font-size: 15px;
            color: #6b7280;
            margin-bottom: 40px;
        }
        .name {
            font-size: 28px;
            font-weight: bold;
            color: #111827;
            margin: 10px 0;
            border-bottom: 2px solid #e5e7eb;
            display: inline-block;
            padding: 0 30px 8px;
        }
        .course {
            font-size: 20px;
            margin: 30px 0 10px;
        }
        .course strong { color: #4f46e5; }
        .meta {
            margin-top: 50px;
            font-size: 13px;
            color: #4b5563;
        }
        .meta table { width: 100%; }
        .meta td { padding: 4px 0; }
        .number {
            margin-top: 40px;
            font-size: 13px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class="frame">
        <div class="platform">Aula Clínica</div>
        <div class="title">Certificado de Aprobación</div>
        <div class="subtitle">Se otorga la presente constancia a</div>

        <div class="name">{{ $studentName }}</div>

        <div class="course">
            por haber aprobado el curso<br>
            <strong>{{ $courseTitle }}</strong>
        </div>

        <div class="meta">
            <table>
                <tr>
                    <td style="text-align: left;">Email: {{ $studentEmail }}</td>
                    <td style="text-align: right;">Calificación: {{ $score }}%</td>
                </tr>
                <tr>
                    <td style="text-align: left;">Fecha de emisión: {{ $issuedAt }}</td>
                    <td style="text-align: right;">Plataforma: Aula Clínica</td>
                </tr>
            </table>
        </div>

        <div class="number">
            Certificado N.º {{ $certificateNumber }}
        </div>
    </div>
</body>
</html>
