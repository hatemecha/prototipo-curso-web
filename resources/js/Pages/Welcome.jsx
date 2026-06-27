import ApplicationLogo from '@/Components/ApplicationLogo';
import Icon from '@/Components/Icon';
import ThemeToggle from '@/Components/ThemeToggle';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function Stars({ className = 'h-4 w-4', tone = 'text-primary' }) {
    return (
        <span className={`inline-flex gap-0.5 ${tone}`}>
            {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star" className={className} />
            ))}
        </span>
    );
}

const featuredCourses = [
    {
        tag: 'Ecografía',
        level: 'Inicial',
        title: 'Introducción a la Ecografía Clínica',
        description:
            'Física del ultrasonido, manejo del transductor y obtención de planos estándar en la cabecera del paciente.',
        modules: 2,
        hours: 6,
        rating: '4.9',
        price: 'Gratis',
        featured: false,
    },
    {
        tag: 'Imágenes',
        level: 'Avanzado',
        title: 'Diagnóstico por Imágenes Avanzado',
        description:
            'TC y RM aplicadas al diagnóstico avanzado. Casos reales comentados por especialistas.',
        modules: 4,
        hours: 12,
        rating: '5.0',
        price: '$49.99',
        featured: true,
    },
    {
        tag: 'Radiología',
        level: 'Básico',
        title: 'Radiología Torácica Básica',
        description:
            'Lectura sistemática de la radiografía de tórax e identificación de los patrones patológicos más frecuentes.',
        modules: 2,
        hours: 5,
        rating: '4.8',
        price: 'Gratis',
        featured: false,
    },
];

const features = [
    {
        icon: 'doc',
        title: 'Contenido clínico real',
        text: 'Módulos y clases creados con criterio asistencial, no teoría suelta. Aplicable desde el primer día.',
    },
    {
        icon: 'cap',
        title: 'Evaluaciones serias',
        text: 'Exámenes de opción múltiple corregidos en el servidor, con puntaje mínimo de aprobación por curso.',
    },
    {
        icon: 'badge',
        title: 'Certificados verificables',
        text: 'Al aprobar generás un certificado en PDF con número único, listo para descargar y compartir.',
    },
    {
        icon: 'clock',
        title: 'A tu ritmo',
        text: 'Acceso 24/7. Retomá donde lo dejaste: tu progreso queda guardado clase por clase.',
    },
    {
        icon: 'download',
        title: 'Material descargable',
        text: 'Guías, checklists y apuntes en PDF disponibles dentro de cada clase del curso.',
    },
    {
        icon: 'chart',
        title: 'Seguimiento de progreso',
        text: 'Barra de avance por curso y panel personal para que sepas exactamente qué te falta.',
    },
];

const steps = [
    { n: '01', title: 'Creá tu cuenta', text: 'Registrate gratis en menos de un minuto y entrá a tu panel de alumno.' },
    { n: '02', title: 'Inscribite al curso', text: 'Explorá el catálogo y sumate a los cursos que necesites, sin pagos complejos.' },
    { n: '03', title: 'Cursá y rendí', text: 'Mirá las clases, marcá tu avance y rendí el examen final cuando te sientas listo.' },
    { n: '04', title: 'Obtené tu certificado', text: 'Aprobá y descargá tu certificado PDF con número único de validación.' },
];

const stats = [
    { value: '20+', label: 'Cursos y módulos' },
    { value: '1.200', label: 'Profesionales formados' },
    { value: '95%', label: 'Tasa de aprobación' },
    { value: '4.9', label: 'Valoración media' },
];

const testimonials = [
    {
        quote: 'Por fin una plataforma de cursos médicos que va al grano. Las clases son cortas y el examen final realmente evalúa lo importante.',
        name: 'Dra. Carla Méndez',
        role: 'Médica de urgencias',
        initials: 'CM',
    },
    {
        quote: 'Lo usé para repasar ecografía antes de mis guardias. El material descargable y el seguimiento de progreso son un golazo.',
        name: 'Dr. Tomás Aguirre',
        role: 'Residente de clínica médica',
        initials: 'TA',
    },
    {
        quote: 'El certificado verificable me sirvió para acreditar formación continua. Todo claro, rápido y sin vueltas.',
        name: 'Dra. Lucía Ferraro',
        role: 'Especialista en imágenes',
        initials: 'LF',
    },
];

const faqs = [
    {
        q: '¿Los cursos tienen costo?',
        a: 'Hay cursos gratuitos y cursos pagos. En esta versión la inscripción es simulada: te sumás al curso y accedés al contenido completo de inmediato.',
    },
    {
        q: '¿Cómo obtengo el certificado?',
        a: 'Tenés que cursar las clases y aprobar el examen final del curso con el puntaje mínimo. Al aprobar, el sistema genera un certificado en PDF con un número único.',
    },
    {
        q: '¿Puedo cursar a mi ritmo?',
        a: 'Sí. El acceso es 24/7 y tu progreso se guarda automáticamente, así podés retomar exactamente donde lo dejaste.',
    },
    {
        q: '¿Necesito instalar algo?',
        a: 'No. Aula Clínica funciona en el navegador desde tu computadora, tablet o celular.',
    },
];

const navLinks = [
    { href: '#cursos', label: 'Cursos' },
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#certificacion', label: 'Certificación' },
    { href: '#opiniones', label: 'Opiniones' },
];

export default function Welcome({ auth }) {
    const dashboardHref = auth.user
        ? auth.user.role === 'admin'
            ? '/admin'
            : route('student.dashboard')
        : null;
    const ctaHref = auth.user ? dashboardHref : route('register');
    const browseHref = auth.user ? route('student.courses.index') : route('login');

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <Head title="Aula Clínica — Cursos médicos online con certificado" />

            <div className="min-h-screen bg-page text-ink">
                {/* Nav bar (light) */}
                <header
                    className={`sticky top-0 z-50 transition-colors duration-300 ${
                        scrolled
                            ? 'border-b border-line bg-page/85 backdrop-blur-xl'
                            : 'border-b border-transparent'
                    }`}
                >
                    <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-2.5">
                            <ApplicationLogo className="h-9 w-9 text-primary" />
                            <span className="text-lg font-extrabold tracking-tight text-primary">
                                Aula Clínica
                            </span>
                        </Link>

                        <nav className="hidden items-center gap-1 md:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-soft hover:text-ink"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            {auth.user ? (
                                <Link href={dashboardHref} className="btn-primary py-2.5">
                                    Mi panel
                                    <Icon name="arrow" className="h-4 w-4" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="hidden rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-soft sm:inline-flex"
                                    >
                                        Ingresar
                                    </Link>
                                    <Link href={route('register')} className="btn-primary py-2.5">
                                        Crear cuenta
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero — clean surface + floating product UI mockup */}
                <section className="relative overflow-hidden border-b border-line bg-surface">
                    <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
                        <div className="animate-fade-up">
                            <span className="inline-flex items-center gap-2 rounded-md bg-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                                Formación médica continua
                            </span>

                            <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl">
                                Cursos médicos que terminás y certificás.
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-[1.55] text-muted">
                                Aprendé ecografía, radiología y diagnóstico por
                                imágenes con clases concretas, evaluaciones reales y
                                un certificado verificable al aprobar. Estudiá a tu
                                ritmo, desde cualquier dispositivo.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link href={ctaHref} className="btn-primary text-lg">
                                    {auth.user ? 'Ir a mi panel' : 'Empezar gratis'}
                                    <Icon name="arrow" className="h-5 w-5" />
                                </Link>
                                <Link href={browseHref} className="btn-secondary text-lg">
                                    <Icon name="play" className="h-5 w-5" />
                                    Ver cursos
                                </Link>
                            </div>

                            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                                <div className="flex items-center gap-2">
                                    <Stars />
                                    <span className="text-base font-medium text-ink/70">
                                        4.9 de 1.200+ alumnos
                                    </span>
                                </div>
                                <div className="hidden h-5 w-px bg-line sm:block" />
                                <div className="flex items-center gap-2 text-base font-medium text-ink/70">
                                    <Icon name="shield" className="h-5 w-5 text-primary" />
                                    Certificado con número único
                                </div>
                            </div>
                        </div>

                        {/* Floating UI mockup — sits ABOVE the mesh */}
                        <div className="animate-fade-up [animation-delay:120ms]">
                            <HeroPreview />
                        </div>
                    </div>
                </section>

                {/* Trust bar */}
                <section className="border-y border-line bg-surface">
                    <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-6 lg:px-8">
                        <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-muted">
                            Profesionales y residentes de instituciones como
                        </p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base font-bold text-ink/40">
                            {[
                                'Hospital Central',
                                'Clínica San Rafael',
                                'Universidad de Medicina',
                                'Sanatorio del Norte',
                                'Instituto de Imágenes',
                            ].map((name) => (
                                <span key={name}>{name}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured courses */}
                <section id="cursos" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <SectionHeading
                        eyebrow="Catálogo"
                        title="Cursos destacados"
                        subtitle="Programas cortos y aplicables, diseñados para que sumes una habilidad concreta a tu práctica clínica."
                    />

                    <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuredCourses.map((course) => (
                            <CourseCard key={course.title} course={course} href={browseHref} />
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link href={browseHref} className="btn-outline">
                            Ver el catálogo completo
                            <Icon name="arrow" className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                {/* Features */}
                <section className="bg-page">
                    <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                        <SectionHeading
                            eyebrow="Por qué Aula Clínica"
                            title="Todo lo que necesitás para formarte en serio"
                            subtitle="Una plataforma enfocada en lo esencial: contenido claro, evaluación honesta y una credencial que vale."
                        />

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.title} className="card p-6">
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-soft text-primary">
                                        <Icon name={feature.icon} className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-4 text-base font-semibold text-ink">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-[1.55] text-muted">
                                        {feature.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section id="como-funciona" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <SectionHeading
                        eyebrow="Cómo funciona"
                        title="De cero a certificado en 4 pasos"
                        subtitle="Un recorrido simple y guiado, sin fricción ni configuraciones complicadas."
                    />

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => (
                            <div key={step.n} className="card p-8">
                                <span className="text-5xl font-extrabold tracking-tight text-primary/20">
                                    {step.n}
                                </span>
                                <h3 className="mt-4 text-xl font-bold text-ink">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-base leading-[1.55] text-ink/75">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats — massive aubergine numerals on white */}
                <section className="border-y border-line bg-surface">
                    <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center sm:text-left">
                                <p className="text-5xl font-extrabold tracking-[-0.02em] text-primary sm:text-[3.25rem]">
                                    {stat.value}
                                </p>
                                <p className="mt-2 text-base font-medium text-muted">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certification */}
                <section id="certificacion" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <p className="eyebrow">Certificación</p>
                            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
                                Una credencial que podés mostrar con confianza
                            </h2>
                            <p className="mt-5 text-lg leading-[1.55] text-ink/80">
                                Cada certificado se genera en el servidor con un
                                número único de validación. Nada de PDFs editables a
                                mano: lo que aprobás, queda registrado.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {[
                                    'Número de certificado único y verificable',
                                    'Incluye tu nombre, el curso y la fecha de emisión',
                                    'Descarga inmediata en PDF al aprobar el examen',
                                    'Quedan registrados todos tus intentos y notas',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                            <Icon name="check" className="h-4 w-4" />
                                        </span>
                                        <span className="text-base text-ink">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <CertificatePreview />
                    </div>
                </section>

                {/* Testimonials */}
                <section id="opiniones" className="bg-page">
                    <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                        <SectionHeading
                            eyebrow="Opiniones"
                            title="Lo que dicen los profesionales"
                            subtitle="Médicos y residentes que ya usan Aula Clínica para su formación continua."
                        />

                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            {testimonials.map((t) => (
                                <figure key={t.name} className="card flex flex-col p-8">
                                    <Stars />
                                    <blockquote className="mt-4 flex-1 text-base leading-[1.55] text-ink">
                                        “{t.quote}”
                                    </blockquote>
                                    <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-soft text-sm font-bold text-primary">
                                            {t.initials}
                                        </span>
                                        <span>
                                            <span className="block text-base font-bold text-ink">
                                                {t.name}
                                            </span>
                                            <span className="block text-sm text-muted">
                                                {t.role}
                                            </span>
                                        </span>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
                    <SectionHeading
                        eyebrow="Preguntas frecuentes"
                        title="¿Tenés dudas?"
                        subtitle="Lo que más nos consultan antes de empezar."
                    />
                    <div className="mt-10 space-y-3">
                        {faqs.map((faq) => (
                            <details key={faq.q} className="card group p-0 [&_summary]:list-none">
                                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-lg font-bold text-ink">
                                    {faq.q}
                                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-soft text-primary transition group-open:rotate-45">
                                        <Icon name="plus" className="h-4 w-4" />
                                    </span>
                                </summary>
                                <p className="px-5 pb-5 text-base leading-[1.55] text-ink/75">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Closing brand band */}
                <section className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-6 lg:px-8">
                    <div className="rounded-xl bg-hero px-6 py-16 text-center text-onHero sm:px-12">
                        <div className="mx-auto max-w-2xl">
                            <h2 className="text-2xl font-bold leading-tight tracking-[-0.01em] text-white sm:text-4xl">
                                Empezá hoy tu próximo curso médico
                            </h2>
                            <p className="mt-4 text-base leading-[1.55] text-onHeroMute">
                                Creá tu cuenta gratis, inscribite y obtené tu primer
                                certificado esta misma semana.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <Link
                                    href={ctaHref}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:bg-onHeroMute"
                                >
                                    {auth.user ? 'Ir a mi panel' : 'Crear cuenta gratis'}
                                    <Icon name="arrow" className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={browseHref}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    Ver cursos
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-line bg-surface text-ink">
                    <div className="mx-auto max-w-[1240px] px-6 py-14 sm:px-8">
                        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
                            <div className="max-w-sm">
                                <Link href="/" className="flex items-center gap-2.5">
                                    <ApplicationLogo className="h-8 w-8 text-primary" />
                                    <span className="text-lg font-bold text-primary">
                                        Aula Clínica
                                    </span>
                                </Link>
                                <p className="mt-4 text-sm leading-[1.55] text-muted">
                                    Plataforma de cursos médicos online con
                                    evaluaciones y certificados. Proyecto de práctica
                                    técnica (Mini LMS).
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-10 sm:gap-16">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                                        Plataforma
                                    </p>
                                    <ul className="mt-4 space-y-2.5 text-sm text-muted">
                                        <li><a href="#cursos" className="transition hover:text-ink">Cursos</a></li>
                                        <li><a href="#como-funciona" className="transition hover:text-ink">Cómo funciona</a></li>
                                        <li><a href="#certificacion" className="transition hover:text-ink">Certificación</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                                        Cuenta
                                    </p>
                                    <ul className="mt-4 space-y-2.5 text-sm text-muted">
                                        <li><Link href={route('login')} className="transition hover:text-ink">Ingresar</Link></li>
                                        <li><Link href={route('register')} className="transition hover:text-ink">Crear cuenta</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
                            <p>© {new Date().getFullYear()} Aula Clínica. Todos los derechos reservados.</p>
                            <p>Hecho con Laravel · Inertia · React · Tailwind</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

function SectionHeading({ eyebrow, title, subtitle }) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 text-lg leading-[1.55] text-ink/75">{subtitle}</p>
            )}
        </div>
    );
}

function CourseCard({ course, href }) {
    return (
        <article className="card flex flex-col p-6 text-ink">
            <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-soft px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                    {course.tag}
                </span>
                <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {course.level}
                </span>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold">
                <Stars className="h-3.5 w-3.5" tone="text-primary" />
                <span className="text-muted">{course.rating}</span>
            </div>
            <h3 className="mt-2 text-base font-semibold leading-snug">
                {course.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-[1.5] text-muted">
                {course.description}
            </p>

            <div className="mt-5 flex items-center gap-4 text-sm font-medium text-muted">
                <span className="inline-flex items-center gap-1.5">
                    <Icon name="layers" className="h-4 w-4 text-primary" />
                    {course.modules} módulos
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" className="h-4 w-4 text-primary" />
                    {course.hours} h
                </span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-lg font-bold tracking-tight">
                    {course.price}
                </span>
                <Link href={href} className="btn-primary">
                    Ver curso
                    <Icon name="arrow" className="h-4 w-4" />
                </Link>
            </div>
        </article>
    );
}

function HeroPreview() {
    return (
        <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-lift">
                <div className="border-b border-line bg-soft/60 p-6">
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                            En curso
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-soft px-2.5 py-1 text-xs font-semibold text-muted">
                            <Icon name="badge" className="h-3.5 w-3.5" />
                            Certificado
                        </span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold leading-snug text-ink">
                        Introducción a la Ecografía Clínica
                    </h3>
                    <div className="mt-5">
                        <div className="flex items-center justify-between text-xs font-medium text-muted">
                            <span>Progreso del curso</span>
                            <span>67%</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-soft">
                            <div className="h-full w-2/3 rounded-full bg-primary" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2.5 p-6">
                    {[
                        { t: '¿Qué es el ultrasonido?', done: true },
                        { t: 'Interacción con los tejidos', done: true },
                        { t: 'Tipos de transductores', done: false },
                        { t: 'Planos longitudinal y transversal', done: false },
                    ].map((lesson) => (
                        <div
                            key={lesson.t}
                            className="flex items-center gap-3 rounded-lg border border-line bg-soft px-3.5 py-3"
                        >
                            <span
                                className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                    lesson.done
                                        ? 'bg-primary text-white'
                                        : 'border border-lineStrong text-transparent'
                                }`}
                            >
                                <Icon name="check" className="h-3.5 w-3.5" />
                            </span>
                            <span
                                className={`text-sm ${
                                    lesson.done
                                        ? 'font-medium text-muted line-through'
                                        : 'font-semibold text-ink'
                                }`}
                            >
                                {lesson.t}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden rotate-[-4deg] items-center gap-3 rounded-xl bg-surface px-4 py-3 shadow-lift sm:flex">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-soft text-primary">
                    <Icon name="badge" className="h-5 w-5" />
                </span>
                <span>
                    <span className="block text-xs text-muted">Examen aprobado</span>
                    <span className="block text-sm font-bold text-ink">
                        Certificado emitido
                    </span>
                </span>
            </div>
        </div>
    );
}

function CertificatePreview() {
    return (
        <div className="relative mx-auto max-w-lg">
            <div className="card p-2">
                <div className="rounded-lg border border-line bg-surface p-8 text-center">
                    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-lg bg-soft text-primary">
                        <Icon name="badge" className="h-6 w-6" />
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Certificado de aprobación
                    </p>
                    <p className="mt-5 text-sm text-muted">Se certifica que</p>
                    <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
                        Dra. Carla Méndez
                    </p>
                    <p className="mt-4 text-sm leading-6 text-muted">
                        aprobó satisfactoriamente el curso
                    </p>
                    <p className="mt-1 text-base font-bold text-primary">
                        Introducción a la Ecografía Clínica
                    </p>

                    <div className="mt-7 flex items-center justify-between border-t border-line pt-5 text-left">
                        <div>
                            <p className="text-[0.65rem] uppercase tracking-wide text-muted">
                                N° de certificado
                            </p>
                            <p className="font-mono text-sm font-semibold text-ink">
                                AC-2026-00148
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[0.65rem] uppercase tracking-wide text-muted">
                                Emitido
                            </p>
                            <p className="text-sm font-semibold text-ink">Jun 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
