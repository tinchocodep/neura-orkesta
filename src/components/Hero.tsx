import { useEffect, useRef } from 'react';
import { ArrowDown, Check, MessageCircle } from 'lucide-react';

// Único CTA primario del sitio. El mensaje se personaliza por sección de origen.
const WHATSAPP_URL =
    'https://wa.me/5492622567533?text=Hola%21%20Quiero%20saber%20c%C3%B3mo%20Neura%20se%20integra%20a%20mi%20sistema';

const proofPoints = [
    'Andando en 24hs',
    'Sin permanencia',
    'Se integra a las herramientas que ya usás',
    'Equipo argentino, ARCA y bancos locales',
];

/*
 * Este es el ÚNICO componente eager de la app (App.tsx lo importa sin React.lazy).
 * Por eso no usa framer-motion: importarlo acá mete un chunk de ~137KB en el camino
 * crítico del LCP. Todo el movimiento de esta sección es CSS (animate-fade-in del
 * tailwind.config, con delay y fill-mode inline). El <h1> no se anima a propósito:
 * es el candidato a LCP y tiene que pintar en el primer frame posible.
 *
 * fase 2: acá entra el sistema de movimiento (RESOLVER en el titular, PULSO en el
 * recorrido del dato). fase 3: el video reemplaza el placeholder de la derecha.
 */
/**
 * Logos de clientes para la franja de prueba social del hero.
 * Vacío a propósito: hasta que no haya logos reales y aprobados, la franja
 * entera no se renderiza. Agregá { nombre, logo } y aparece sola.
 */
const LOGOS_CLIENTES: { nombre: string; logo: string }[] = [];

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);

    // El video se adjunta DESPUÉS del primer paint y sólo si el visitante no pidió
    // reducir movimiento y no está ahorrando datos. Hasta entonces el hero es el
    // póster: 20KB, sin pedir un solo byte de video.
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
        if (conn?.saveData) return;

        const start = () => {
            const el = videoRef.current;
            if (!el) return;
            el.src = '/videos/hero-flow.mp4';
            el.play().catch(() => {
                /* autoplay bloqueado: queda el póster, que muestra lo mismo */
            });
        };

        const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 400));
        const id = idle(start);
        return () => {
            if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
            else clearTimeout(id as number);
        };
    }, []);

    return (
        <section className="relative flex min-h-svh items-center overflow-hidden px-6 pb-16 pt-28 md:px-12 md:pt-32 lg:px-24">
            {/* Ambiente: manchas de marca muy suaves, sin costo de layout */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-brand-blue/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full bg-brand-blue/5 blur-3xl" />

            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                    {/* ── Columna izquierda: el mensaje ───────────────────── */}
                    <div>
                        <p
                            className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue"
                            style={{ animationDelay: '60ms', animationFillMode: 'both' }}
                        >
                            Tu PyME, en tiempo real con IA
                        </p>

                        {/* El único <h1> del sitio. Sin animación: es el LCP. */}
                        <h1 className="font-display text-[3.25rem] font-bold leading-[0.98] tracking-[-0.03em] text-text-primary sm:text-7xl lg:text-[5.5rem]">
                            Conectamos todo <br className="hidden sm:block" />
                            <span className="text-brand-blue">lo que ya usás.</span>
                        </h1>

                        <p
                            className="animate-fade-in mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl"
                            style={{ animationDelay: '120ms', animationFillMode: 'both' }}
                        >
                            NeuraOrkesta digitaliza, conecta y automatiza tu PyME para que tengas la
                            foto completa y decidas con datos.
                        </p>

                        {/* CTAs: uno primario (WhatsApp) y uno secundario (ancla) */}
                        <div
                            className="animate-fade-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
                        >
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-7 py-4 font-semibold text-white shadow-brand transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-brand-lg"
                            >
                                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                                Escribinos por WhatsApp
                            </a>

                            <a
                                href="#capas"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-7 py-4 font-semibold text-text-primary transition-all duration-300 hover:border-brand-blue/40 hover:text-brand-blue"
                            >
                                Ver cómo funciona
                                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                            </a>
                        </div>

                        {/* Tira de prueba: una línea en desktop, envuelve en mobile */}
                        <ul
                            className="animate-fade-in mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted"
                            style={{ animationDelay: '280ms', animationFillMode: 'both' }}
                        >
                            {proofPoints.map((point) => (
                                <li key={point} className="flex items-center gap-1.5">
                                    <Check className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Columna derecha: el recorrido del dato ───────────── */}
                    <div
                        className="animate-fade-in"
                        style={{ animationDelay: '340ms', animationFillMode: 'both' }}
                    >
                        {/* El póster es un <img> normal y es lo que pinta primero: el video
                            nunca es el elemento LCP. El mp4 pesa 128KB y arranca recién
                            después del primer paint. */}
                        <div className="relative overflow-hidden rounded-3xl">
                            <img
                                src="/hero-flow.webp"
                                alt="Documentos desordenados que entran a NeuraOrkesta y salen ordenados hacia las herramientas de la empresa"
                                width="960"
                                height="698"
                                fetchPriority="high"
                                className="w-full h-auto"
                            />
                            <video
                                ref={videoRef}
                                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
                                muted
                                loop
                                playsInline
                                preload="none"
                                aria-hidden="true"
                                onPlaying={(e) => { e.currentTarget.style.opacity = '1'; }}
                            />
                        </div>

                        <p className="mt-5 text-center text-base leading-relaxed text-text-muted lg:text-left">
                            Entra como te quede cómodo. Sale ordenado hacia todo lo que ya usás.
                        </p>
                    </div>
                </div>

                {/* ── Franja de clientes ──────────────────────────────────── */}
                {/* Se renderiza SÓLO cuando hay logos reales aprobados. Un titular que
                    afirma "ya trabajan con nosotros" sobre recuadros vacíos es prueba
                    social inventada, así que por defecto no se muestra nada.
                    Para activarla: cargá los archivos en public/logos/ y sumá las
                    entradas acá. Nada más que tocar. */}
                {LOGOS_CLIENTES.length > 0 && (
                <div
                    className="animate-fade-in mt-16 border-t border-gray-100 pt-10"
                    style={{ animationDelay: '420ms', animationFillMode: 'both' }}
                >
                    <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-text-muted lg:text-left">
                        Ya trabajan con NeuraOrkesta
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {LOGOS_CLIENTES.map((cliente) => (
                            <div
                                key={cliente.nombre}
                                className="flex h-14 items-center justify-center rounded-lg border border-gray-100 bg-white"
                            >
                                <img
                                    src={cliente.logo}
                                    alt={cliente.nombre}
                                    className="max-h-8 w-auto opacity-60"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </section>
    );
}
