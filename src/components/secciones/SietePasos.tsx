import {
    Box,
    CalendarDays,
    Check,
    CircleCheck,
    CircleDot,
    ReceiptText,
    SquareCheck,
    Zap,
    type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import Aparece from '../ui/Aparece';
import { useEnPantalla } from '../ui/useEnPantalla';

interface Paso {
    numero: string;
    nombre: string;
    linea: string;
    Icono: LucideIcon;
}

const pasos: Paso[] = [
    { numero: '01', nombre: 'Necesidad', linea: 'El punto de partida', Icono: CircleDot },
    { numero: '02', nombre: 'Planificación', linea: 'Organizar el trabajo', Icono: CalendarDays },
    { numero: '03', nombre: 'Recursos', linea: 'Asignar lo necesario', Icono: Box },
    { numero: '04', nombre: 'Ejecución', linea: 'Realizar el trabajo', Icono: Zap },
    { numero: '05', nombre: 'Validación', linea: 'Comprobar el resultado', Icono: SquareCheck },
    { numero: '06', nombre: 'Facturación y pagos', linea: 'Facturar y gestionar pagos', Icono: ReceiptText },
    { numero: '07', nombre: 'Cierre', linea: 'Cerrar la operación', Icono: CircleCheck },
];

// La línea avanza a velocidad pareja: cada tramo arranca cuando termina el anterior.
// El mosaico se enciende un toque antes, que es cuando la línea le toca el borde.
const ARRANQUE_MS = 250;
const TRAMO_MS = 280;
const ANTICIPO_MS = 100;
const CIERRE_MS = 650;

const SUAVE = 'transition-opacity duration-300 motion-reduce:transition-none';

// Se observa el 07 y no la lista: en columna la lista es más alta que media pantalla y la
// secuencia cerraba en verde antes de que el 07 se viera. En fila el 07 mide lo que la lista,
// así que el umbral de siempre da el mismo arranque. 1024px es el corte lg de la grilla.
const UMBRAL_FILA = 0.35;
const UMBRAL_COLUMNA = 0.9;
const umbralSegunAncho = () =>
    window.matchMedia('(min-width: 1024px)').matches ? UMBRAL_FILA : UMBRAL_COLUMNA;

export default function SietePasos() {
    const [umbral] = useState(umbralSegunAncho);
    const { ref, enPantalla } = useEnPantalla<HTMLLIElement>(umbral);
    const ultimo = pasos.length - 1;

    return (
        <section id="siete-pasos" aria-labelledby="siete-pasos-titulo" className="seccion seccion-clara">
            <div className="contenedor">
                <Aparece>
                    <p className="sobretitulo">De punta a punta</p>
                    <h2 id="siete-pasos-titulo" className="titulo-seccion">
                        Una operación.
                        <br />
                        Siete pasos conectados.
                    </h2>
                </Aparece>

                <ol
                    role="list"
                    className="mt-14 flex flex-col gap-7 lg:mt-20 lg:grid lg:grid-cols-7 lg:gap-x-6 lg:gap-y-0"
                >
                    {pasos.map((paso, i) => {
                        const esCierre = i === ultimo;
                        const tramo = ARRANQUE_MS + i * TRAMO_MS;
                        const demora = { transitionDelay: `${tramo - ANTICIPO_MS}ms` };
                        const demoraCierre = { transitionDelay: `${tramo - ANTICIPO_MS + CIERRE_MS}ms` };

                        return (
                            <li
                                key={paso.numero}
                                ref={esCierre ? ref : undefined}
                                className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] grid-rows-[auto_auto_1fr] gap-x-5 lg:block"
                            >
                                <p
                                    className="col-start-2 row-start-1 text-xs font-medium tabular-nums tracking-[0.18em] text-ink-soft lg:mb-3"
                                    aria-hidden="true"
                                >
                                    {paso.numero}
                                </p>

                                <div className="relative col-start-1 row-span-3 row-start-1" aria-hidden="true">
                                    {!esCierre && (
                                        <span className="absolute left-7 top-7 h-[calc(100%+1.75rem)] w-0.5 -translate-x-1/2 bg-line lg:left-8 lg:top-8 lg:h-0.5 lg:w-[calc(100%+1.5rem)] lg:-translate-y-1/2 lg:translate-x-0 xl:left-10 xl:top-10">
                                            <span
                                                className={`absolute inset-0 origin-top-left bg-brand-blue transition-transform ease-linear motion-reduce:transition-none ${
                                                    enPantalla
                                                        ? 'scale-x-100 scale-y-100'
                                                        : 'scale-y-0 lg:scale-x-0 lg:scale-y-100'
                                                }`}
                                                style={{ transitionDelay: `${tramo}ms`, transitionDuration: `${TRAMO_MS}ms` }}
                                            />
                                        </span>
                                    )}

                                    <div
                                        className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border bg-white transition-[border-color,box-shadow,color] duration-300 motion-reduce:transition-none lg:h-16 lg:w-16 xl:h-20 xl:w-20 xl:rounded-[1.4rem] ${
                                            enPantalla
                                                ? `border-brand-blue/25 text-brand-blue ${esCierre ? '' : 'shadow-[0_14px_30px_-16px_rgba(43,104,230,0.5)]'}`
                                                : 'border-line text-ink-soft/40'
                                        }`}
                                        style={demora}
                                    >
                                        <paso.Icono className="h-6 w-6 xl:h-7 xl:w-7" strokeWidth={1.75} />

                                        {esCierre && (
                                            <>
                                                <span
                                                    className={`absolute -inset-px flex items-center justify-center rounded-[inherit] bg-brand-blue text-white ${SUAVE} ${
                                                        enPantalla ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                    style={demora}
                                                >
                                                    <paso.Icono className="h-6 w-6 xl:h-7 xl:w-7" strokeWidth={1.75} />
                                                </span>
                                                <span
                                                    className={`absolute -inset-px flex items-center justify-center rounded-[inherit] bg-ok text-night shadow-[0_14px_30px_-14px_rgba(40,170,125,0.75)] ${SUAVE} ${
                                                        enPantalla ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                    style={demoraCierre}
                                                >
                                                    <Check
                                                        className={`h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none xl:h-8 xl:w-8 ${
                                                            enPantalla ? 'scale-100' : 'scale-50'
                                                        }`}
                                                        strokeWidth={2.5}
                                                        style={demoraCierre}
                                                    />
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <h3 className="col-start-2 row-start-2 mt-0.5 text-balance font-display text-lg font-semibold leading-tight tracking-[-0.02em] text-ink lg:mt-5 lg:text-[1.0625rem] xl:text-xl">
                                    {paso.nombre}
                                </h3>
                                <p className="col-start-2 row-start-3 mt-1 text-balance text-[0.9375rem] leading-snug text-ink-soft lg:mt-2 lg:text-sm xl:text-base xl:leading-snug">
                                    {paso.linea}
                                </p>
                            </li>
                        );
                    })}
                </ol>

                <Aparece
                    retraso={150}
                    className="mt-16 border-t border-ink/10 pt-10 lg:mt-24 lg:flex lg:items-end lg:justify-between lg:gap-12"
                >
                    <p className="font-display text-2xl font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[1.75rem]">
                        Neura orkesta
                        <br />
                        los 7 procesos en conjunto.
                    </p>
                    <p className="mt-6 text-lg leading-snug text-ink-soft lg:mt-0 lg:text-right lg:text-xl lg:leading-snug">
                        No queda solo ejecutado.{' '}
                        <strong className="block font-semibold text-ink">Queda cerrado.</strong>
                    </p>
                </Aparece>
            </div>
        </section>
    );
}
