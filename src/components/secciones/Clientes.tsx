import { useEffect, useRef, useState } from 'react';
import { Building2, Fuel, HardHat, Printer, Truck, Utensils, type LucideIcon } from 'lucide-react';
import Aparece from '../ui/Aparece';
import { useEnPantalla } from '../ui/useEnPantalla';

const CLIENTES = 10;

const rubros: { nombre: string; unidad: string; Icono: LucideIcon }[] = [
    { nombre: 'Constructoras', unidad: 'La obra', Icono: HardHat },
    { nombre: 'Transporte de cargas', unidad: 'El viaje', Icono: Truck },
    { nombre: 'Transporte de combustibles', unidad: 'El viaje', Icono: Fuel },
    { nombre: 'Administración de propiedades', unidad: 'El contrato', Icono: Building2 },
    { nombre: 'Gastronomía', unidad: 'El turno', Icono: Utensils },
    { nombre: 'Señalética e impresión 3D', unidad: 'La orden de trabajo', Icono: Printer },
];

const operaciones = ['La obra', 'El viaje', 'El contrato', 'El turno', 'La orden'];
const loDemas = ['Comprobantes', 'Caja', 'Banco', 'Cobros y pagos', 'Gente'];

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

// Sin un control de pausa, lo que se mueve solo no puede pasar de cinco segundos (WCAG 2.2.2):
// cinco cambios de 900 ms más los 500 ms de la última transición.
const PASO_RANURA = 900;

function useRanura(total: number) {
    const ref = useRef<HTMLUListElement>(null);
    const [indice, setIndice] = useState(0);

    // Da una sola vuelta y queda fija en la primera. Si sale de pantalla a mitad de camino
    // el reloj se corta y la vuelta se termina al volver.
    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let reloj = 0;
        let pasos = 0;
        const observador = new IntersectionObserver(([entrada]) => {
            window.clearInterval(reloj);
            if (!entrada.isIntersecting) return;
            reloj = window.setInterval(() => {
                pasos += 1;
                setIndice(pasos % total);
                if (pasos < total) return;
                window.clearInterval(reloj);
                observador.disconnect();
            }, PASO_RANURA);
        });
        observador.observe(el);
        return () => {
            window.clearInterval(reloj);
            observador.disconnect();
        };
    }, [total]);

    return { ref, indice };
}

export default function Clientes() {
    const { ref: refCifra, enPantalla } = useEnPantalla<HTMLParagraphElement>();
    const cuenta = useCuenta(CLIENTES, enPantalla);
    const { ref: refRanura, indice } = useRanura(operaciones.length);
    const anterior = (indice + operaciones.length - 1) % operaciones.length;

    return (
        <section
            id="clientes"
            aria-labelledby="clientes-titulo"
            className="seccion seccion-oscura isolate overflow-hidden"
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
                        Un solo core para <strong className="font-semibold text-on-night">distintas empresas.</strong>{' '}
                        Hoy, entre otras:
                    </p>
                </Aparece>

                <ul
                    aria-labelledby="clientes-rubros"
                    className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-3"
                >
                    {rubros.map(({ nombre, unidad, Icono }, i) => (
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
                                <div>
                                    <p className="text-balance font-display text-lg font-medium leading-snug tracking-[-0.01em] sm:text-xl">
                                        {nombre}
                                    </p>
                                    <p className="mt-0.5 text-sm text-on-night-soft sm:text-base">{unidad}</p>
                                </div>
                            </Aparece>
                        </li>
                    ))}
                </ul>

                <div className="mt-16 border-t border-night-line pt-14 lg:mt-24 lg:pt-20">
                    <Aparece className="grid gap-10 xl:grid-cols-12 xl:items-center xl:gap-12">
                        <h3 className="font-display text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl xl:col-span-5">
                            <span className="block text-brand-blue-light">Cambia la operación.</span>
                            <span className="block">Lo demás es igual.</span>
                        </h3>

                        <div className="xl:col-span-7">
                            <ul
                                ref={refRanura}
                                className="mx-auto grid w-fit overflow-hidden rounded-t-2xl border border-b-0 border-brand-blue-bright/60 bg-brand-blue/15 px-10 py-5 text-center font-display text-3xl font-semibold tracking-[-0.03em] text-brand-blue-light sm:px-14 sm:py-6 sm:text-[2.75rem] sm:leading-none"
                            >
                                {operaciones.map((operacion, i) => (
                                    <li
                                        key={operacion}
                                        className={`col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-500 ease-out ${
                                            i === indice
                                                ? ''
                                                : i === anterior
                                                  ? '-translate-y-full opacity-0'
                                                  : 'translate-y-full opacity-0'
                                        }`}
                                    >
                                        {operacion}
                                    </li>
                                ))}
                            </ul>
                            {/* En el celular la barra se parte siempre en tres y dos; con flex-wrap, según
                                el ancho, quedaba un chip solo en la última fila. */}
                            <ul className="grid grid-cols-[repeat(6,auto)] gap-2 rounded-2xl border border-night-line bg-night-soft p-3 sm:flex sm:gap-3 sm:p-4">
                                {loDemas.map((pieza, i) => (
                                    <li
                                        key={pieza}
                                        className={`whitespace-nowrap rounded-full border border-night-line bg-night px-3 py-2 text-center text-[0.8125rem] font-medium text-on-night sm:grow sm:px-4 sm:text-sm md:text-base ${
                                            i < 3 ? 'col-span-2' : 'col-span-3'
                                        }`}
                                    >
                                        {pieza}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Aparece>
                </div>
            </div>
        </section>
    );
}
