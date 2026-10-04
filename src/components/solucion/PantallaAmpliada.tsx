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
            className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 backdrop:bg-night/90 backdrop:backdrop-blur-md md:p-10"
        >
            <div
                className="flex h-full items-center justify-start overflow-auto md:justify-center"
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
                <button
                    type="button"
                    onClick={onCerrar}
                    aria-label="Cerrar la pantalla"
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-light md:right-8 md:top-8"
                >
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </dialog>
    );
}
