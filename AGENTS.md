# AGENTS.md

## Estado final del proyecto (actualizado en Fase 10)

Todas las fases 0–10 están **completadas y verificadas**.

- **Fase 1** — Setup base, auth (Breeze), roles `admin`/`student`, Filament, seed de admin/alumno.
- **Fase 2** — `Course`, `CourseModule`, `Lesson` + Resources Filament.
- **Fase 3** — Área alumno con Inertia + React + Tailwind.
- **Fase 4** — `CourseEnrollment` (inscripción simulada) + "Mis cursos".
- **Fase 5** — `LessonProgress` (progreso de clases).
- **Fase 6** — `LessonMaterial` (materiales con descarga controlada).
- **Fase 7** — `Exam`, `ExamQuestion`, `ExamOption`, `ExamAttempt`, `ExamAnswer` (corrección en backend).
- **Fase 8** — `Certificate` (PDF con DomPDF, número único, storage privado, descarga controlada).
- **Fase 9** — Emails básicos (4 Mailables, `SafeMail`, `MAIL_MAILER=log`).
- **Fase 10** — Limpieza, documentación (`README.md`, `CHECKLIST.md`) y suite de tests permanente.

**Tests:** la suite permanente vive en `tests/Feature/` (Breeze) y `tests/Feature/Lms/` (LMS). En fases previas se usaron tests "smoke" temporales que se eliminaban al terminar cada fase; en la Fase 10 se consolidaron como suite permanente. Comando: `php artisan test`.

**Decisiones técnicas clave:** `Course hasOne Exam`; certificados y materiales en disco privado `local`; listener de bienvenida vía auto-discovery de Laravel; emails sin colas (preparados para encolar).

---

## Objetivo del proyecto

Construir un proyecto de práctica llamado **Mini LMS Médico**, una plataforma mínima de cursos médicos para dominar el stack:

* Laravel
* Filament
* Inertia.js
* React
* Tailwind CSS
* Base de datos SQL
* Storage de archivos
* Generación de certificados PDF
* Emails básicos
* Roles de usuario

Este proyecto es una práctica técnica previa a una plataforma real de cursos médicos pagos. El objetivo no es hacer un producto final comercial todavía, sino construir un flujo completo y testeable por partes.

---

## Regla principal

No implementar todo de una vez.

El desarrollo debe hacerse por fases pequeñas, funcionales y testeables.
Después de cada fase, el agente debe detenerse y entregar:

1. Resumen de lo implementado.
2. Archivos modificados.
3. Comandos ejecutados o sugeridos.
4. Pasos de prueba manual.
5. Errores o riesgos detectados.
6. Confirmación de si se puede avanzar a la siguiente fase.

No avanzar a la fase siguiente si la fase actual no puede probarse.

---

## Stack objetivo

Usar como base:

* Laravel como framework principal.
* Filament para panel administrativo.
* Inertia.js + React para área pública/alumno.
* Tailwind CSS para estilos.
* Base de datos SQL.
* Laravel Storage para archivos.
* Laravel Mail para emails.
* Generación de PDF para certificados.
* Roles simples: `admin` y `student`.

No usar microservicios.
No separar frontend y backend en proyectos distintos.
No usar Supabase.
No usar Firebase.
No usar WordPress, Moodle ni plugins LMS externos.

---

## Alcance del proyecto

El proyecto debe permitir este flujo completo:

1. Un administrador entra al panel.
2. El administrador crea un curso.
3. El administrador crea módulos y clases.
4. El administrador sube materiales PDF.
5. Un alumno se registra.
6. El alumno se inscribe a un curso de forma gratuita/simulada.
7. El alumno ve las clases del curso.
8. El alumno marca clases como completadas.
9. El alumno rinde un examen multiple choice.
10. El sistema calcula la nota.
11. Si aprueba, se genera un certificado PDF.
12. El alumno descarga el certificado.
13. El administrador puede ver alumnos, inscripciones, intentos y certificados.

---

## Fuera de alcance inicial

No implementar en la primera versión:

* Mercado Pago real.
* Webhooks reales.
* Suscripciones.
* Cupones.
* Facturación fiscal.
* QR de validación pública.
* Corrección manual de exámenes.
* Marca de agua en videos.
* Protección avanzada de videos.
* Chat.
* Notificaciones complejas.
* Multi-idioma.
* Blog.
* App móvil.
* Diseño visual demasiado elaborado.

Primero debe funcionar el flujo central.

---

## Fases obligatorias

### Fase 0 — Inspección y plan

Antes de tocar código:

* Inspeccionar estructura actual del proyecto.
* Detectar versión de Laravel.
* Detectar si ya existe Inertia, React, Filament o Tailwind.
* Detectar base de datos configurada.
* Proponer plan de implementación por fases.
* No modificar archivos todavía salvo que el usuario lo pida.

---

### Fase 1 — Setup base

Objetivo:

* Laravel funcionando.
* Autenticación funcionando.
* Roles `admin` y `student`.
* Usuario admin creado por seed.
* Filament instalado y accesible.
* Dashboard admin accesible.

Entregables:

* Login/register.
* Admin puede entrar a `/admin`.
* Student no puede entrar a `/admin`.

Pruebas manuales:

* Crear usuario alumno.
* Iniciar sesión como alumno.
* Iniciar sesión como admin.
* Confirmar acceso correcto a Filament.

---

### Fase 2 — Cursos, módulos y clases

Objetivo:

Crear estructura básica de cursos.

Modelos mínimos:

* `Course`
* `CourseModule`
* `Lesson`

Campos sugeridos:

`courses`:

* id
* title
* slug
* description
* price
* status
* cover_image
* timestamps

`course_modules`:

* id
* course_id
* title
* description
* order
* timestamps

`lessons`:

* id
* course_id
* course_module_id
* title
* description
* content
* video_url
* order
* timestamps

Panel Filament:

* CRUD de cursos.
* CRUD de módulos.
* CRUD de clases.
* Relaciones visibles y editables.

Pruebas manuales:

* Crear un curso.
* Crear módulos para ese curso.
* Crear clases dentro de módulos.
* Ver que el orden funcione.
* Ver que las relaciones se guarden correctamente.

---

### Fase 3 — Área alumno con Inertia + React

Objetivo:

Crear una interfaz básica para alumnos.

Rutas mínimas:

* `/student/dashboard`
* `/student/courses`
* `/student/courses/{course}`
* `/student/lessons/{lesson}`

Pantallas mínimas:

* Dashboard del alumno.
* Listado de cursos disponibles.
* Detalle del curso.
* Vista de clase.

Reglas:

* Usar Inertia + React.
* Usar Tailwind.
* No construir todavía diseño final.
* Priorizar claridad y funcionamiento.

Pruebas manuales:

* Alumno entra a dashboard.
* Alumno ve cursos publicados.
* Alumno abre un curso.
* Alumno abre una clase.

---

### Fase 4 — Inscripciones simuladas

Objetivo:

Permitir que un alumno se inscriba a un curso sin pago real.

Modelo:

`course_enrollments`:

* id
* user_id
* course_id
* status
* enrolled_at
* timestamps

Funcionalidad:

* Botón “Inscribirme”.
* Al inscribirse, el curso aparece en “Mis cursos”.
* El contenido completo solo debe estar disponible para alumnos inscriptos.
* El admin puede ver inscripciones en Filament.

Pruebas manuales:

* Alumno se inscribe.
* Alumno ve curso en “Mis cursos”.
* Alumno puede acceder a clases del curso.
* Otro alumno no inscripto no puede acceder al contenido privado.

---

### Fase 5 — Progreso de clases

Objetivo:

Guardar progreso del alumno.

Modelo:

`lesson_progress`:

* id
* user_id
* course_id
* lesson_id
* completed_at
* timestamps

Funcionalidad:

* Botón “Marcar como completada”.
* Mostrar porcentaje de avance del curso.
* Mostrar clases completadas/no completadas.

Pruebas manuales:

* Alumno marca una clase como completada.
* El progreso aumenta.
* Al recargar, el progreso se mantiene.
* El admin puede ver progreso básico si es simple de implementar.

---

### Fase 6 — Materiales PDF

Objetivo:

Permitir subir y mostrar materiales.

Modelo:

`lesson_materials`:

* id
* lesson_id
* title
* file_path
* file_type
* is_downloadable
* timestamps

Funcionalidad:

* Admin sube PDFs desde Filament.
* Alumno ve materiales en la clase.
* Alumno puede descargar los materiales si están habilitados.

Pruebas manuales:

* Admin sube PDF.
* Alumno ve PDF en la clase.
* Alumno descarga PDF.
* No se rompe si una clase no tiene materiales.

---

### Fase 7 — Examen multiple choice

Objetivo:

Crear examen simple por curso.

Modelos:

* `Exam`
* `ExamQuestion`
* `ExamOption`
* `ExamAttempt`
* `ExamAnswer`

Campos sugeridos:

`exams`:

* id
* course_id
* title
* passing_score
* max_attempts
* timestamps

`exam_questions`:

* id
* exam_id
* question_text
* order
* points
* timestamps

`exam_options`:

* id
* exam_question_id
* option_text
* is_correct
* order
* timestamps

`exam_attempts`:

* id
* exam_id
* user_id
* score
* status
* started_at
* submitted_at
* timestamps

`exam_answers`:

* id
* exam_attempt_id
* exam_question_id
* exam_option_id
* is_correct
* timestamps

Funcionalidad:

* Admin crea examen desde Filament.
* Admin crea preguntas y opciones.
* Alumno rinde examen desde React.
* Sistema calcula nota.
* Sistema determina aprobado/desaprobado.
* Se guarda intento.

Pruebas manuales:

* Crear examen.
* Crear preguntas.
* Alumno rinde.
* El sistema calcula puntaje.
* El intento queda guardado.
* El admin puede ver intentos.

---

### Fase 8 — Certificados PDF

Objetivo:

Generar certificado al aprobar examen.

Modelo:

`certificates`:

* id
* user_id
* course_id
* exam_attempt_id
* certificate_number
* pdf_path
* issued_at
* timestamps

Funcionalidad:

* Si el alumno aprueba, se genera certificado.
* El certificado tiene número único.
* El PDF incluye:

  * nombre del alumno
  * nombre del curso
  * fecha
  * número de certificado
* El alumno puede descargarlo.
* El admin puede verlo en Filament.

Pruebas manuales:

* Alumno aprueba examen.
* Se crea certificado.
* Se genera PDF.
* Alumno descarga PDF.
* Admin ve certificado emitido.

---

### Fase 9 — Emails básicos

Objetivo:

Enviar emails/logs básicos.

Emails:

* Registro exitoso.
* Curso habilitado.
* Examen aprobado.
* Certificado disponible.

Reglas:

* Si no hay SMTP configurado, usar log/mailpit.
* No bloquear el flujo principal si falla un email.
* Preparar para encolar más adelante.

Pruebas manuales:

* Ver emails en log o herramienta local.
* Confirmar que aprobar examen dispara email de certificado.

---

### Fase 10 — Limpieza y documentación

Objetivo:

Dejar el proyecto entendible.

Entregables:

* README con instalación.
* Comandos principales.
* Usuario admin de prueba.
* Flujo de prueba completo.
* Notas técnicas.
* Pendientes futuros.

README debe incluir:

* Requisitos.
* Instalación.
* Migraciones.
* Seeders.
* Cómo correr frontend.
* Cómo entrar al admin.
* Cómo probar el flujo completo.

---

## Reglas de código

* Mantener código simple y legible.
* No sobrediseñar.
* No crear abstracciones innecesarias.
* Usar nombres claros.
* Mantener modelos y relaciones bien definidos.
* Usar Form Requests si la validación empieza a crecer.
* Usar Policies/Middleware para proteger accesos.
* No duplicar lógica de negocio en controladores y vistas.
* Separar lógica compleja en Services cuando corresponda.
* No introducir paquetes innecesarios.

---

## Reglas de seguridad mínimas

* Un alumno no debe poder acceder a cursos no inscriptos.
* Un alumno no debe poder descargar certificados de otro alumno.
* Un alumno no debe poder entrar al panel admin.
* Las rutas administrativas deben estar protegidas.
* Las acciones importantes deben validar permisos.
* No confiar en datos del frontend para notas o certificados.
* El cálculo del examen debe hacerse en backend.
* El certificado debe generarse desde backend.

---

## Comandos útiles esperados

Usar comandos similares cuando corresponda:

```bash
php artisan migrate
php artisan migrate:fresh --seed
php artisan make:model Nombre -m
php artisan make:filament-resource Nombre
php artisan make:seeder NombreSeeder
php artisan test
npm install
npm run dev
npm run build
```

Antes de sugerir comandos destructivos como `migrate:fresh`, advertir que borra datos.

---

## Criterio de finalización

El proyecto se considera completo cuando se puede probar este flujo:

1. Admin inicia sesión.
2. Admin crea curso, módulo, clase y material.
3. Admin crea examen con preguntas.
4. Alumno se registra.
5. Alumno se inscribe al curso.
6. Alumno ve clases.
7. Alumno marca progreso.
8. Alumno rinde examen.
9. Alumno aprueba.
10. Sistema genera certificado PDF.
11. Alumno descarga certificado.
12. Admin ve inscripción, intento y certificado.

---

## Cómo debe responder el agente

Después de cada fase, responder con este formato:

````markdown
## Fase completada

### Implementado
- ...

### Archivos modificados
- ...

### Comandos para ejecutar
```bash
...
````

### Pruebas manuales

1. ...
2. ...
3. ...

### Riesgos o pendientes

* ...

### Siguiente fase sugerida

...

```

No avanzar a la siguiente fase sin confirmación del usuario.
```
