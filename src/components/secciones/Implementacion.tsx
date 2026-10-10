import { ArrowRight, Link as Eslabon, SlidersVertical, Users, type LucideIcon } from 'lucide-react';
import Aparece from '../ui/Aparece';
import { useEnPantalla } from '../ui/useEnPantalla';

interface DatosEtapa {
    numero: string;
    nombre: string;
    texto: string;
    etiqueta?: { texto: string; Icono: LucideIcon };
    /** Cuándo llega la línea a esta etapa: en escritorio las cuatro entran juntas y se escalonan. */
    retraso: string;
}

const etapas: DatosEtapa[] = [
    {
        numero: '01',
        nombre: 'Relevamiento',
        texto: 'Miramos cómo trabajás, paso a paso.',
        retraso: 'delay-0',
    },
    {
        numero: '02',
        nombre: 'Configuración',
        texto: 'Activamos lo que tu operación necesita. El core ya existe: no empezás desde cero.',
        etiqueta: { texto: 'Lo que necesitás', Icono: SlidersVertical },
        retraso: 'delay-100 lg:delay-[450ms]',
    },
    {
        numero: '03',
        nombre: 'Conexión',
        texto: 'Conectamos los sistemas que ya usás e incorporamos tus datos.',
        etiqueta: { texto: 'Sistemas conectados', Icono: Eslabon },
        retraso: 'delay-200 lg:delay-[900ms]',
    },
    {
        numero: '04',
        nombre: 'Puesta en marcha',
        texto: 'Arrancamos con tu equipo, acompañado, hasta que puede operar por su cuenta.',
        etiqueta: { texto: 'Equipo acompañado', Icono: Users },
        retraso: 'delay-300 lg:delay-[1350ms]',
    },
];

function Etapa({ etapa, ultima }: { etapa: DatosEtapa; ultima: boolean }) {
    const { ref, enPantalla } = useEnPantalla<HTMLLIElement>(0.6);
    const { numero, nombre, texto, etiqueta, retraso } = etapa;

    const circulo = !enPantalla
        ? 'border-line bg-white text-ink-soft'
        : ultima
            ? 'border-brand-blue bg-brand-blue text-white'
            : 'border-brand-blue bg-white text-brand-blue';

    return (
        <li ref={ref} className={`relative flex gap-5 lg:block lg:pr-10 ${ultima ? '' : 'pb-10 lg:pb-0'}`}>
            <span
                aria-hidden="true"
                className={`absolute bottom-0 left-[27px] top-14 w-0.5 lg:bottom-auto lg:left-20 lg:right-0 lg:top-[39px] lg:h-0.5 lg:w-auto ${
                    ultima ? 'hidden bg-gradient-to-r from-line to-transparent lg:block' : 'bg-line'
                }`}
            >
                {!ultima && (
                    <span
                        className={`block h-full w-full origin-top bg-brand-blue transition-transform duration-[450ms] ease-linear motion-reduce:transition-none lg:origin-left ${retraso} ${
                            enPantalla ? 'scale-100' : 'scale-y-0 lg:scale-x-0 lg:scale-y-100'
                        }`}
                    />
                )}
            </span>

            <span
                className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-xl tabular-nums transition-colors duration-300 motion-reduce:transition-none lg:h-20 lg:w-20 lg:text-2xl ${retraso} ${circulo}`}
            >
                {numero}
            </span>

            <div
                className={`min-w-0 flex-1 pt-3 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none lg:mt-7 lg:pt-0 ${retraso} ${
                    enPantalla ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
            >
                <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] lg:text-2xl">{nombre}</h3>
                <p className="mt-2 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-soft lg:mt-3 lg:text-lg">{texto}</p>
                {etiqueta && (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-blue/10 px-3 py-2 text-sm font-medium text-brand-blue-dark">
                        <etiqueta.Icono className="h-4 w-4" aria-hidden="true" />
                        {etiqueta.texto}
                    </p>
                )}
            </div>
        </li>
    );
}

export default function Implementacion() {
    return (
        <section id="implementacion" aria-labelledby="implementacion-titulo" className="seccion seccion-blanca">
            <div className="contenedor">
                <Aparece>
                    <p className="sobretitulo">Implementación por etapas</p>
                    <h2 id="implementacion-titulo" className="titulo-seccion">
                        <span className="block text-balance">Empezamos por un proceso.</span>{' '}
                        <span className="block text-balance">Avanzamos con tu equipo.</span>
                    </h2>
                </Aparece>

                <ol className="mt-14 lg:mt-20 lg:grid lg:grid-cols-4">
                    {etapas.map((etapa, indice) => (
                        <Etapa key={etapa.numero} etapa={etapa} ultima={indice === etapas.length - 1} />
                    ))}
                </ol>

                <Aparece className="mt-14 lg:mt-20">
                    <div className="tarjeta flex items-center justify-between gap-6 bg-mist sm:px-8">
                        <p className="text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl">
                            Empezás por{' '}
                            <strong className="font-semibold text-ink">el proceso que más te duele.</strong>{' '}
                            El resto se suma cuando lo necesitás.
                        </p>
                        <ArrowRight className="hidden h-6 w-6 shrink-0 text-ink-soft sm:block" aria-hidden="true" />
                    </div>
                </Aparece>
            </div>
        </section>
    );
}
