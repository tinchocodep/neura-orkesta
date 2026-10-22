import { useEffect, useState } from 'react';
import { Building2, Fuel, HardHat, Printer, Truck, Utensils, type LucideIcon } from 'lucide-react';
import Aparece from '../ui/Aparece';
import { useEnPantalla } from '../ui/useEnPantalla';

const CLIENTES = 10;

const rubros: { nombre: string; Icono: LucideIcon }[] = [
    { nombre: 'Constructoras', Icono: HardHat },
    { nombre: 'Transporte de cargas', Icono: Truck },
    { nombre: 'Transporte de combustibles', Icono: Fuel },
    { nombre: 'Administración de propiedades', Icono: Building2 },
    { nombre: 'Gastronomía', Icono: Utensils },
    { nombre: 'Señalética e impresión 3D', Icono: Printer },
];

// El render trae fondo negro y un destello en la esquina: la elipse deja sólo los anillos
// y llega a cero antes de los cuatro bordes, así no se ve el rectángulo.
const MASCARA_ANILLOS = 'radial-gradient(ellipse 33% 54% at 67% 46%, #000 55%, transparent 100%)';

function useCuenta(hasta: number, activa: boolean) {
    const [valor, setValor] = useState(() => (activa ? hasta : 0));

    useEffect(() => {
        if (!activa || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let reloj = 0;
        // Cada número tarda un poco más que el anterior: la cuenta frena al llegar.
        function paso(n: number) {
            setValor(n);
            if (n < hasta) reloj = window.setTimeout(paso, 70 + n * 16, n + 1);
        }
        reloj = window.setTimeout(paso, 250, 1);
        return () => window.clearTimeout(reloj);
    }, [activa, hasta]);

    return valor;
}

export default function Clientes() {
    const { ref: refCifra, enPantalla } = useEnPantalla<HTMLParagraphElement>();
    const cuenta = useCuenta(CLIENTES, enPantalla);

    return (
        // Con «hidden» solo, la sección es una zona con scroll escondido (los anillos se salen por la derecha)
        // y el navegador la podía correr de costado. «clip» recorta sin armar esa zona.
        <section
            id="clientes"
            aria-labelledby="clientes-titulo"
            className="seccion seccion-oscura isolate overflow-hidden overflow-clip"
        >
            <div className="contenedor relative">
                <img
                    src="/secciones/clientes/anillos.webp"
                    alt=""
                    aria-hidden="true"
                    width="1344"
                    height="752"
                    loading="lazy"
                    decoding="async"
                    className="pointer-events-none absolute -right-44 -top-36 -z-10 w-[30rem] max-w-none select-none opacity-40 mix-blend-lighten lg:-right-[2vw] lg:-top-20 lg:w-[min(62vw,56rem)] lg:opacity-50"
                    style={{ maskImage: MASCARA_ANILLOS, WebkitMaskImage: MASCARA_ANILLOS }}
                />

                <Aparece>
                    <p className="sobretitulo">En producción</p>
                    <h2 id="clientes-titulo" className="titulo-seccion">
                        Clientes de hoy
                    </h2>
                </Aparece>

                <Aparece retraso={90}>
                    <p
                        ref={refCifra}
                        className="mt-8 whitespace-nowrap font-display text-[clamp(2.75rem,16vw,7.5rem)] font-semibold leading-none tracking-[-0.045em] text-brand-blue-light lg:mt-10 lg:text-[clamp(5.25rem,8.4vw,7.5rem)]"
                    >
                        <span className="sr-only">+{CLIENTES} clientes</span>
                        <span aria-hidden="true">+{cuenta} clientes</span>
                    </p>
                    <p className="mt-4 text-2xl text-on-night sm:text-3xl lg:mt-6">ya usan Neura.</p>
                    <p id="clientes-rubros" className="mt-5 text-lg text-on-night-soft sm:text-xl">
                        Empresas de <strong className="font-semibold text-on-night">diferentes industrias</strong>{' '}
                        optimizan su gestión con Neura.
                    </p>
                </Aparece>

                <ul
                    aria-labelledby="clientes-rubros"
                    className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-3"
                >
                    {rubros.map(({ nombre, Icono }, i) => (
                        <li key={nombre}>
                            <Aparece
                                retraso={i * 70}
                                className="tarjeta flex h-full items-center gap-4 px-5 py-4 sm:gap-5 sm:p-6"
                            >
                                <Icono
                                    className="h-7 w-7 shrink-0 text-brand-blue-light sm:h-8 sm:w-8"
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                />
                                <p className="text-balance font-display text-lg font-medium leading-snug tracking-[-0.01em] sm:text-xl">
                                    {nombre}
                                </p>
                            </Aparece>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
