// El contenido de las tres piezas: un solo juego de textos para la escena 3D y para la versión quieta.
import type { NombrePieza } from './cabeza';
import type { IdTramo } from './guion';

/** La maqueta está dibujada sobre un lienzo lógico de 2400 × 1800. */
export const ANCHO_MAQUETA = 2400;
export const ALTO_MAQUETA = 1800;

export interface Encuadre {
    /** Punto de la maqueta al que mira la cámara, en el lienzo lógico. */
    cx: number;
    cy: number;
    /** 1 = la maqueta entera entra justo a lo ancho de la ventana. */
    zoom: number;
    /** En qué parte de la ventana cae ese punto (0 a 1): corrido del centro porque la pantalla real tapa la esquina de abajo a la derecha. */
    ax: number;
    ay: number;
}

export interface RotuloMaqueta {
    texto: string;
    x: number;
    y: number;
    soloCelular?: boolean;
}

export interface ContenidoPieza {
    id: IdTramo;
    forma: NombrePieza;
    nombre: string;
    titulo: string;
    texto: string;
    /** De qué lado va el texto en la escena; la pieza 3D viaja al borde contrario. */
    lado: 'izq' | 'der';
    /** Color de marca de la pieza (el punto de la ceja, la pastilla y el SVG). */
    color: string;
    encuadre: Encuadre;
    maquetaAlt: string;
    rotulos: readonly RotuloMaqueta[];
    pantalla: { src: string; ancho: number; alto: number; alt: string };
}

export const COLORES: Record<NombrePieza, string> = {
    perfil: '#ED9A70',
    onda: '#2B68E6',
    cupula: '#F0B34D',
};

export const PIEZAS_CONTENIDO: readonly ContenidoPieza[] = [
    {
        id: 'sync',
        forma: 'perfil',
        nombre: 'NeuraSync',
        titulo: 'Entra.',
        texto: 'Digitalizo lo que llega de ARCA o de tus sistemas.',
        lado: 'der',
        color: COLORES.perfil,
        encuadre: { cx: 800, cy: 900, zoom: 2.5, ax: 0.36, ay: 0.36 },
        maquetaAlt: 'Maqueta de una empresa: un camión entra por el portón hacia el muelle de carga.',
        rotulos: [],
        pantalla: {
            src: '/pantallas/comprobantes.webp',
            ancho: 1800,
            alto: 1003,
            alt: 'Pantalla de Neura: la bandeja de comprobantes, con fecha, proveedor, monto y estado de cada uno.',
        },
    },
    {
        id: 'core',
        forma: 'onda',
        nombre: 'NeuraCore',
        titulo: 'Opera.',
        texto: 'Llevo la operación y la gestión total de tu empresa.',
        lado: 'izq',
        color: COLORES.onda,
        encuadre: { cx: 1214, cy: 1000, zoom: 2.5, ax: 0.36, ay: 0.36 },
        maquetaAlt: 'La misma empresa por dentro: la oficina, con la gente operando.',
        rotulos: [],
        pantalla: {
            src: '/pantallas/obra.webp',
            ancho: 1800,
            alto: 1115,
            alt: 'Pantalla de Neura: la ficha de una obra, con la caja de la obra, el avance firmado y la curva de certificados.',
        },
    },
    {
        id: 'insight',
        forma: 'cupula',
        nombre: 'NeuraInsight',
        titulo: 'Entiende.',
        texto: 'Te muestro cómo está tu empresa, para que decidas mejor.',
        lado: 'der',
        color: COLORES.cupula,
        encuadre: { cx: 1200, cy: 820, zoom: 0.95, ax: 0.36, ay: 0.34 },
        maquetaAlt: 'La empresa entera vista desde arriba: el depósito, la obra, el viaje, la oficina y el local.',
        rotulos: [
            { texto: 'El depósito', x: 660, y: 520 },
            { texto: 'La obra', x: 1575, y: 450 },
            { texto: 'El viaje', x: 600, y: 1160 },
            // En pantalla grande cae justo debajo de la pantalla real: ahí no se muestra.
            { texto: 'La oficina', x: 1150, y: 880, soloCelular: true },
            { texto: 'El local', x: 1900, y: 760 },
        ],
        pantalla: {
            src: '/pantallas/obras.webp',
            ancho: 1800,
            alto: 1021,
            alt: 'Pantalla de Neura: las obras de la empresa, con la caja de cada una.',
        },
    },
];
