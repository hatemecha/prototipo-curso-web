# Checklist — Mini LMS Médico

## 1. Instalación

- [ ] `composer install` sin errores.
- [ ] `npm install` sin errores.
- [ ] `cp .env.example .env`.
- [ ] `php artisan key:generate`.
- [ ] Base de datos creada (ej. `CREATE DATABASE mini_lms;`).
- [ ] Credenciales de DB configuradas en `.env`.
- [ ] `php artisan migrate --seed` ejecuta y puebla datos de prueba.
- [ ] Confirmar que materiales y certificados usan storage privado (`storage/app/private`).
- [ ] `MAIL_MAILER=log` configurado.
- [ ] `npm run dev` (o `npm run build`) y `php artisan serve` levantan el proyecto.

## 2. Prueba manual (flujo completo)

- [ ] Login como admin (`admin@minilms.test` / `password`) → entra a `/admin`.
- [ ] Login como alumno (`alumno@minilms.test` / `password`) → NO entra a `/admin` (403).
- [ ] Admin crea/edita un curso publicado con módulos y clases.
- [ ] Admin sube un material PDF a una clase.
- [ ] Admin crea un examen con preguntas y opciones (≥1 correcta por pregunta).
- [ ] Alumno ve solo cursos publicados en `/student/courses`.
- [ ] Alumno se inscribe a un curso y aparece en `/student/my-courses`.
- [ ] Alumno abre clases solo si está inscripto.
- [ ] Alumno marca/desmarca progreso y el porcentaje se actualiza.
- [ ] Alumno descarga un material habilitado; uno no descargable queda bloqueado.
- [ ] Alumno rinde el examen y el score se calcula en backend.
- [ ] Al aprobar, se genera el certificado y el alumno lo descarga.
- [ ] Emails visibles en `tail -f storage/logs/laravel.log` (bienvenida, inscripción, examen, certificado).

## 3. Antes de presentar el proyecto

- [ ] `php artisan test` en verde.
- [ ] `npm run build` sin errores.
- [ ] `composer validate` OK.
- [ ] `php artisan migrate:fresh --seed` funciona desde cero (¡borra datos!).
- [ ] No quedan `dd()`/`dump()`/`console.log` ni tests temporales.
- [ ] README y CHECKLIST actualizados.
- [ ] Usuarios de prueba funcionan.
- [ ] Certificado de ejemplo se genera y descarga correctamente.

## 4. Pendientes para versión real

- [ ] Mercado Pago (sandbox) + webhooks de pago.
- [ ] Migrar archivos existentes desde `storage/app/public/lesson-materials` si el proyecto venía de una versión anterior.
- [ ] Colas (Queue/Redis) para emails y generación de PDFs.
- [ ] SMTP real / proveedor transaccional.
- [ ] Validación pública de certificados con QR.
- [ ] Regla de examen habilitado solo con progreso 100%.
- [ ] Reglas de examen más estrictas a nivel modelo/base de datos si el proyecto crece.
- [ ] Reproductor de video.
- [ ] Diseño visual final.
- [ ] Deploy, backups y hardening de seguridad.
