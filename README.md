# Mini LMS Médico

Proyecto de práctica para dominar **Laravel + Filament + Inertia + React + Tailwind**.

Es una plataforma mínima de cursos médicos que cubre un flujo completo: inscripción simulada, clases, progreso, materiales descargables, examen multiple choice con corrección en backend, certificados PDF y emails básicos. No es un producto comercial: es una base funcional y testeable de punta a punta.

---

## Stack

- **Laravel** 13 (framework principal)
- **MariaDB / MySQL** (base de datos)
- **Filament** 5 (panel de administración)
- **Inertia.js + React** (área del alumno)
- **Tailwind CSS** (estilos)
- **barryvdh/laravel-dompdf** (certificados PDF)
- **Laravel Mail** (emails, mailer `log` en desarrollo)
- **Laravel Storage** (materiales y certificados en disco privado `local`)

---

## Requisitos

- **PHP** 8.3+ (probado con 8.4)
- **Composer**
- **Node.js** y **npm**
- **MariaDB** o **MySQL**
- Extensiones PHP habituales de Laravel: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `dom` (usada por DomPDF), `fileinfo`.
- **`php-bcmath`**: no es imprescindible para este prototipo. No bloquea instalación ni tests. Se recomienda tenerlo instalado de cara a una versión real (cálculos monetarios/pagos).
- DomPDF no requiere binarios externos (renderiza en PHP puro).

---

## Instalación

```bash
# 1. Dependencias PHP
composer install

# 2. Dependencias frontend
npm install

# 3. Variables de entorno
cp .env.example .env
php artisan key:generate

# 4. Configurar la base de datos en .env (ver sección siguiente)
#    Crear la base de datos, por ejemplo:
#    CREATE DATABASE mini_lms;

# 5. Migrar y poblar datos de prueba
php artisan migrate --seed

# 6. Storage
#    Los materiales y certificados usan storage privado; no necesitan storage:link.
#    Ejecutá storage:link solo si luego servís archivos públicos propios.

# 7. Frontend (desarrollo) y servidor
npm run dev
php artisan serve
```

Para un build de producción del frontend: `npm run build`.

---

## Configuración `.env`

Variables relevantes (sin credenciales reales):

```env
APP_NAME="Mini LMS Médico"
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mini_lms
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password

MAIL_MAILER=log
```

---

## Usuarios de prueba

Creados por el seeder (`DatabaseSeeder`):

| Rol     | Email                  | Password   |
| ------- | ---------------------- | ---------- |
| Admin   | `admin@minilms.test`   | `password` |
| Alumno  | `alumno@minilms.test`  | `password` |

- El **admin** accede a `/admin` (Filament).
- El **alumno** NO puede entrar a `/admin` (recibe 403) y usa el área `/student/*`.

---

## Rutas principales

| Ruta                          | Descripción                                  |
| ----------------------------- | -------------------------------------------- |
| `/login`                      | Login                                         |
| `/register`                   | Registro (crea alumnos)                       |
| `/dashboard`                  | Redirige al panel correspondiente             |
| `/admin`                      | Panel Filament (solo admin)                   |
| `/student/dashboard`          | Dashboard del alumno                          |
| `/student/courses`            | Cursos publicados                             |
| `/student/courses/{slug}`     | Detalle del curso                             |
| `/student/my-courses`         | Cursos en los que está inscripto             |
| `/student/lessons/{lesson}`   | Vista de clase (requiere inscripción)        |
| `/student/courses/{slug}/exam`| Rendir examen                                 |
| `/student/certificates`       | Certificados del alumno                       |

---

## Flujo de prueba end-to-end

1. **Entrar como admin** (`admin@minilms.test` / `password`) en `/admin`.
2. **Crear un curso** (o usar los seed: Ecografía y Radiología). Estado `published`.
3. **Crear módulos y clases** dentro del curso.
4. **Subir materiales** (PDF) a una clase desde "Materiales".
5. **Crear un examen** para el curso (grupo "Exámenes").
6. **Crear preguntas y opciones** (marcando al menos una opción correcta por pregunta).
7. **Entrar como alumno** (`alumno@minilms.test` / `password`).
8. **Inscribirse** a un curso publicado (`/student/courses/{slug}` → "Inscribirme").
9. **Abrir las clases** del curso.
10. **Marcar progreso** ("Marcar como completada") y ver el porcentaje subir.
11. **Descargar materiales** habilitados como descargables.
12. **Rendir el examen** del curso.
13. **Aprobar** (responder correctamente; mínimo configurable, por defecto 70%).
14. **Descargar el certificado** desde "Certificados" o desde el detalle del curso.
15. **Ver los emails** generados con `tail -f storage/logs/laravel.log`.

---

## Panel admin (Filament)

Secciones disponibles:

- **Académico**: Cursos, Módulos, Clases, Inscripciones, Progreso de clases, Materiales.
- **Exámenes**: Exámenes, Preguntas, Opciones, Intentos (solo lectura, con detalle de respuestas), Certificados (solo lectura, con descarga de PDF).

Los recursos de Intentos y Certificados son de solo lectura (no se crean manualmente).

---

## Emails

- Mailer por defecto: `MAIL_MAILER=log` (sin SMTP ni credenciales externas).
- Ver emails enviados:

```bash
tail -f storage/logs/laravel.log
```

- Emails implementados:
  - **Bienvenida** al registrarse.
  - **Curso habilitado** al inscribirse (nueva inscripción o reactivación; no duplica si ya estaba activa).
  - **Examen aprobado** al aprobar un examen.
  - **Certificado disponible** al generarse el certificado.
- `App\Support\SafeMail` envuelve el envío: si el email falla, se registra en el log y **el flujo principal no se rompe** (registro, inscripción, examen y certificado siguen funcionando).
- Opcional (no obligatorio): [Mailpit](https://github.com/axllent/mailpit) con `MAIL_MAILER=smtp`, `MAIL_HOST=127.0.0.1`, `MAIL_PORT=1025` y bandeja en http://localhost:8025.

---

## Certificados

- Se generan **automáticamente** al aprobar un examen (`ExamAttempt.status = passed`).
- PDF generado con DomPDF (vista `resources/views/certificates/pdf.blade.php`).
- Se guardan en **storage privado** (`storage/app/private/certificates`), no accesibles por URL directa.
- La descarga pasa por una **ruta controlada** que valida que el certificado sea del alumno autenticado.
- Número único con formato **`CERT-{AÑO}-{ID}`** (ej.: `CERT-2026-000001`).
- Un intento aprobado tiene un único certificado (no se duplica).

---

## Materiales

- Se suben desde Filament (recurso "Materiales").
- Se guardan en **storage privado** (`storage/app/private/lesson-materials`).
- Se muestran en la vista de cada clase para alumnos inscriptos.
- La descarga pasa por una ruta de Laravel que valida: curso publicado, inscripción activa, `is_downloadable = true` y existencia del archivo.
- No quedan accesibles por URL directa `/storage/...`.
- Si venís de una versión previa con archivos en `storage/app/public/lesson-materials`, movelos manualmente a `storage/app/private/lesson-materials` para que las rutas de descarga los encuentren.

---

## Tests

```bash
php artisan test
```

- **48 tests / 150 asserts** en verde.
- Cobertura:
  - **Breeze/Auth (26 tests):** autenticación, registro, verificación de email, reset/confirmación/actualización de password, perfil, redirects según rol y smoke tests por defecto.
  - **LMS (22 tests, `tests/Feature/Lms/`):**
    - `CourseFlowTest`: listado de cursos publicados, bloqueo de invitados, 404 en cursos draft, acceso a clases por inscripción, idempotencia del progreso, "Mis cursos", descarga de materiales según permisos y sin fallback al disco público.
    - `ExamCertificateTest`: visualización del examen sin filtrar la respuesta correcta, bloqueo de no inscriptos/draft/inactivo, cálculo de score en backend, rechazo de opciones ajenas, `max_attempts`, generación/descarga de certificados y no duplicación por intento.
    - `NotificationsAndAdminTest`: emails de bienvenida/inscripción/examen/certificado con `Mail::fake()`, no duplicación de email en reinscripción, fallo de email que no rompe el flujo, y control de acceso admin/student a todos los recursos de Filament.

> Nota sobre el conteo entre fases: en cada fase se creaban tests "smoke" temporales que se eliminaban al terminar (de ahí los conteos 36/35/31 reportados en Fases 7/8/9). En la Fase 10 esos casos se **consolidaron como suite permanente** en `tests/Feature/Lms/`. No se perdió ninguna garantía: todo el comportamiento crítico quedó cubierto de forma estable.

---

## Pendientes futuros

- Integración con **Mercado Pago** (sandbox) y **webhooks** de pago.
- **Colas (Queue/Redis)** para emails y generación de PDFs.
- **SMTP real** o proveedor transaccional (Resend/Mailgun/Postmark).
- Diseño visual final.
- **Validación pública de certificados** con QR.
- Regla para habilitar el examen solo si el progreso es 100%.
- Validaciones de examen más estrictas a nivel modelo/base de datos si el proyecto crece.
- Reproductor de video.
- **Deploy**, backups y hardening de seguridad.

---

## Checklist

Ver [`CHECKLIST.md`](CHECKLIST.md) para las checklists de instalación, prueba manual, pre-presentación y pendientes para versión real.
