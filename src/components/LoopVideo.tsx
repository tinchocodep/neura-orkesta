import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

interface LoopVideoProps {
    /** Ruta del mp4 dentro de /public */
    src: string;
    /** Imagen de póster: es lo que se ve antes de que cargue y con reduced-motion */
    poster: string;
    alt: string;
    className?: string;
}

/**
 * Video decorativo en loop.
 *
 * Tres cosas que un <video autoplay loop> suelto no hace y acá importan:
 *
 * 1. No descarga nada hasta que la sección se acerca al viewport. Con tres de
 *    estos en la página, `preload="auto"` serían ~180KB y tres decodificadores
 *    compitiendo desde el primer frame.
 * 2. Pausa cuando sale de pantalla. Un video fuera de viewport sigue decodificando
 *    y gastando batería.
 * 3. Con prefers-reduced-motion no reproduce nunca: queda el póster, que muestra
 *    exactamente lo mismo quieto. Reducir movimiento no puede significar perder
 *    contenido.
 */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * matchMedia es un store externo, así que se lee con useSyncExternalStore en vez
 * de con useState + useEffect: evita el render en cascada y devuelve el valor
 * correcto ya en el primer render, sin un frame intermedio con el video montado.
 */
function useReducedMotionPreference() {
    return useSyncExternalStore(
        (onChange) => {
            const query = window.matchMedia(REDUCED_MOTION_QUERY);
            query.addEventListener('change', onChange);
            return () => query.removeEventListener('change', onChange);
        },
        () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
        () => false,
    );
}

export default function LoopVideo({ src, poster, alt, className = '' }: LoopVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const reduceMotion = useReducedMotionPreference();

    useEffect(() => {
        const el = containerRef.current;
        if (!el || reduceMotion) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    videoRef.current?.play().catch(() => {
                        /* autoplay bloqueado: queda el póster, que es válido */
                    });
                } else {
                    videoRef.current?.pause();
                }
            },
            { rootMargin: '200px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [reduceMotion]);

    return (
        <div ref={containerRef} className={className}>
            {reduceMotion ? (
                <img src={poster} alt={alt} className="h-full w-full object-contain" loading="lazy" decoding="async" />
            ) : (
                <video
                    ref={videoRef}
                    src={shouldLoad ? src : undefined}
                    poster={poster}
                    aria-label={alt}
                    className="h-full w-full object-contain"
                    muted
                    loop
                    playsInline
                    preload="none"
                />
            )}
        </div>
    );
}
