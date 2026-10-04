import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoWidgetProps {
    abierto: boolean;
    onAbrir: () => void;
    onCerrar: () => void;
}

const POSTER = '/hero/reel-poster.webp';

type Modo = 'oculta' | 'tarjeta' | 'burbuja';

function Reproductor({ onCerrar }: { onCerrar: () => void }) {
    const dialogoRef = useRef<HTMLDialogElement>(null);

    // <dialog> nativo: trae la trampa de foco, deja inerte el resto de la página y al
    // cerrarse devuelve el foco a quien lo abrió. Va en layout effect para que el close()
    // de la limpieza corra con el nodo todavía en el documento.
    useLayoutEffect(() => {
        const dialogo = dialogoRef.current;
        if (!dialogo) return;
        // El scroll de la página vive en <html> (index.css le pone overflow-x), no en <body>.
        if (typeof dialogo.showModal !== 'function') {
            // Navegadores sin <dialog> (Safari anterior a 15.4): el video se abre aparte.
            window.open('/videos/reel-neura.mp4', '_blank');
            onCerrar();
            return;
        }
        const raiz = document.documentElement;
        const overflowPrevio = raiz.style.overflow;
        raiz.style.overflow = 'hidden';
        dialogo.showModal();
        return () => {
            raiz.style.overflow = overflowPrevio;
            dialogo.close();
        };
    }, [onCerrar]);

    return (
        <dialog
            ref={dialogoRef}
            aria-label="Video: Neura Orkesta en un minuto"
            onCancel={(e) => { e.preventDefault(); onCerrar(); }}
            onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}
            className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 backdrop:bg-night/90 backdrop:backdrop-blur-md"
        >
            <div
                className="flex h-full items-center justify-center"
                onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}
            >
                <video
                    src="/videos/reel-neura.mp4"
                    poster={POSTER}
                    controls
                    autoPlay
                    playsInline
                    tabIndex={0}
                    className="aspect-[9/16] w-[min(92vw,calc(78svh*9/16))] rounded-2xl sm:w-[min(92vw,calc(86svh*9/16))] bg-night shadow-[0_30px_120px_rgba(59,123,255,0.35)] ring-1 ring-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue-light"
                />
                <button
                    type="button"
                    onClick={onCerrar}
                    aria-label="Cerrar el video"
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-light md:right-8 md:top-8"
                >
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </dialog>
    );
}

export default function VideoWidget({ abierto, onAbrir, onCerrar }: VideoWidgetProps) {
    const vistaPreviaRef = useRef<HTMLVideoElement>(null);
    const [oculto, setOculto] = useState(false);
    const [modo, setModo] = useState<Modo>('oculta');

    // Arriba de todo, en pantalla grande, es una tarjeta: forma parte del hero. Al bajar se
    // achica a una burbuja para no tapar el contenido de las secciones. En el celular el hero
    // ya trae su botón «Ver el video», así que arriba no aparece.
    useEffect(() => {
        const medir = () => {
            const alto = window.innerHeight;
            const grande = window.innerWidth >= 768 && alto >= 600;
            const pasoElHero = window.scrollY > alto * 0.45;
            // Sobre el formulario y al final de la página se corre: quedaba encima del botón
            // de enviar y de los datos del pie.
            const formulario = document.getElementById('neuralite')?.getBoundingClientRect();
            const sobreFormulario = !!formulario && formulario.top < alto * 0.6 && formulario.bottom > alto * 0.4;
            const finDePagina = window.scrollY + alto > document.documentElement.scrollHeight - 160;

            if (sobreFormulario || (finDePagina && pasoElHero)) setModo('oculta');
            else if (pasoElHero) setModo('burbuja');
            else setModo(grande ? 'tarjeta' : 'oculta');
        };
        medir();
        window.addEventListener('scroll', medir, { passive: true });
        window.addEventListener('resize', medir);
        return () => {
            window.removeEventListener('scroll', medir);
            window.removeEventListener('resize', medir);
        };
    }, []);

    const visible = modo !== 'oculta';
    const tarjeta = modo === 'tarjeta';

    // La vista previa se pide recién cuando la tarjeta se ve y el hero ya pintó: no compite
    // con él ni se baja para nadie.
    useEffect(() => {
        const el = vistaPreviaRef.current;
        if (!el || !visible) return;
        if (abierto) {
            el.pause();
            return;
        }
        if (el.src) {
            el.play().catch(() => {});
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const conexion = (navigator as { connection?: { saveData?: boolean } }).connection;
        if (conexion?.saveData) return;

        const id = window.setTimeout(() => {
            el.src = '/videos/reel-neura-preview.mp4';
            el.play().catch(() => {});
        }, 1200);
        return () => window.clearTimeout(id);
    }, [visible, abierto]);

    return (
        <>
            {!oculto && (
                <div
                    className={`video-widget-entra fixed bottom-5 right-5 z-40 transition-[opacity,visibility] duration-300 md:bottom-6 md:right-6 ${
                        visible ? '' : 'invisible opacity-0'
                    }`}
                >
                    <button
                        type="button"
                        onClick={onAbrir}
                        aria-label="Video · 1 min. Neura te lo cuenta"
                        className={`group relative block overflow-hidden bg-night shadow-[0_10px_40px_rgba(8,15,32,0.45)] transition-[width,height,border-radius,transform] duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue ${
                            tarjeta
                                ? 'h-[15.5rem] w-[8.75rem] rounded-2xl ring-1 ring-white/25'
                                : 'h-[4.5rem] w-[4.5rem] rounded-full ring-2 ring-brand-blue'
                        }`}
                    >
                        <img
                            src={POSTER}
                            alt=""
                            width="540"
                            height="960"
                            loading="lazy"
                            className={`absolute inset-0 h-full w-full object-cover ${tarjeta ? 'object-center' : 'object-[50%_33%]'}`}
                        />
                        <video
                            ref={vistaPreviaRef}
                            className={`absolute inset-0 h-full w-full object-cover ${tarjeta ? 'object-center' : 'object-[50%_33%]'}`}
                            muted
                            loop
                            playsInline
                            preload="none"
                            aria-hidden="true"
                        />
                        <span
                            className={`absolute inset-0 bg-gradient-to-t from-night to-transparent ${
                                tarjeta ? 'via-transparent' : 'via-night/10'
                            }`}
                        />
                        <span
                            className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-night shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                                tarjeta ? 'h-11 w-11' : 'h-8 w-8'
                            }`}
                        >
                            <Play
                                className={`translate-x-px fill-current ${tarjeta ? 'h-4 w-4' : 'h-3.5 w-3.5'}`}
                                aria-hidden="true"
                            />
                        </span>
                        {tarjeta && (
                            <span className="absolute inset-x-0 bottom-0 px-3 pb-3 text-left">
                                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-blue-light">
                                    Video · 1 min
                                </span>
                                <span className="mt-0.5 block font-display text-sm font-semibold leading-tight text-white">
                                    Neura te lo cuenta
                                </span>
                            </span>
                        )}
                    </button>
                    {tarjeta && (
                        <button
                            type="button"
                            onClick={() => setOculto(true)}
                            aria-label="Ocultar el video"
                            className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-night text-white/80 shadow-md transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                        >
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                    )}
                </div>
            )}
            {abierto && <Reproductor onCerrar={onCerrar} />}
        </>
    );
}
