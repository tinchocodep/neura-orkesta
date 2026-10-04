import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_REUNION } from '../contacto';
import { CONTORNOS, NOMBRES, cajaDe, type NombrePieza } from '../solucion/cabeza';
import { BLOQUES, PASTILLAS, ROTULOS, TRAMOS, limitar, suave, type IdBloque, type IdTramo } from '../solucion/guion';
import { COLORES, PIEZAS_CONTENIDO, type ContenidoPieza } from '../solucion/piezas';
import PantallaAmpliada from '../solucion/PantallaAmpliada';
import Vitrina from '../solucion/Vitrina';
import type { Motor } from '../solucion/escena3d';

// Sólo en desarrollo: ?p=0.37 fuerza el avance sin scrollear y ?quieta=1 fuerza la versión quieta.
const consulta = import.meta.env.DEV && typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const P_FORZADO = consulta?.has('p') ? limitar(parseFloat(consulta.get('p') ?? '') || 0) : null;
const QUIETA_FORZADA = consulta?.get('quieta') === '1';

const ALTO_HEADER = 73;
// Con menos alto el bloque de cada pieza no entra entre el header y las pastillas: va la versión quieta.
const PANTALLA_GRANDE = '(min-width: 1024px) and (min-height: 620px)';
const REDUCIR_MOVIMIENTO = '(prefers-reduced-motion: reduce)';

let webgl: boolean | null = null;
function hayWebGL() {
    if (webgl === null) {
        try {
            const lienzo = document.createElement('canvas');
            const contexto = lienzo.getContext('webgl2') ?? lienzo.getContext('webgl');
            webgl = contexto !== null;
            // El contexto de prueba se suelta enseguida: los navegadores dan pocos por página.
            contexto?.getExtension('WEBGL_lose_context')?.loseContext();
        } catch {
            webgl = false;
        }
    }
    return webgl;
}

function escenaPosible() {
    if (QUIETA_FORZADA) return false;
    if (!window.matchMedia(PANTALLA_GRANDE).matches) return false;
    if (window.matchMedia(REDUCIR_MOVIMIENTO).matches) return false;
    const conexion = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (conexion?.saveData) return false;
    return hayWebGL();
}

function suscribir(avisar: () => void) {
    const consultas = [window.matchMedia(PANTALLA_GRANDE), window.matchMedia(REDUCIR_MOVIMIENTO)];
    consultas.forEach((c) => c.addEventListener('change', avisar));
    return () => consultas.forEach((c) => c.removeEventListener('change', avisar));
}

// El alto con respaldo en vh no se puede escribir como estilo en línea, y el encuadre de la
// maqueta se calcula entero en CSS a partir de variables (ver Vitrina).
const ESTILOS = `
.sol-pista{height:560vh}
.sol-pista-forzada{height:100vh;height:100svh}
.sol-escenario{height:100vh;height:100svh}
.sol-capa{position:absolute;left:0;top:0;width:100%;aspect-ratio:4/3;transform-origin:0 0;
  --zz:calc(var(--z0)*(1 + 0.08*var(--e,0.5)));
  transform:translate(calc((var(--ax) - var(--cx)*var(--zz))*100%),calc((var(--ay) - var(--cy)*var(--zz))*100%)) scale(var(--zz))}
.sol-rotulo{position:absolute;transform:translate(-50%,-50%) scale(calc(1/var(--zz)))}
`;

interface PiezasSvgProps {
    formas: readonly NombrePieza[];
    className?: string;
    /** Un solo color para todas las piezas, en vez del propio de cada una. */
    color?: string;
}

function PiezasSvg({ formas, className, color }: PiezasSvgProps) {
    return (
        <svg viewBox={cajaDe(formas)} aria-hidden="true" className={className}>
            {formas.map((forma) => (
                <path key={forma} d={CONTORNOS[forma]} fill={color ?? COLORES[forma]} />
            ))}
        </svg>
    );
}

function Punto({ color }: { color: string }) {
    return <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />;
}

interface BloqueProps {
    pieza: ContenidoPieza;
    escena: boolean;
    onAmpliar: () => void;
}

function Bloque({ pieza, escena, onAmpliar }: BloqueProps) {
    // En la escena el texto de la derecha deja libre la franja de la tarjeta del video (140 px + márgenes).
    const lugar: CSSProperties = pieza.lado === 'der'
        ? { right: 'max(196px, calc((100vw - 1280px) / 2))' }
        : { left: 'max(6vw, calc((100vw - 1280px) / 2))' };

    return (
        <article
            data-bloque={pieza.id}
            data-lado={pieza.lado}
            className={
                escena
                    ? 'absolute bottom-[76px] flex w-[min(43vw,600px)] flex-col justify-center opacity-0 will-change-[opacity,transform]'
                    : 'grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16'
            }
            style={escena ? { ...lugar, top: ALTO_HEADER } : undefined}
        >
            <div className={!escena && pieza.lado === 'izq' ? 'lg:order-2' : ''}>
                {!escena && <PiezasSvg formas={[pieza.forma]} className="mb-6 h-20 w-auto lg:h-24" />}
                <p className="flex items-center gap-2.5 text-[0.8125rem] font-semibold uppercase leading-none tracking-[0.2em] text-ink">
                    <Punto color={pieza.color} />
                    {pieza.nombre}
                </p>
                <h3
                    className="mt-3 font-display text-6xl font-semibold leading-none tracking-[-0.04em] sm:text-7xl"
                    style={escena ? { fontSize: 'clamp(3rem, min(6.2vw, 10.5vh), 6.25rem)' } : undefined}
                >
                    {pieza.titulo}
                </h3>
                <p
                    className="mt-4 max-w-[32em] text-lg leading-normal text-ink-soft sm:text-xl sm:leading-normal"
                    style={escena ? { fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)' } : undefined}
                >
                    {pieza.texto}
                </p>
            </div>
            <Vitrina
                pieza={pieza}
                onAmpliar={onAmpliar}
                className={escena ? 'mt-5' : ''}
                // El tercer tope ata el ancho al alto que queda en ventanas bajas (notebooks de 768).
                style={escena ? { width: 'min(100%, 68vh, calc((100vh - 390px) * 1.6))' } : undefined}
            />
        </article>
    );
}

export default function Solucion() {
    const apta = useSyncExternalStore(suscribir, escenaPosible, () => false);
    const [falla, setFalla] = useState(false);
    const [motorListo, setMotorListo] = useState(false);
    const [ampliada, setAmpliada] = useState<ContenidoPieza | null>(null);
    const seccionRef = useRef<HTMLElement>(null);
    const lienzoRef = useRef<HTMLDivElement>(null);
    const capaRef = useRef<HTMLDivElement>(null);

    const escena = apta && !falla;
    const cerrar = useCallback(() => setAmpliada(null), []);

    useEffect(() => {
        const seccion = seccionRef.current;
        const lienzo = lienzoRef.current;
        const capa = capaRef.current;
        if (!escena || !seccion || !lienzo || !capa) return;

        const buscar = (selector: string) => capa.querySelector<HTMLElement>(selector);
        const bloques = (Object.keys(BLOQUES) as IdBloque[]).map((id) => ({ id, el: buscar(`[data-bloque="${id}"]`) }));
        const rotulos = NOMBRES.map((nombre) => ({ nombre, el: buscar(`[data-rotulo="${nombre}"]`) }));
        const riel = buscar('[data-riel]');
        const pastillas = Array.from(capa.querySelectorAll<HTMLElement>('[data-pastilla]'));

        let motor: Motor | null = null;
        let cancelado = false;
        let cuadroId = 0;
        let enVista = P_FORZADO !== null;
        let meta = P_FORZADO ?? 0;
        let visto = meta;
        let ultimo = '';
        let anterior = performance.now();

        const leerScroll = () => {
            if (P_FORZADO !== null) return;
            const caja = seccion.getBoundingClientRect();
            const total = caja.height - window.innerHeight;
            meta = total > 0 ? limitar(-caja.top / total) : 0;
        };

        const aplicar = (p: number) => {
            for (const { id, el } of bloques) {
                if (!el) continue;
                const [a0, a1, b0, b1] = BLOQUES[id];
                const entra = a0 < 0 ? 1 : suave(limitar((p - a0) / (a1 - a0)));
                const sale = b0 > 1 ? 0 : suave(limitar((p - b0) / (b1 - b0)));
                const opacidad = entra * (1 - sale);
                const activo = opacidad > 0.5;
                el.style.opacity = opacidad.toFixed(3);
                // Sin visibility ni inert: el bloque apagado sigue existiendo para el lector de pantalla
                // y para el Tab (alFoco lleva el scroll hasta él). Los rótulos ya son aria-hidden.
                if (id === 'rotulos') el.style.visibility = opacidad < 0.01 ? 'hidden' : 'visible';
                el.style.pointerEvents = activo ? 'auto' : 'none';
                const lado = el.dataset.lado === 'izq' ? -1 : el.dataset.lado === 'der' ? 1 : 0;
                const dx = (1 - entra) * 44 * lado + sale * 20 * lado;
                const dy = (1 - entra) * 26 - sale * 26;
                el.style.transform = `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0)`;
                if (lado !== 0) {
                    // La cámara de la maqueta se acerca un poco mientras dura el tramo.
                    const empuje = limitar((p - a0) / (b1 - a0));
                    el.querySelector<HTMLElement>('[data-vitrina]')?.style.setProperty('--e', empuje.toFixed(3));
                }
            }
            for (const { nombre, el } of rotulos) {
                if (!el) continue;
                if (!motor) {
                    el.style.visibility = 'hidden';
                    continue;
                }
                const [corrX, corrY, alinea] = ROTULOS[nombre];
                const { x, y } = motor.rotulo(nombre, corrX, corrY);
                el.style.visibility = '';
                el.style.left = `${x.toFixed(1)}px`;
                el.style.top = `${y.toFixed(1)}px`;
                el.style.transform = `translate(${alinea === 'der' ? '-100%' : '0'},-50%)`;
            }
            if (riel) {
                const visible = p > PASTILLAS[0] && p < PASTILLAS[1];
                riel.style.opacity = visible ? '1' : '0';
                riel.style.pointerEvents = visible ? 'auto' : 'none';
                riel.inert = !visible;
            }
            for (const pastilla of pastillas) {
                const tramo = TRAMOS[pastilla.dataset.pastilla as IdTramo];
                const activa = p >= tramo.desde && p < tramo.hasta;
                pastilla.dataset.activa = String(activa);
                if (activa) pastilla.setAttribute('aria-current', 'true');
                else pastilla.removeAttribute('aria-current');
            }
        };

        // El dibujo corre sólo cuando hace falta: cambió el avance o todavía se está asentando.
        const cuadro = () => {
            cuadroId = 0;
            if (!enVista) return;
            // El suavizado va por tiempo y no por cuadro: en un equipo lento la escena llega igual
            // de rápido a donde está el scroll, con menos cuadros en el medio.
            const ahora = performance.now();
            const paso = Math.min(ahora - anterior, 250);
            anterior = ahora;
            visto += (meta - visto) * (P_FORZADO !== null ? 1 : 1 - Math.exp(-paso / 110));
            if (Math.abs(meta - visto) < 0.0002) visto = meta;
            const clave = visto.toFixed(4);
            if (clave !== ultimo) {
                ultimo = clave;
                motor?.dibujar(visto);
                aplicar(visto);
            }
            if (visto !== meta) cuadroId = requestAnimationFrame(cuadro);
        };
        const pedir = () => {
            // Con ?p= (desarrollo) se dibuja en el momento: al capturar sin ventana, Chrome puede
            // sacar la foto antes de entregar el próximo cuadro de animación.
            if (P_FORZADO !== null) cuadro();
            else if (!cuadroId && enVista) {
                // Venía quieta: el primer paso no cuenta el tiempo que estuvo parada.
                anterior = performance.now() - 16;
                cuadroId = requestAnimationFrame(cuadro);
            }
        };
        const alScrollear = () => {
            leerScroll();
            pedir();
        };
        const alRedimensionar = () => {
            motor?.medir();
            ultimo = '';
            alScrollear();
        };

        // El foco que cae en un bloque apagado (Tab, lector de pantalla) trae el scroll a su tramo.
        const alFoco = (evento: FocusEvent) => {
            const bloque = (evento.target as HTMLElement).closest<HTMLElement>('[data-bloque]');
            if (!bloque || P_FORZADO !== null || parseFloat(bloque.style.opacity || '0') > 0.5) return;
            const id = bloque.dataset.bloque as IdBloque;
            const destino = id === 'remate' ? 1 : id in TRAMOS ? TRAMOS[id as IdTramo].destino : null;
            if (destino === null) return;
            const inicio = seccion.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: inicio + destino * (seccion.offsetHeight - window.innerHeight), behavior: 'auto' });
        };
        capa.addEventListener('focusin', alFoco);

        leerScroll();
        visto = meta;
        if (P_FORZADO !== null) pedir();
        window.addEventListener('scroll', alScrollear, { passive: true });
        window.addEventListener('resize', alRedimensionar);

        // Fuera de pantalla no se dibuja nada.
        const enPantalla = new IntersectionObserver(
            ([entrada]) => {
                enVista = entrada.isIntersecting || P_FORZADO !== null;
                if (enVista) alScrollear();
            },
            { rootMargin: '20% 0px' },
        );
        enPantalla.observe(seccion);

        // three.js se pide recién cuando la sección está por entrar.
        const porEntrar = new IntersectionObserver(
            ([entrada]) => {
                if (!entrada.isIntersecting) return;
                porEntrar.disconnect();
                import('../solucion/escena3d')
                    .then(({ crearMotor }) => {
                        // En StrictMode el efecto se monta dos veces: el primero ya se limpió y no crea nada.
                        if (cancelado) return;
                        motor = crearMotor(lienzo, () => setFalla(true));
                        // Se dibuja una vez aunque la sección todavía no esté a la vista: si no, al
                        // llegar de un salto el primer cuadro salía sin la cabeza.
                        motor.dibujar(visto);
                        aplicar(visto);
                        ultimo = visto.toFixed(4);
                        setMotorListo(true);
                        pedir();
                    })
                    .catch(() => {
                        if (!cancelado) setFalla(true);
                    });
            },
            { rootMargin: '100% 0px' },
        );
        porEntrar.observe(seccion);

        return () => {
            cancelado = true;
            cancelAnimationFrame(cuadroId);
            window.removeEventListener('scroll', alScrollear);
            window.removeEventListener('resize', alRedimensionar);
            capa.removeEventListener('focusin', alFoco);
            enPantalla.disconnect();
            porEntrar.disconnect();
            motor?.liberar();
            motor = null;
            setMotorListo(false);
            // Lo que la escena escribió a mano se borra (y sólo eso: el resto del estilo es de React):
            // la versión quieta usa los mismos nodos.
            for (const { el } of bloques) {
                if (!el) continue;
                for (const propiedad of ['opacity', 'visibility', 'pointer-events', 'transform']) {
                    el.style.removeProperty(propiedad);
                }
                el.querySelector<HTMLElement>('[data-vitrina]')?.style.removeProperty('--e');
            }
        };
    }, [escena]);

    const irA = (tramo: IdTramo) => {
        const seccion = seccionRef.current;
        if (!seccion) return;
        const inicio = seccion.getBoundingClientRect().top + window.scrollY;
        const reducir = window.matchMedia(REDUCIR_MOVIMIENTO).matches;
        window.scrollTo({
            top: inicio + TRAMOS[tramo].destino * (seccion.offsetHeight - window.innerHeight),
            behavior: reducir ? 'auto' : 'smooth',
        });
    };

    return (
        <section
            ref={seccionRef}
            id="solucion"
            aria-labelledby="solucion-titulo"
            className={
                escena
                    ? `relative bg-white text-ink [scroll-margin-top:0px] ${P_FORZADO !== null ? 'sol-pista-forzada' : 'sol-pista'}`
                    : 'seccion seccion-blanca overflow-hidden'
            }
        >
            <style>{ESTILOS}</style>
            <div className={escena ? 'sol-escenario sticky top-0 overflow-hidden bg-white' : 'contenedor'}>
                {escena && <div ref={lienzoRef} className="absolute inset-0" aria-hidden="true" />}

                <div ref={capaRef} className={escena ? 'pointer-events-none absolute inset-0' : 'grid gap-20 lg:gap-28'}>
                    <header
                        data-bloque="intro"
                        className={escena ? 'absolute inset-x-0 px-6 text-center' : 'text-center'}
                        style={escena ? { top: ALTO_HEADER + 20 } : undefined}
                    >
                        <p className={`sobretitulo ${escena ? 'mb-3' : ''}`}>La solución</p>
                        <h2
                            id="solucion-titulo"
                            className="titulo-seccion"
                            style={escena ? { fontSize: 'clamp(2.25rem, min(4.6vw, 7.4vh), 4.25rem)' } : undefined}
                        >
                            <span className="block">Tres piezas.</span> <span className="block">Una gestión conectada.</span>
                        </h2>
                        {/* Mientras el motor 3D carga (y en la versión quieta) la cabeza es este SVG. */}
                        {!(escena && motorListo) && (
                            <PiezasSvg
                                formas={NOMBRES}
                                // En la escena va toda azul, como arranca la cabeza 3D que la reemplaza.
                                color={escena ? COLORES.onda : undefined}
                                className={escena ? 'mx-auto mt-[5vh] h-[48vh] w-auto' : 'mx-auto mt-10 h-56 w-auto sm:h-72'}
                            />
                        )}
                    </header>

                    {escena && (
                        <div data-bloque="rotulos" aria-hidden="true" className="invisible absolute inset-0 opacity-0">
                            {PIEZAS_CONTENIDO.map((pieza) => (
                                <p
                                    key={pieza.id}
                                    data-rotulo={pieza.forma}
                                    className="absolute flex items-center gap-2.5 whitespace-nowrap text-[0.9375rem] text-ink-soft"
                                >
                                    <Punto color={pieza.color} />
                                    <b className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">{pieza.nombre}</b>
                                    {pieza.titulo}
                                </p>
                            ))}
                        </div>
                    )}

                    {PIEZAS_CONTENIDO.map((pieza) => (
                        <Bloque key={pieza.id} pieza={pieza} escena={escena} onAmpliar={() => setAmpliada(pieza)} />
                    ))}

                    <footer
                        data-bloque="remate"
                        className={escena ? 'absolute inset-x-0 bottom-[6vh] px-6 text-center opacity-0' : 'text-center'}
                    >
                        <p
                            className="mx-auto max-w-[22em] font-display text-2xl font-semibold leading-[1.15] tracking-[-0.03em] sm:text-3xl"
                            style={escena ? { fontSize: 'clamp(1.375rem, min(2.4vw, 4.2vh), 2.125rem)' } : undefined}
                        >
                            Las tres piezas rinden más juntas, pero podés arrancar por una.
                        </p>
                        <a href={WHATSAPP_REUNION} target="_blank" rel="noopener noreferrer" className="boton-primario mt-6">
                            <MessageCircle className="h-5 w-5" aria-hidden="true" />
                            Coordinemos una reunión
                        </a>
                    </footer>

                    {escena && (
                        <nav
                            data-riel
                            aria-label="Las tres piezas"
                            className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border border-line bg-white/85 p-1.5 opacity-0 backdrop-blur transition-opacity duration-300"
                        >
                            {PIEZAS_CONTENIDO.map((pieza) => (
                                <button
                                    key={pieza.id}
                                    type="button"
                                    data-pastilla={pieza.id}
                                    onClick={() => irA(pieza.id)}
                                    className="flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.8125rem] font-medium leading-none text-ink-soft transition-colors duration-200 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue data-[activa=true]:bg-ink data-[activa=true]:text-white"
                                >
                                    <Punto color={pieza.color} />
                                    {pieza.nombre}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>
            </div>

            {ampliada && <PantallaAmpliada pantalla={ampliada.pantalla} onCerrar={cerrar} />}
        </section>
    );
}
