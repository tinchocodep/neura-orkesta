import { useLayoutEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface PantallaAmpliadaProps {
    pantalla: { src: string; ancho: number; alto: number; alt: string };
    onCerrar: () => void;
}

/** La pantalla real en grande. Mismo <dialog> nativo que el del video (ver VideoWidget). */
export default function PantallaAmpliada({ pantalla, onCerrar }: PantallaAmpliadaProps) {
    const dialogoRef = useRef<HTMLDialogElement>(null);

    // En layout effect para que el close() de la limpieza corra con el nodo todavía en el documento.
    useLayoutEffect(() => {
        const dialogo = dialogoRef.current;
        if (!dialogo) return;
        if (typeof dialogo.showModal !== 'function') {
            // Navegadores sin <dialog>: la imagen se abre aparte.
            window.open(pantalla.src, '_blank', 'noopener');
            onCerrar();
            return;
        }
        // El scroll de la página vive en <html>, no en <body>.
        const raiz = document.documentElement;
        const overflowPrevio = raiz.style.overflow;
        raiz.style.overflow = 'hidden';
        dialogo.showModal();
        return () => {
            raiz.style.overflow = overflowPrevio;
            dialogo.close();
        };
    }, [onCerrar, pantalla.src]);

    return (
        <dialog
            ref={dialogoRef}
            aria-label="Pantalla real · empresa de demostración"
            onCancel={(e) => { e.preventDefault(); onCerrar(); }}
            // Tocar el margen oscuro cierra: el margen es del <dialog>, no del contenedor de adentro.
            onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}
            className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 backdrop:bg-night/90 backdrop:backdrop-blur-md md:p-14"
        >
            <div
                // En el celular el carril llega hasta los bordes del teléfono: así se nota que la pantalla sigue de costado.
                className="-mx-4 flex h-full items-center justify-start overflow-auto px-4 md:mx-0 md:justify-center md:px-0"
                onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}
            >
                <img
                    src={pantalla.src}
                    alt={pantalla.alt}
                    width={pantalla.ancho}
                    height={pantalla.alto}
                    // En el celular la pantalla no se achica al ancho del teléfono: queda legible y se recorre de costado.
                    className="h-auto max-h-none w-[900px] max-w-none shrink-0 rounded-[14px] md:max-h-full md:w-auto md:max-w-full md:shrink bg-white shadow-[0_30px_120px_rgba(59,123,255,0.25)] ring-1 ring-white/15"
                />
            </div>
            <p className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-sm text-white/75 md:hidden" aria-hidden="true">
                Deslizá hacia los costados para verla entera
            </p>
            {/* Fondo oscuro propio y fuera del área de la imagen: la pantalla es casi blanca y una X translúcida no se veía. */}
            <button
                type="button"
                onClick={onCerrar}
                aria-label="Cerrar la pantalla"
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-night/85 text-white transition-colors hover:bg-night focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-light md:right-1.5 md:top-1.5"
            >
                <X className="h-5 w-5" aria-hidden="true" />
            </button>
        </dialog>
    );
}
