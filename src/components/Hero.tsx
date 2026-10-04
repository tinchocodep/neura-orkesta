import { useEffect, useRef } from 'react';
import { MessageCircle, Play } from 'lucide-react';
import { WHATSAPP_REUNION } from './contacto';

interface HeroProps {
    onVerVideo: () => void;
}

const piezas = [
    { nombre: 'NeuraSync', punto: 'bg-sync' },
    { nombre: 'NeuraCore', punto: 'bg-brand-blue' },
    { nombre: 'NeuraInsight', punto: 'bg-insight' },
];

function LogoAnimado() {
    const videoRef = useRef<HTMLVideoElement>(null);

    // El video del logo entra después del primer pintado; hasta ahí se ve el póster.
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const conexion = (navigator as { connection?: { saveData?: boolean } }).connection;
        if (conexion?.saveData) return;

        const id = window.setTimeout(() => {
            const el = videoRef.current;
            if (!el) return;
            el.src = '/videos/logo-neura.mp4';
            el.play().catch(() => {});
        }, 300);
        return () => window.clearTimeout(id);
    }, []);

    return (
        <div
            className="pointer-events-none relative mx-auto mt-16 aspect-square h-[38svh] shrink-0 lg:absolute lg:right-[5vw] lg:top-1/2 lg:mt-0 lg:h-[74svh] lg:-translate-y-1/2"
            aria-hidden="true"
            // El video trae un fondo casi blanco con ruido de compresión: el contraste lo lleva a
            // blanco puro y la máscara le borra el borde, así no se nota el recuadro sobre la página.
            style={{
                maskImage: 'radial-gradient(closest-side, black 78%, transparent 100%)',
                filter: 'contrast(1.1) brightness(1.03)',
            }}
        >
            <img src="/hero/logo-neura.webp" alt="" width="720" height="720" fetchPriority="high" className="h-full w-full" />
            <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500"
                muted
                loop
                playsInline
                preload="none"
                onPlaying={(e) => { e.currentTarget.style.opacity = '1'; }}
            />
        </div>
    );
}

export default function Hero({ onVerVideo }: HeroProps) {
    return (
        <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-white text-text-primary lg:flex-row lg:items-center">
            <LogoAnimado />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-2 md:px-12 lg:pb-16 lg:pt-24">
                <div className="max-w-[38rem]">
                    <p className="hero-entra mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-brand-blue-dark sm:text-xs">
                        Conectá. Automatizá. Decidí.
                    </p>

                    <h1 className="font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[clamp(3.75rem,5.7vw,5.25rem)]">
                        Tu pyme,
                        <br />
                        en tiempo real
                        <br />
                        <span className="text-brand-blue">con IA.</span>
                    </h1>

                    <p
                        className="hero-entra mt-6 max-w-md text-lg leading-relaxed text-text-secondary sm:text-xl"
                        style={{ animationDelay: '90ms' }}
                    >
                        Unificá sistemas, automatizá procesos y convertí datos en mejores decisiones.
                    </p>

                    <div
                        className="hero-entra mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                        style={{ animationDelay: '170ms' }}
                    >
                        <a
                            href={WHATSAPP_REUNION}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-brand-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                        >
                            <MessageCircle className="h-5 w-5" aria-hidden="true" />
                            Coordinemos una reunión
                        </a>
                        <button
                            type="button"
                            onClick={onVerVideo}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-semibold text-text-primary transition-colors duration-200 hover:border-brand-blue hover:text-brand-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                        >
                            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                            Ver el video · 1 min
                        </button>
                    </div>

                    <ul
                        className="hero-entra mt-8 flex flex-wrap gap-1.5 sm:gap-2.5"
                        style={{ animationDelay: '250ms' }}
                        aria-label="Las tres piezas de Neura Orkesta"
                    >
                        {piezas.map((pieza) => (
                            <li key={pieza.nombre}>
                                <a
                                    href="#productos"
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2.5 py-1.5 text-[0.8rem] font-medium text-text-secondary transition-colors duration-200 hover:border-brand-blue/50 hover:text-text-primary sm:px-4 sm:text-sm"
                                >
                                    <span className={`h-1.5 w-1.5 rounded-full ${pieza.punto}`} aria-hidden="true" />
                                    {pieza.nombre}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <p
                        className="hero-entra mt-6 hidden text-base text-text-secondary sm:block"
                        style={{ animationDelay: '320ms' }}
                    >
                        Entendé lo que pasa.{' '}
                        <strong className="font-semibold text-text-primary">Mirá para adelante.</strong>
                    </p>
                </div>
            </div>
        </section>
    );
}
