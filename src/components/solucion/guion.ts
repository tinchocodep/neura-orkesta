// El guion de la escena: qué hace cada cosa según el avance p (0 a 1) del scroll.
// Es lo único que hay que tocar para afinar tiempos, posiciones y giros.
import type { NombrePieza } from './cabeza';

export const limitar = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const suave = (t: number) => t * t * (3 - 2 * t);
export const mezcla = (a: number, b: number, t: number) => a + (b - a) * t;

type Clave<T> = readonly [number, T];

/** Pista de un número: [[p, valor], …] → f(p), con entrada y salida suaves entre claves. */
export function pistaNumero(claves: readonly Clave<number>[]) {
    return (p: number): number => {
        if (p <= claves[0][0]) return claves[0][1];
        for (let i = 1; i < claves.length; i++) {
            const [p0, v0] = claves[i - 1];
            const [p1, v1] = claves[i];
            if (p <= p1) return mezcla(v0, v1, suave((p - p0) / (p1 - p0)));
        }
        return claves[claves.length - 1][1];
    };
}

/**
 * Una pose: fx/fy son fracciones de media pantalla (0 = centro, 1 = borde; fy positivo = arriba),
 * z la profundidad, rx/ry/rz el giro en grados y s la escala.
 */
export interface Pose {
    fx: number;
    fy: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
    s: number;
}

export interface PoseCabeza extends Pose {
    /** Cuánto se abre el despiece: 0 = armada, 1 = separada. */
    sep: number;
}

const CAMPOS = ['fx', 'fy', 'z', 'rx', 'ry', 'rz', 's'] as const;

export function pistaPose(claves: readonly Clave<Pose>[]) {
    const pistas = CAMPOS.map((c) => pistaNumero(claves.map(([p, v]) => [p, v[c]] as const)));
    return (p: number): Pose => ({
        fx: pistas[0](p),
        fy: pistas[1](p),
        z: pistas[2](p),
        rx: pistas[3](p),
        ry: pistas[4](p),
        rz: pistas[5](p),
        s: pistas[6](p),
    });
}

// En cada tramo la cabeza entera se corre al lado contrario al del texto y lo mira; apenas abierta
// (sep 0.1) para que se lean las tres partes sin que deje de ser el logo.
const clavesCabeza: readonly Clave<PoseCabeza>[] = [
    [0.0, { fx: 0, fy: -0.23, z: 0, rx: 4, ry: -26, rz: 0, s: 0.84, sep: 0 }],
    [0.12, { fx: 0, fy: -0.13, z: 0, rx: 4, ry: 8, rz: 0, s: 0.88, sep: 0 }],
    [0.24, { fx: 0, fy: -0.05, z: -0.8, rx: 9, ry: -36, rz: 0, s: 0.92, sep: 1 }],
    [0.32, { fx: -0.54, fy: 0.02, z: 0, rx: 6, ry: 30, rz: 0, s: 1.04, sep: 0.1 }],
    [0.41, { fx: -0.54, fy: 0.02, z: 0, rx: 6, ry: 10, rz: 0, s: 1.04, sep: 0.1 }],
    [0.5, { fx: 0.5, fy: 0.02, z: 0, rx: 6, ry: -30, rz: 0, s: 1.04, sep: 0.1 }],
    [0.61, { fx: 0.5, fy: 0.02, z: 0, rx: 6, ry: -10, rz: 0, s: 1.04, sep: 0.1 }],
    [0.7, { fx: -0.54, fy: 0.02, z: 0, rx: 6, ry: 30, rz: 0, s: 1.04, sep: 0.1 }],
    [0.81, { fx: -0.54, fy: 0.02, z: 0, rx: 6, ry: 10, rz: 0, s: 1.04, sep: 0.1 }],
    [0.91, { fx: 0, fy: 0.17, z: 0, rx: 4, ry: -24, rz: 0, s: 0.78, sep: 0 }],
    [1.0, { fx: 0, fy: 0.17, z: 0, rx: 4, ry: -10, rz: 0, s: 0.78, sep: 0 }],
];

const poseCabeza = pistaPose(clavesCabeza);
const sepCabeza = pistaNumero(clavesCabeza.map(([p, v]) => [p, v.sep] as const));

export const CABEZA = (p: number): PoseCabeza => ({ ...poseCabeza(p), sep: sepCabeza(p) });

/** Del azul único de la cabeza al color propio de cada pieza (y así se queda). Corto a propósito: a mitad de camino el azul y el cobre dan un rosa que no es de la marca. */
export const TINTE = pistaNumero([
    [0.135, 0],
    [0.195, 1],
]);

/** Mientras se recorren los tres módulos, las piezas que no están en turno se apagan a gris. */
export const APAGAR = pistaNumero([
    [0.26, 0],
    [0.32, 1],
    [0.81, 1],
    [0.88, 0],
]);

interface GuionPieza {
    /** Hacia dónde se corre la pieza en el despiece, en unidades de la cabeza. */
    abre: readonly [number, number, number];
    /** Cuánto resalta: 0 = una parte más del logo, 1 = es su turno (su color, adelantada y un poco más grande). */
    realce: (p: number) => number;
}

export const PIEZAS: Record<NombrePieza, GuionPieza> = {
    perfil: {
        abre: [-0.3, -0.22, 0.9],
        realce: pistaNumero([
            [0.26, 0],
            [0.32, 1],
            [0.41, 1],
            [0.47, 0],
        ]),
    },
    onda: {
        abre: [0.04, 0.02, 0],
        realce: pistaNumero([
            [0.44, 0],
            [0.5, 1],
            [0.61, 1],
            [0.67, 0],
        ]),
    },
    cupula: {
        abre: [0.26, 0.26, -0.9],
        realce: pistaNumero([
            [0.64, 0],
            [0.7, 1],
            [0.81, 1],
            [0.88, 0],
        ]),
    },
};

/** Corrida al costado, la cabeza nunca ocupa más que esta fracción de media pantalla: el resto es del texto. */
export const ANCHO_AL_COSTADO = 0.78;

export type IdBloque = 'intro' | 'rotulos' | 'sync' | 'core' | 'insight' | 'remate';

/** Cada bloque de texto: [entra desde, entra hasta, sale desde, sale hasta]. −1 = ya está; 2 = no sale. */
export const BLOQUES: Record<IdBloque, readonly [number, number, number, number]> = {
    // El título se va antes de que la cabeza suba: en ventanas bajas (650 de alto) lo alcanza en 0.06.
    intro: [-1, -1, 0.02, 0.06],
    rotulos: [0.17, 0.21, 0.25, 0.285],
    sync: [0.3, 0.35, 0.41, 0.45],
    core: [0.5, 0.55, 0.61, 0.65],
    insight: [0.7, 0.75, 0.81, 0.85],
    remate: [0.91, 0.96, 2, 2],
};

/** Rótulos del despiece: corrimiento respecto del centro de la pieza (en anchos y altos de pieza) y hacia dónde alinea. */
export const ROTULOS: Record<NombrePieza, readonly [number, number, 'der' | 'izq']> = {
    perfil: [-0.47, 0.12, 'der'],
    onda: [0.3, -0.74, 'izq'],
    cupula: [0.5, 0.06, 'izq'],
};

export type IdTramo = 'sync' | 'core' | 'insight';

/** Los tres tramos de las pastillas: desde, hasta y el punto al que lleva el scroll al tocarlas. */
export const TRAMOS: Record<IdTramo, { desde: number; hasta: number; destino: number }> = {
    sync: { desde: 0.26, hasta: 0.46, destino: 0.38 },
    core: { desde: 0.46, hasta: 0.66, destino: 0.58 },
    insight: { desde: 0.66, hasta: 0.86, destino: 0.78 },
};

/** Las pastillas se ven sólo mientras se recorren las tres piezas. */
export const PASTILLAS: readonly [number, number] = [0.27, 0.86];
