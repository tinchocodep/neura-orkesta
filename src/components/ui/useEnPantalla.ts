import { useEffect, useRef, useState } from 'react';

/**
 * Avisa una sola vez cuando el elemento entra en pantalla. Sirve para arrancar una
 * secuencia propia (una línea que se llena, un contador) con transiciones de CSS.
 * Con «reducir movimiento» devuelve true de entrada: el estado final se ve sin animar.
 */
export function useEnPantalla<T extends HTMLElement>(umbral = 0.25) {
    const ref = useRef<T>(null);
    const [enPantalla, setEnPantalla] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );

    useEffect(() => {
        const el = ref.current;
        if (!el || enPantalla) return;
        const observador = new IntersectionObserver(
            ([entrada]) => {
                if (!entrada.isIntersecting) return;
                setEnPantalla(true);
                observador.disconnect();
            },
            { threshold: umbral },
        );
        observador.observe(el);
        return () => observador.disconnect();
    }, [enPantalla, umbral]);

    return { ref, enPantalla };
}
