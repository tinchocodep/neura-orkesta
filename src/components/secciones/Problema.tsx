import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { ArrowRight, Check, CheckCheck, FileText, Link2, Unplug, Zap } from 'lucide-react';
import { useEnPantalla } from '../ui/useEnPantalla';

interface Herramienta {
    rotulo: string;
    nombre: string;
    linea: string;
    dibujo: ReactNode;
    // Cada tarjeta arranca corrida y torcida a propósito: se tienen que ver sueltas.
    caida: number;
    giro: number;
    sinHerramienta?: boolean;
}

function Renglon({ ancho, tono = 'bg-ink/20' }: { ancho: string; tono?: string }) {
    return <span className={`block h-1 rounded-full ${tono}`} style={{ width: ancho }} />;
}

// El sistema que factura: un comprobante emitido, con su CAE.
function DibujoFactura() {
    return (
        <div className="relative mx-auto h-full w-[58%] max-w-[10.5rem] rounded-md bg-mist p-3 shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between">
                <span className="h-1.5 w-12 rounded-full bg-ink/70" />
                <span className="rounded-[3px] border border-ink/40 px-1 text-[0.5625rem] font-bold leading-[0.875rem] text-ink">A</span>
            </div>
            <div className="mt-3 space-y-2">
                {['70%', '54%', '62%'].map((ancho) => (
                    <div key={ancho} className="flex items-center justify-between gap-3">
                        <Renglon ancho={ancho} />
                        <Renglon ancho="1.25rem" tono="bg-ink/35" />
                    </div>
                ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-ink/15 pt-2">
                <Renglon ancho="1.75rem" tono="bg-ink/45" />
                <span className="h-1.5 w-10 rounded-full bg-ink" />
            </div>
            <span className="absolute -bottom-2.5 -right-3 flex -rotate-6 items-center gap-1 rounded-md border-2 border-ok bg-night px-1.5 py-0.5 text-[0.5625rem] font-bold tracking-[0.12em] text-ok">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                CAE
            </span>
        </div>
    );
}

// La planilla de costos: una grilla que alguien tiene que acordarse de actualizar.
function DibujoPlanilla() {
    const filas = [
        ['62%', '40%', '55%'],
        ['48%', '66%', '34%'],
        ['70%', '30%', '60%'],
        ['40%', '52%', '46%'],
    ];
    return (
        <div className="mx-auto h-full w-[88%] max-w-[15rem] overflow-hidden rounded-md bg-white text-[0.5rem] font-semibold text-ink-soft shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
            <div className="grid grid-cols-[1.1rem_repeat(3,1fr)] border-b border-ink/10 bg-[#E6F4EC] text-center leading-[1.125rem] text-[#1D7A4F]">
                <span />
                <span>A</span>
                <span>B</span>
                <span>C</span>
            </div>
            {filas.map((celdas, f) => (
                <div key={f} className="grid h-[1.3rem] grid-cols-[1.1rem_repeat(3,1fr)] border-b border-ink/[0.07] last:border-b-0">
                    <span className="flex items-center justify-center border-r border-ink/10 bg-mist">{f + 1}</span>
                    {celdas.map((ancho, c) => (
                        <span
                            key={c}
                            className={`flex items-center border-r border-ink/[0.07] px-1.5 last:border-r-0 ${
                                f === 1 && c === 1 ? 'outline outline-2 -outline-offset-1 outline-[#1D9A6C]' : ''
                            }`}
                        >
                            <Renglon ancho={ancho} tono={c === 2 ? 'bg-[#1D9A6C]/50' : 'bg-ink/25'} />
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}

// La mensajería: ahí se decide, entre mensajes que van y vienen.
function DibujoChat() {
    return (
        <div className="mx-auto flex h-full w-[84%] max-w-[14rem] flex-col justify-center gap-1.5">
            <span className="max-w-[72%] self-start rounded-2xl rounded-bl-[4px] bg-night-line px-3 py-2">
                <Renglon ancho="4.5rem" tono="bg-on-night-soft/60" />
            </span>
            <span className="flex max-w-[72%] items-end gap-1.5 self-end rounded-2xl rounded-br-[4px] bg-brand-blue-bright px-3 py-2">
                <Renglon ancho="3.25rem" tono="bg-white/85" />
                <CheckCheck className="h-3 w-3 text-white/80" strokeWidth={2.5} />
            </span>
            <span className="max-w-[72%] self-start rounded-2xl rounded-bl-[4px] bg-night-line px-3 py-2">
                <Renglon ancho="5.5rem" tono="bg-on-night-soft/60" />
                <span className="mt-1.5 block">
                    <Renglon ancho="3rem" tono="bg-on-night-soft/35" />
                </span>
            </span>
            <span className="flex gap-1 self-end rounded-2xl rounded-br-[4px] bg-brand-blue-bright/35 px-3 py-2.5">
                {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/80" />
                ))}
            </span>
        </div>
    );
}

// Tu cabeza: pendientes sueltos que no están escritos en ningún lado.
function DibujoCabeza() {
    const papelitos = [
        { clase: 'left-0 top-[4%] -rotate-6 bg-insight sm:left-[6%] sm:top-[8%]', ancho: ['70%', '45%'] },
        { clase: 'right-0 top-[36%] rotate-6 bg-sync sm:right-[4%] sm:top-[30%]', ancho: ['60%', '75%'] },
        { clase: 'left-[8%] bottom-0 rotate-3 bg-brand-blue-light sm:left-[20%] sm:bottom-[2%]', ancho: ['75%', '50%'] },
    ];
    return (
        <div className="relative mx-auto h-full w-[92%] max-w-[13rem] sm:w-[78%]">
            <img
                src="/secciones/cierre/logo-blanco.svg"
                alt=""
                className="absolute left-1/2 top-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.22]"
            />
            {papelitos.map((papel) => (
                <span
                    key={papel.clase}
                    className={`absolute flex h-8 w-9 flex-col justify-center gap-1 rounded-[3px] px-1.5 shadow-[0_8px_18px_rgba(0,0,0,0.4)] sm:h-11 sm:w-12 sm:gap-1.5 sm:px-2 ${papel.clase}`}
                >
                    {papel.ancho.map((ancho) => (
                        <Renglon key={ancho} ancho={ancho} tono="bg-night/45" />
                    ))}
                </span>
            ))}
            <span className="absolute right-[26%] top-[2%] font-display text-2xl font-semibold text-on-night-soft/70">?</span>
        </div>
    );
}

const herramientas: Herramienta[] = [
    {
        rotulo: 'SISTEMA',
        nombre: 'Facturación',
        linea: 'Emite y registra. La operación sigue por otro lado.',
        dibujo: <DibujoFactura />,
        caida: 0,
        giro: -2.2,
    },
    {
        rotulo: 'PLANILLA',
        nombre: 'Costos',
        linea: 'La información depende de quién la actualiza.',
        dibujo: <DibujoPlanilla />,
        caida: 30,
        giro: 1.6,
    },
    {
        rotulo: 'MENSAJERÍA',
        nombre: 'El equipo',
        linea: 'Ahí se decide, pero no siempre queda registrado.',
        dibujo: <DibujoChat />,
        caida: 8,
        giro: -1.2,
    },
    {
        rotulo: 'TU CABEZA',
        nombre: 'Lo que no está en ningún lado',
        linea: 'Pendientes e información que solo sabés vos.',
        dibujo: <DibujoCabeza />,
        caida: 40,
        giro: 2.4,
        sinHerramienta: true,
    },
];

const pasos = [
    {
        palabra: 'digitaliza',
        icono: FileText,
        encendido: 'border-brand-blue-light/40 bg-brand-blue-light/[0.08] text-brand-blue-light',
    },
    {
        palabra: 'conecta',
        icono: Link2,
        encendido: 'border-ok/40 bg-ok/[0.08] text-ok',
    },
    {
        palabra: 'automatiza',
        icono: Zap,
        encendido: 'border-insight/40 bg-insight/[0.08] text-insight',
    },
];

const APAGADO = 'border-night-line bg-transparent text-on-night-soft/40';

// El «!» hace falta: «.seccion-oscura .tarjeta» pesa más que una utilidad suelta.
const SIN_HERRAMIENTA = 'border-dashed !border-on-night-soft/30 !bg-night-soft/40';

// Los tres huecos entre las cuatro columnas (la grilla tiene 2,5rem de separación).
const HUECOS = ['calc(25% - 0.625rem)', '50%', 'calc(75% + 0.625rem)'];

export default function Problema() {
    // Las herramientas se muestran sueltas y, cuando llega el renglón «Neura las…», se
    // enderezan y se enchufan entre sí: es el problema y su salida en un mismo gesto.
    const { ref, enPantalla: conectado } = useEnPantalla<HTMLParagraphElement>(0.6);

    return (
        <section id="problema" aria-labelledby="problema-titulo" className="seccion seccion-oscura overflow-hidden">
            <div className="contenedor">
                <p className="sobretitulo">El problema</p>

                <h2 id="problema-titulo" className="titulo-seccion">
                    <span className="block">Las herramientas aisladas</span>
                    <span className="block text-sync">desconectan tu operación.</span>
                </h2>

                <ul className="relative mt-12 grid grid-cols-2 gap-x-3 gap-y-8 pb-6 sm:gap-x-5 lg:mt-16 lg:grid-cols-4 lg:gap-10 lg:pb-12 [@media(max-width:359px)]:grid-cols-1">
                    {herramientas.map((herramienta, i) => (
                        <li
                            key={herramienta.rotulo}
                            className={`transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                                conectado
                                    ? ''
                                    : '[transform:translateY(calc(var(--caida)*0.35))_rotate(calc(var(--giro)*0.6))] lg:[transform:translateY(var(--caida))_rotate(var(--giro))]'
                            }`}
                            style={
                                {
                                    '--caida': `${herramienta.caida}px`,
                                    '--giro': `${herramienta.giro}deg`,
                                    transitionDelay: conectado ? `${350 + i * 110}ms` : '0ms',
                                } as CSSProperties
                            }
                        >
                            <div
                                className={`tarjeta flex h-full flex-col overflow-hidden !p-0 ${
                                    herramienta.sinHerramienta ? SIN_HERRAMIENTA : ''
                                }`}
                            >
                                <div
                                    className="h-36 bg-gradient-to-b from-white/[0.05] to-transparent px-4 pb-3 pt-6 sm:h-44 sm:pt-7"
                                    aria-hidden="true"
                                >
                                    {herramienta.dibujo}
                                </div>

                                <div className="flex flex-1 flex-col p-4 pt-5 sm:p-6">
                                    <p className="text-[0.625rem] font-medium tracking-[0.2em] text-on-night-soft sm:text-[0.6875rem] sm:tracking-[0.24em]">
                                        {herramienta.rotulo}
                                    </p>
                                    <h3 className="mt-2 text-balance font-display text-lg font-semibold leading-[1.12] tracking-[-0.025em] sm:text-2xl">
                                        {herramienta.nombre}
                                    </h3>
                                    <p className="mt-2 text-balance text-sm leading-relaxed text-on-night-soft sm:text-base">
                                        {herramienta.linea}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}

                    {HUECOS.map((izquierda, i) => (
                        <li
                            key={izquierda}
                            aria-hidden="true"
                            className={`pointer-events-none absolute top-[5.5rem] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-500 motion-reduce:transition-none lg:flex ${
                                conectado ? 'border-ok/50 bg-night text-ok' : 'border-sync/40 bg-night text-sync'
                            }`}
                            style={{ left: izquierda, transitionDelay: conectado ? `${900 + i * 200}ms` : '0ms' }}
                        >
                            {conectado ? <Link2 className="h-4 w-4" /> : <Unplug className="h-4 w-4" />}
                        </li>
                    ))}
                </ul>

                <p
                    ref={ref}
                    className="mt-10 flex flex-col gap-4 text-lg text-on-night-soft sm:mt-12 lg:flex-row lg:items-center lg:gap-7 lg:text-[1.375rem]"
                >
                    <span className="flex items-baseline gap-3 lg:gap-4">
                        <span className="font-display text-5xl font-semibold leading-none tracking-[-0.035em] text-on-night sm:text-6xl">
                            Neura
                        </span>
                        <span>las</span>
                    </span>{' '}
                    <span className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 sm:flex sm:flex-wrap sm:gap-3 lg:gap-4">
                        {pasos.map((paso, i) => {
                            const Icono = paso.icono;
                            const espera = conectado ? `${500 + i * 450}ms` : '0ms';
                            return (
                                <Fragment key={paso.palabra}>
                                    {i > 0 && (
                                        <ArrowRight
                                            className={`h-3.5 w-3.5 shrink-0 text-on-night-soft transition-opacity duration-700 motion-reduce:transition-none sm:h-[1.125rem] sm:w-[1.125rem] ${
                                                conectado ? 'opacity-80' : 'opacity-30'
                                            }`}
                                            style={{ transitionDelay: espera }}
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span
                                        className={`flex flex-col items-center gap-1.5 rounded-xl border px-1 py-3 text-sm font-medium transition-colors duration-700 motion-reduce:transition-none sm:flex-row sm:gap-2.5 sm:px-5 sm:py-3 sm:text-lg lg:gap-3 lg:px-6 lg:py-3.5 lg:text-[1.375rem] [@media(max-width:359px)]:text-[0.8125rem] ${
                                            conectado ? paso.encendido : APAGADO
                                        }`}
                                        style={{ transitionDelay: espera }}
                                    >
                                        <Icono
                                            className="h-[1.125rem] w-[1.125rem] shrink-0 sm:h-5 sm:w-5 lg:h-[1.375rem] lg:w-[1.375rem]"
                                            strokeWidth={1.75}
                                            aria-hidden="true"
                                        />
                                        {paso.palabra}
                                    </span>{' '}
                                </Fragment>
                            );
                        })}
                    </span>
                </p>
            </div>
        </section>
    );
}
