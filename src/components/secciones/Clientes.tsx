import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ArrowLeftRight,
    Building2,
    FileText,
    Fuel,
    HardHat,
    Landmark,
    Printer,
    Truck,
    Users,
    Utensils,
    Wallet,
    type LucideIcon,
} from 'lucide-react';
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
const loDemas: { nombre: string; Icono: LucideIcon }[] = [
    { nombre: 'Comprobantes', Icono: FileText },
    { nombre: 'Caja', Icono: Wallet },
    { nombre: 'Banco', Icono: Landmark },
    { nombre: 'Cobros y pagos', Icono: ArrowLeftRight },
    { nombre: 'Gente', Icono: Users },
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

// Sin un control de pausa, lo que se mueve solo no puede pasar de cinco segundos (WCAG 2.2.2):
// cinco cambios de 900 ms más los 500 ms de la última transición.
const PASO_RANURA = 900;

function useRanura(total: number) {
    const ref = useRef<HTMLUListElement>(null);
    const [indice, setIndice] = useState(0);
    const tocada = useRef(false);

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
                if (tocada.current) {
                    window.clearInterval(reloj);
                    observador.disconnect();
                    return;
                }
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

    // Si la persona elige una, la vuelta sola se corta y queda la que eligió.
    const elegir = useCallback((i: number) => {
        tocada.current = true;
        setIndice(i);
    }, []);

    return { ref, indice, elegir };
}

export default function Clientes() {
    const { ref: refCifra, enPantalla } = useEnPantalla<HTMLParagraphElement>();
    const cuenta = useCuenta(CLIENTES, enPantalla);
    const { ref: refRanura, indice, elegir } = useRanura(operaciones.length);

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

                        {/* Dos placas: arriba una sola operación encendida por vez (es lo que cambia), y se puede
                            elegir tocándola; abajo las cinco siempre encendidas (es lo que es igual). La línea baja
                            desde la que está elegida. */}
                        <div className="grid gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-x-6 sm:gap-y-[1.375rem] xl:col-span-7">
                            <p className="text-sm text-on-night-soft">Cambia</p>
                            <ul
                                ref={refRanura}
                                className="grid grid-cols-6 gap-1 rounded-xl border border-brand-blue-bright/45 bg-brand-blue/10 p-1 sm:grid-cols-5"
                            >
                                {operaciones.map((operacion, i) => (
                                    <li
                                        key={operacion}
                                        className={`relative sm:col-span-1 ${i < 3 ? 'col-span-2' : 'col-span-3'}`}
                                    >
                                        <button
                                            type="button"
                                            aria-pressed={i === indice}
                                            onClick={() => elegir(i)}
                                            className={`min-h-11 w-full whitespace-nowrap rounded-lg px-2 text-center text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-light motion-reduce:transition-none sm:text-[0.9375rem] ${
                                                i === indice
                                                    ? 'bg-brand-blue text-white'
                                                    : 'text-on-night-soft hover:bg-white/[0.06] hover:text-on-night'
                                            }`}
                                        >
                                            {operacion}
                                        </button>
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none absolute left-1/2 top-full hidden h-[calc(1.375rem+5px)] w-px -translate-x-1/2 bg-brand-blue-bright transition-opacity duration-300 after:absolute after:-bottom-[3px] after:left-1/2 after:h-[5px] after:w-[5px] after:-translate-x-1/2 after:rounded-full after:bg-brand-blue-bright motion-reduce:transition-none sm:block ${
                                                i === indice ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        />
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-5 text-sm text-on-night-soft sm:mt-0">Es igual</p>
                            {/* En el celular las dos placas se parten en tres y dos: con cinco en fila no entran. */}
                            <ul className="grid grid-cols-6 gap-px overflow-hidden rounded-xl border border-night-line bg-night-line sm:grid-cols-5">
                                {loDemas.map(({ nombre, Icono }, i) => (
                                    <li
                                        key={nombre}
                                        className={`flex flex-col items-center gap-2.5 bg-night-soft px-2 py-4 text-center text-[0.8125rem] font-medium leading-tight text-on-night sm:col-span-1 sm:py-5 sm:text-sm ${
                                            i < 3 ? 'col-span-2' : 'col-span-3'
                                        }`}
                                    >
                                        <Icono className="h-5 w-5 text-brand-blue-light" strokeWidth={1.75} aria-hidden="true" />
                                        <span className="text-balance">{nombre}</span>
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
