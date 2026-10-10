import type { CSSProperties } from 'react';
import { Maximize2 } from 'lucide-react';
import { ALTO_MAQUETA, ANCHO_MAQUETA, type ContenidoPieza } from './piezas';

interface VitrinaProps {
    pieza: ContenidoPieza;
    onAmpliar: () => void;
    className?: string;
    style?: CSSProperties;
}

// La ventana es 16:10 y la capa de la maqueta 4:3; los porcentajes de translate se miden
// contra la capa, así que el ancla vertical se pasa de «altos de ventana» a «altos de capa».
const VENTANA_A_CAPA = 10 / 16 / (3 / 4);

/**
 * La ventana a la maqueta de la empresa, con su encuadre, y encima —en la esquina— la pantalla
 * real del sistema. El encuadre se arma en CSS con variables: la escena sólo mueve --e (0 a 1)
 * para que la cámara se acerque un poco con el scroll.
 */
export default function Vitrina({ pieza, onAmpliar, className = '', style }: VitrinaProps) {
    const { encuadre, pantalla } = pieza;
    const variables = {
        '--z0': encuadre.zoom,
        '--cx': encuadre.cx / ANCHO_MAQUETA,
        '--cy': encuadre.cy / ALTO_MAQUETA,
        '--ax': encuadre.ax,
        '--ay': encuadre.ay * VENTANA_A_CAPA,
    } as CSSProperties;

    return (
        <figure data-vitrina className={`relative ${className}`} style={{ ...variables, ...style }}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-line bg-mist lg:w-[84%]">
                <div className="sol-capa">
                    <img
                        src="/solucion/maqueta.webp"
                        alt={pieza.maquetaAlt}
                        width="3200"
                        height="2400"
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full"
                    />
                    {pieza.rotulos.map((rotulo) => (
                        <span
                            key={rotulo.texto}
                            aria-hidden="true"
                            className={`sol-rotulo flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white/95 px-2 py-1 text-[0.6875rem] font-medium leading-none text-ink shadow-[0_2px_6px_rgba(8,15,32,0.08)] ${rotulo.soloCelular ? 'lg:hidden' : ''}`}
                            style={{
                                left: `${(rotulo.x / ANCHO_MAQUETA) * 100}%`,
                                top: `${(rotulo.y / ALTO_MAQUETA) * 100}%`,
                            }}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-insight" />
                            {rotulo.texto}
                        </span>
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={onAmpliar}
                aria-label={`Ver en grande. ${pantalla.alt}`}
                className="group relative z-10 -mt-[20%] ml-auto block w-[80%] cursor-zoom-in overflow-hidden rounded-[14px] border border-line bg-white text-left shadow-[0_18px_40px_-18px_rgba(8,15,32,0.28),0_2px_6px_rgba(8,15,32,0.06)] transition-shadow duration-200 hover:shadow-[0_22px_48px_-16px_rgba(8,15,32,0.36),0_2px_6px_rgba(8,15,32,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue lg:-mt-[34%] lg:w-[78%]"
            >
                <span className="flex h-6 items-center gap-1.5 border-b border-line px-3" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-line" />
                    <span className="h-1.5 w-1.5 rounded-full bg-line" />
                    <span className="h-1.5 w-1.5 rounded-full bg-line" />
                    <Maximize2 className="ml-auto h-3 w-3 text-ink-soft transition-colors group-hover:text-brand-blue" />
                </span>
                <img
                    src={pantalla.src}
                    alt=""
                    width={pantalla.ancho}
                    height={pantalla.alto}
                    loading="lazy"
                    decoding="async"
                    className="block w-full object-cover object-left-top"
                    style={{ aspectRatio: `${pantalla.ancho} / ${pantalla.alto}` }}
                />
            </button>
            <figcaption className="mt-2.5 text-right text-xs text-ink-soft">Pantalla real · empresa de demostración</figcaption>
        </figure>
    );
}
