import { useEffect, useRef, type ReactNode } from 'react';

interface ApareceProps {
    children: ReactNode;
    /** Milisegundos de espera, para escalonar varios elementos. */
    retraso?: number;
    className?: string;
}

export default function Aparece({ children, retraso = 0, className = '' }: ApareceProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observador = new IntersectionObserver(
            ([entrada]) => {
                if (!entrada.isIntersecting) return;
                el.classList.add('visible');
                observador.disconnect();
            },
            { threshold: 0.15 },
        );
        observador.observe(el);
        return () => observador.disconnect();
    }, []);

    return (
        <div ref={ref} className={`aparece ${className}`} style={{ transitionDelay: `${retraso}ms` }}>
            {children}
        </div>
    );
}
