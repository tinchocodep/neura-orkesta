import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Check, CircleAlert, MessageCircle, RotateCw } from 'lucide-react';
import Aparece from '../ui/Aparece';
import { WHATSAPP_REUNION } from '../contacto';

type Estado = 'formulario' | 'enviando' | 'fallo' | 'enviado' | 'whatsapp';

interface Datos {
    nombre: string;
    mail: string;
    empresa: string;
    rubro: string;
    proceso: string;
}

interface Errores {
    nombre?: string;
    mail?: string;
}

const ENDPOINT = (import.meta.env.VITE_NEURALITE_ENDPOINT as string | undefined) || '';

// El número vive en contacto.ts: se toma de ahí para no tenerlo escrito en dos lugares.
const WHATSAPP_BASE = WHATSAPP_REUNION.split('?')[0];

const RUBROS = [
    'Constructora',
    'Logística',
    'Combustibles',
    'Propiedades',
    'Gastronomía',
    'Señalética e impresión 3D',
    'Otro',
];

const FORMA_DE_MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ESPERA_MAXIMA = 15000;
// La barra de arriba de la página es fija: lo que cae en esa franja está en pantalla pero tapado.
const FRANJA_DE_LA_BARRA = 80;

const DATOS_VACIOS: Datos = { nombre: '', mail: '', empresa: '', rubro: '', proceso: '' };

function limpiar(datos: Datos): Datos {
    return {
        nombre: datos.nombre.trim(),
        mail: datos.mail.trim(),
        empresa: datos.empresa.trim(),
        rubro: datos.rubro,
        proceso: datos.proceso.trim(),
    };
}

function validar(datos: Datos): Errores {
    const errores: Errores = {};
    if (!datos.nombre) errores.nombre = 'Escribí tu nombre.';
    if (!datos.mail) errores.mail = 'Escribí tu mail.';
    else if (!FORMA_DE_MAIL.test(datos.mail)) errores.mail = 'Revisá el mail: le falta algo.';
    return errores;
}

function enlaceWhatsApp(datos: Datos) {
    let texto = `Hola! Quiero la demo de Neuralite. Soy ${datos.nombre} (${datos.mail})`;
    if (datos.empresa) texto += ` de ${datos.empresa}`;
    if (datos.rubro) texto += `, rubro ${datos.rubro}`;
    texto += '.';
    if (datos.proceso) texto += ` Proceso: ${datos.proceso}`;
    return `${WHATSAPP_BASE}?text=${encodeURIComponent(texto)}`;
}

// Sólo en desarrollo: ?demo=errores | enviado | whatsapp | fallo arranca la sección en ese
// estado, para poder capturarlo sin tipear.
function arranque(): { estado: Estado; datos: Datos; errores: Errores } {
    const demo = import.meta.env.DEV ? new URLSearchParams(window.location.search).get('demo') : null;
    const ejemplo: Datos = {
        nombre: 'Laura',
        mail: 'laura@ejemplo.com',
        empresa: 'Ejemplo SRL',
        rubro: 'Logística',
        proceso: '',
    };
    if (demo === 'errores') {
        const datos = { ...DATOS_VACIOS, mail: 'laura@ejemplo' };
        return { estado: 'formulario', datos, errores: validar(datos) };
    }
    if (demo === 'enviado' || demo === 'whatsapp' || demo === 'fallo') {
        return { estado: demo, datos: ejemplo, errores: {} };
    }
    return { estado: 'formulario', datos: DATOS_VACIOS, errores: {} };
}

const INICIO = arranque();

const claseCampo =
    'w-full rounded-xl border bg-white px-4 text-base text-ink transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1';
const claseCampoBien = 'border-ink-soft/75 hover:border-ink-soft focus-visible:border-brand-blue focus-visible:outline-brand-blue';
const claseCampoMal = 'border-red-700 focus-visible:outline-red-700';
const claseEtiqueta = 'block text-sm font-semibold text-ink';
const claseEnlace =
    'rounded font-semibold text-brand-blue-dark underline underline-offset-4 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue';

function Opcional() {
    return <span className="font-normal text-ink-soft"> (opcional)</span>;
}

function AvisoDeError({ id, children }: { id: string; children: ReactNode }) {
    return (
        <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {children}
        </p>
    );
}

export default function Neuralite() {
    const [estado, setEstado] = useState<Estado>(INICIO.estado);
    const [datos, setDatos] = useState<Datos>(INICIO.datos);
    const [errores, setErrores] = useState<Errores>(INICIO.errores);

    const nombreRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const botonRef = useRef<HTMLButtonElement>(null);
    const resultadoRef = useRef<HTMLHeadingElement>(null);
    const moverFoco = useRef(false);

    // Al cambiar el formulario por el resultado, el botón que tenía el foco desaparece:
    // se lleva el foco (y la vista, en el celular) a lo que acaba de aparecer.
    useEffect(() => {
        if (!moverFoco.current) return;
        if (estado === 'fallo') {
            moverFoco.current = false;
            botonRef.current?.focus();
            return;
        }
        if (estado !== 'enviado' && estado !== 'whatsapp') return;
        moverFoco.current = false;
        const el = resultadoRef.current;
        if (!el) return;
        el.focus({ preventScroll: true });
        // Se mide el bloque entero (ícono, título y texto), no sólo el título.
        const caja = (el.parentElement ?? el).getBoundingClientRect();
        if (caja.top < FRANJA_DE_LA_BARRA || caja.bottom > window.innerHeight) el.scrollIntoView({ block: 'center' });
    }, [estado]);

    function cambiar(campo: keyof Datos, valor: string) {
        setDatos((previos) => ({ ...previos, [campo]: valor }));
        if (campo === 'nombre' || campo === 'mail') {
            setErrores((previos) => ({ ...previos, [campo]: undefined }));
        }
    }

    async function enviar() {
        if (estado === 'enviando') return;
        const limpios = limpiar(datos);
        const encontrados = validar(limpios);
        setErrores(encontrados);
        if (encontrados.nombre || encontrados.mail) {
            (encontrados.nombre ? nombreRef : mailRef).current?.focus();
            return;
        }

        setDatos(limpios);
        moverFoco.current = true;

        if (!ENDPOINT) {
            window.open(enlaceWhatsApp(limpios), '_blank', 'noopener,noreferrer');
            setEstado('whatsapp');
            return;
        }

        setEstado('enviando');
        const corte = new AbortController();
        const reloj = window.setTimeout(() => corte.abort(), ESPERA_MAXIMA);
        let llego = false;
        try {
            const respuesta = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...limpios, origen: 'web-neuralite' }),
                signal: corte.signal,
            });
            llego = respuesta.ok;
        } catch {
            // Sin conexión, o el reloj cortó la espera: se trata igual que una respuesta de error.
        } finally {
            window.clearTimeout(reloj);
        }

        if (!llego) {
            setEstado('fallo');
            return;
        }
        setEstado('enviado');
    }

    const enviando = estado === 'enviando';
    const hayResultado = estado === 'enviado' || estado === 'whatsapp';

    return (
        <section id="neuralite" aria-labelledby="neuralite-titulo" className="seccion seccion-clara">
            <div className="contenedor grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
                <Aparece>
                    <p className="sobretitulo">Neuralite</p>
                    {/* En dos columnas el cuerpo acompaña al ancho para que cada renglón entre entero en la suya. */}
                    <h2
                        id="neuralite-titulo"
                        className="titulo-seccion [text-wrap:balance] lg:text-[clamp(2.5rem,3.9vw,3.5rem)]"
                    >
                        <span className="block lg:whitespace-nowrap">Dejanos tu contacto</span>{' '}
                        <span className="block text-brand-blue lg:whitespace-nowrap">y te mandamos una demo.</span>
                    </h2>
                    <p className="bajada max-w-md">
                        Completás tus datos y te llega al mail una demo de Neura para que la mires a tu ritmo.
                    </p>
                </Aparece>

                <Aparece retraso={120}>
                    <div className="tarjeta rounded-3xl p-5 shadow-[0_24px_60px_-36px_rgba(17,32,57,0.35)] sm:p-8 xl:p-10">
                        <div aria-live="polite">
                            {hayResultado && (
                                <div className="py-4 sm:py-8">
                                    <span
                                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                            estado === 'enviado' ? 'bg-ok text-ink' : 'bg-brand-blue text-white'
                                        }`}
                                        aria-hidden="true"
                                    >
                                        {estado === 'enviado' ? (
                                            <Check className="h-6 w-6" />
                                        ) : (
                                            <MessageCircle className="h-6 w-6" />
                                        )}
                                    </span>
                                    <h3
                                        ref={resultadoRef}
                                        tabIndex={-1}
                                        className="mt-6 break-words font-display text-2xl font-semibold leading-tight tracking-[-0.03em] [text-wrap:balance] focus:outline-none sm:text-3xl"
                                    >
                                        {estado === 'enviado'
                                            ? `Listo, ${datos.nombre}.`
                                            : 'Te abrimos WhatsApp para terminar de enviarlo.'}
                                    </h3>
                                    {estado === 'enviado' ? (
                                        <p className="mt-3 break-words text-lg leading-relaxed text-ink-soft [text-wrap:balance]">
                                            Te escribimos a{' '}
                                            <strong className="font-semibold text-ink">{datos.mail}</strong>{' '}
                                            con la demo.
                                        </p>
                                    ) : (
                                        <p className="mt-3 text-lg leading-relaxed text-ink-soft">
                                            Si no se abrió,{' '}
                                            <a
                                                href={enlaceWhatsApp(datos)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={claseEnlace}
                                            >
                                                tocá acá
                                            </a>
                                            .
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {!hayResultado && (
                            <form
                                noValidate
                                onSubmit={(evento) => {
                                    evento.preventDefault();
                                    void enviar();
                                }}
                            >
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                                    <div>
                                        <label htmlFor="neuralite-nombre" className={claseEtiqueta}>
                                            Nombre
                                        </label>
                                        <input
                                            ref={nombreRef}
                                            id="neuralite-nombre"
                                            name="nombre"
                                            type="text"
                                            autoComplete="name"
                                            maxLength={80}
                                            required
                                            value={datos.nombre}
                                            onChange={(e) => cambiar('nombre', e.target.value)}
                                            aria-invalid={errores.nombre ? true : undefined}
                                            aria-describedby={errores.nombre ? 'neuralite-nombre-error' : undefined}
                                            className={`mt-2 h-12 ${claseCampo} ${errores.nombre ? claseCampoMal : claseCampoBien}`}
                                        />
                                        {errores.nombre && (
                                            <AvisoDeError id="neuralite-nombre-error">{errores.nombre}</AvisoDeError>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="neuralite-mail" className={claseEtiqueta}>
                                            Mail
                                        </label>
                                        <input
                                            ref={mailRef}
                                            id="neuralite-mail"
                                            name="mail"
                                            type="email"
                                            inputMode="email"
                                            autoComplete="email"
                                            autoCapitalize="none"
                                            spellCheck={false}
                                            maxLength={120}
                                            required
                                            value={datos.mail}
                                            onChange={(e) => cambiar('mail', e.target.value)}
                                            aria-invalid={errores.mail ? true : undefined}
                                            aria-describedby={errores.mail ? 'neuralite-mail-error' : undefined}
                                            className={`mt-2 h-12 ${claseCampo} ${errores.mail ? claseCampoMal : claseCampoBien}`}
                                        />
                                        {errores.mail && (
                                            <AvisoDeError id="neuralite-mail-error">{errores.mail}</AvisoDeError>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label htmlFor="neuralite-empresa" className={claseEtiqueta}>
                                        Empresa
                                        <Opcional />
                                    </label>
                                    <input
                                        id="neuralite-empresa"
                                        name="empresa"
                                        type="text"
                                        autoComplete="organization"
                                        maxLength={80}
                                        value={datos.empresa}
                                        onChange={(e) => cambiar('empresa', e.target.value)}
                                        className={`mt-2 h-12 ${claseCampo} ${claseCampoBien}`}
                                    />
                                </div>

                                <fieldset className="mt-5 min-w-0">
                                    <legend className={claseEtiqueta}>
                                        Rubro
                                        <Opcional />
                                    </legend>
                                    <div className="mt-2.5 flex flex-wrap gap-2">
                                        {RUBROS.map((rubro) => (
                                            <label key={rubro} className="relative cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="rubro"
                                                    value={rubro}
                                                    checked={datos.rubro === rubro}
                                                    onChange={() => cambiar('rubro', rubro)}
                                                    // Es opcional: tocar de nuevo el elegido lo suelta.
                                                    onClick={() => {
                                                        if (datos.rubro === rubro) cambiar('rubro', '');
                                                    }}
                                                    className="peer sr-only"
                                                />
                                                <span className="inline-flex min-h-[2.5rem] items-center rounded-full border border-ink-soft/75 px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-brand-blue peer-checked:border-brand-blue peer-checked:bg-brand-blue peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-blue">
                                                    {rubro}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>

                                <div className="mt-5">
                                    <label htmlFor="neuralite-proceso" className={claseEtiqueta}>
                                        ¿Qué proceso te gustaría automatizar?
                                        <Opcional />
                                    </label>
                                    <textarea
                                        id="neuralite-proceso"
                                        name="proceso"
                                        rows={3}
                                        maxLength={600}
                                        value={datos.proceso}
                                        onChange={(e) => cambiar('proceso', e.target.value)}
                                        className={`mt-2 block resize-y py-3 leading-relaxed ${claseCampo} ${claseCampoBien}`}
                                    />
                                </div>

                                <div className="mt-7">
                                    {estado === 'fallo' && (
                                        <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">
                                            <p className="flex items-start gap-2 font-semibold text-red-800">
                                                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                                                No pudimos enviarlo.
                                            </p>
                                            <a
                                                href={enlaceWhatsApp(limpiar(datos))}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`ml-7 mt-1 inline-block ${claseEnlace}`}
                                            >
                                                Escribinos por WhatsApp
                                            </a>
                                        </div>
                                    )}
                                    <button
                                        ref={botonRef}
                                        type="submit"
                                        disabled={enviando}
                                        className="boton-primario w-full disabled:cursor-not-allowed disabled:bg-ink-soft disabled:hover:bg-ink-soft"
                                    >
                                        {enviando ? 'Enviando…' : estado === 'fallo' ? 'Probar de nuevo' : 'Quiero la demo'}
                                        {estado === 'formulario' && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
                                        {estado === 'fallo' && <RotateCw className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />}
                                    </button>
                                    <p className="mt-3 text-sm text-ink-soft">
                                        Usamos tus datos solo para enviarte la demo y contactarte.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </Aparece>
            </div>
        </section>
    );
}
