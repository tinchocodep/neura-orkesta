// El motor 3D de «La solución»: un estudio blanco con la cabeza del logo extruida en tres piezas.
// Se carga con import dinámico (trae three.js entero) y no sabe nada de React ni del scroll:
// recibe el avance p y dibuja.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { toCreasedNormals } from 'three/addons/utils/BufferGeometryUtils.js';
import { ALTO_LOGO, ANCHO_LOGO, BISEL, CENTROS, NOMBRES, TAPAS, leerPuntos, type NombrePieza } from './cabeza';
import { ANCHO_SOLISTA, CABEZA, PIEZAS, TINTE, limitar, mezcla, suave } from './guion';

export interface Motor {
    /** Vuelve a medir el contenedor (al cambiar el tamaño de la ventana). */
    medir: () => void;
    dibujar: (p: number) => void;
    /** Dónde va el rótulo de una pieza, en píxeles del contenedor, según el último dibujo. */
    rotulo: (nombre: NombrePieza, corrX: number, corrY: number) => { x: number; y: number };
    liberar: () => void;
}

// Un punto más hondos que los colores de marca: la luz del estudio los aclara.
const TINTAS: Record<NombrePieza | 'base', string> = {
    base: '#1F56E8',
    perfil: '#E4875A',
    onda: '#2462F5',
    cupula: '#EBA233',
};

const DISTANCIA = 11;
const CAMPO = 26;
const RAD = Math.PI / 180;
// La cabeza mide 3 unidades de alto.
const ESCALA = 3 / ALTO_LOGO;

interface Pieza {
    grupo: THREE.Group;
    geometria: THREE.BufferGeometry;
    material: THREE.MeshPhysicalMaterial;
    color: THREE.Color;
    ancho: number;
    alto: number;
    reposo: THREE.Vector3;
    abre: THREE.Vector3;
}

export function crearMotor(contenedor: HTMLElement, alPerderContexto: () => void): Motor {
    const lienzo = document.createElement('canvas');
    lienzo.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    lienzo.setAttribute('aria-hidden', 'true');

    const render = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true });
    render.setClearColor(0xffffff, 1);
    // Sin mapeo de tonos: el blanco de la niebla tiene que ser exactamente el blanco de la página.
    render.toneMapping = THREE.NoToneMapping;
    render.shadowMap.enabled = true;
    render.shadowMap.type = THREE.VSMShadowMap;

    const mundo = new THREE.Scene();
    mundo.fog = new THREE.Fog(0xffffff, 12.6, 27);
    const pmrem = new THREE.PMREMGenerator(render);
    const sala = new RoomEnvironment();
    const entorno = pmrem.fromScene(sala, 0.04);
    mundo.environment = entorno.texture;
    sala.dispose();
    pmrem.dispose();

    const tangente = Math.tan((CAMPO / 2) * RAD);
    const camara = new THREE.PerspectiveCamera(CAMPO, 1, 0.5, 80);
    camara.position.set(0, 0, DISTANCIA);
    camara.updateMatrixWorld();

    // Casi cenital: la sombra cae debajo de la pieza y no sobre el texto.
    const sol = new THREE.DirectionalLight(0xffffff, 1.0);
    sol.position.set(-2, 14, -4);
    sol.target.position.set(0, -2, -8);
    sol.castShadow = true;
    sol.shadow.mapSize.set(1024, 1024);
    Object.assign(sol.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: 1, far: 40 });
    sol.shadow.radius = 9;
    sol.shadow.blurSamples = 16;
    sol.shadow.bias = -0.0005;
    const frente = new THREE.DirectionalLight(0xffffff, 0.5);
    frente.position.set(-5, 4, 9);
    mundo.add(sol, sol.target, frente);

    const geometriaPiso = new THREE.PlaneGeometry(120, 120);
    const materialPiso = new THREE.ShadowMaterial({ color: 0x0b1b45, opacity: 0.17 });
    const piso = new THREE.Mesh(geometriaPiso, materialPiso);
    piso.rotation.x = -Math.PI / 2;
    piso.receiveShadow = true;
    mundo.add(piso);

    // Cada contorno se suaviza con una curva (3 puntos por tramo: arcos lisos, sin facetas).
    const curva = (puntos: [number, number][]) =>
        new THREE.CatmullRomCurve3(
            puntos.map(([x, y]) => new THREE.Vector3(x, y, 0)),
            true,
            'centripetal',
        )
            .getPoints(puntos.length * 3)
            .slice(0, -1);

    const azulBase = new THREE.Color(TINTAS.base);
    const piezas = {} as Record<NombrePieza, Pieza>;
    for (const nombre of NOMBRES) {
        const [cx, cy] = CENTROS[nombre];
        const forma = new THREE.Shape(
            curva(leerPuntos(TAPAS[nombre])).map((p) => new THREE.Vector2((p.x - cx) * ESCALA, -(p.y - cy) * ESCALA)),
        );
        // La tapa ya viene achicada BISEL unidades (ver cabeza.ts): con bevelSize = BISEL el bisel
        // redondo crece hacia afuera y el cuerpo vuelve al contorno original del logo. Así parece
        // un tubo y la tapa no se rompe en las curvas cerradas.
        const extruida = new THREE.ExtrudeGeometry(forma, {
            depth: 0.1,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: BISEL * ESCALA,
            bevelOffset: 0,
            bevelSegments: 6,
            curveSegments: 1,
            steps: 1,
        });
        extruida.translate(0, 0, -0.05);
        extruida.deleteAttribute('uv');
        // Normales alisadas salvo en los cantos de más de 60°: sin esto el bisel se ve facetado.
        const geometria = toCreasedNormals(extruida, Math.PI / 3);
        extruida.dispose();
        geometria.computeBoundingBox();
        const caja = geometria.boundingBox ?? new THREE.Box3();

        const material = new THREE.MeshPhysicalMaterial({
            color: azulBase.clone(),
            roughness: 0.3,
            metalness: 0,
            clearcoat: 1,
            clearcoatRoughness: 0.08,
            envMapIntensity: 0.62,
        });
        const malla = new THREE.Mesh(geometria, material);
        malla.castShadow = true;
        const grupo = new THREE.Group();
        grupo.add(malla);
        mundo.add(grupo);

        piezas[nombre] = {
            grupo,
            geometria,
            material,
            color: new THREE.Color(TINTAS[nombre]),
            ancho: caja.max.x - caja.min.x,
            alto: caja.max.y - caja.min.y,
            reposo: new THREE.Vector3((cx - ANCHO_LOGO / 2) * ESCALA, -(cy - ALTO_LOGO / 2) * ESCALA, 0),
            abre: new THREE.Vector3(...PIEZAS[nombre].abre),
        };
    }

    let ancho = 1;
    let alto = 1;
    let aspecto = 1;
    let ajusteCabeza = 1;

    function medir() {
        ancho = Math.max(1, contenedor.clientWidth);
        alto = Math.max(1, contenedor.clientHeight);
        aspecto = ancho / alto;
        // Tope de unos 3 megapíxeles: en una pantalla grande a doble densidad el lienzo llegaba a
        // 8 MP por cuadro, con sombras y brillo encima.
        const tope = Math.sqrt(3_000_000 / (ancho * alto));
        render.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2, Math.max(1, tope)));
        render.setSize(ancho, alto, false);
        camara.aspect = aspecto;
        camara.updateProjectionMatrix();
        // Que la cabeza entre a lo ancho en una ventana alta y angosta.
        ajusteCabeza = Math.min(1, (2 * tangente * DISTANCIA * aspecto * 0.8) / 2.52);
    }

    const euler = new THREE.Euler();
    const giroCabeza = new THREE.Quaternion();
    const giroSolista = new THREE.Quaternion();
    const lugarCabeza = new THREE.Vector3();
    const lugarArmada = new THREE.Vector3();
    const lugarSolista = new THREE.Vector3();
    const proyectado = new THREE.Vector3();

    const lugar = (fx: number, fy: number, z: number, salida: THREE.Vector3) =>
        salida.set(fx * tangente * (DISTANCIA - z) * aspecto, fy * tangente * (DISTANCIA - z), z);
    const giro = (rx: number, ry: number, rz: number, salida: THREE.Quaternion) =>
        salida.setFromEuler(euler.set(rx * RAD, ry * RAD, rz * RAD, 'YXZ'));

    const inicio = CABEZA(0);
    const final = CABEZA(1);

    function dibujar(p: number) {
        const cabeza = CABEZA(p);
        lugar(cabeza.fx, cabeza.fy, cabeza.z, lugarCabeza);
        giro(cabeza.rx, cabeza.ry, cabeza.rz, giroCabeza);
        const escalaCabeza = cabeza.s * ajusteCabeza;
        const tinte = TINTE(p);

        // El piso acompaña a la cabeza armada: abajo al principio y más arriba en el remate, así
        // la sombra no se mete debajo del texto del cierre.
        const pisoInicio = inicio.fy * tangente * DISTANCIA - 1.5 * inicio.s * ajusteCabeza;
        const pisoFinal = final.fy * tangente * DISTANCIA - 1.5 * final.s * ajusteCabeza;
        piso.position.y = mezcla(pisoInicio, pisoFinal, suave(limitar((p - 0.84) / 0.08))) - 0.16;

        const mitad = tangente * DISTANCIA * aspecto * ANCHO_SOLISTA;
        for (const nombre of NOMBRES) {
            const pieza = piezas[nombre];
            const guion = PIEZAS[nombre];
            // Armada: su lugar en la cabeza, más lo que se abre en el despiece.
            lugarArmada
                .copy(pieza.abre)
                .multiplyScalar(cabeza.sep)
                .add(pieza.reposo)
                .multiplyScalar(escalaCabeza)
                .applyQuaternion(giroCabeza)
                .add(lugarCabeza);
            // Solista: viaja a su borde y gira.
            const pose = guion.pose(p);
            const solista = guion.solista(p);
            const escalaSolista = Math.min(pose.s, mitad / (pieza.ancho * 1.12));
            lugar(pose.fx, pose.fy, pose.z, lugarSolista);
            giro(pose.rx, pose.ry, pose.rz, giroSolista);

            pieza.grupo.position.lerpVectors(lugarArmada, lugarSolista, solista);
            pieza.grupo.quaternion.slerpQuaternions(giroCabeza, giroSolista, solista);
            pieza.grupo.scale.setScalar(mezcla(escalaCabeza, escalaSolista, solista));
            pieza.material.color.lerpColors(azulBase, pieza.color, tinte);
        }
        render.render(mundo, camara);
    }

    function rotulo(nombre: NombrePieza, corrX: number, corrY: number) {
        const pieza = piezas[nombre];
        proyectado.copy(pieza.grupo.position).project(camara);
        const pxPorUnidad = (alto / (2 * tangente * (DISTANCIA - pieza.grupo.position.z))) * pieza.grupo.scale.x;
        return {
            x: (proyectado.x * 0.5 + 0.5) * ancho + corrX * pieza.ancho * pxPorUnidad * 0.82,
            y: (-proyectado.y * 0.5 + 0.5) * alto - corrY * pieza.alto * pxPorUnidad,
        };
    }

    const alPerder = (evento: Event) => {
        evento.preventDefault();
        alPerderContexto();
    };
    lienzo.addEventListener('webglcontextlost', alPerder);

    contenedor.appendChild(lienzo);
    medir();

    function liberar() {
        // Se quita antes de forzar la pérdida: si no, la limpieza misma avisaría «se perdió el contexto».
        lienzo.removeEventListener('webglcontextlost', alPerder);
        for (const nombre of NOMBRES) {
            piezas[nombre].geometria.dispose();
            piezas[nombre].material.dispose();
        }
        geometriaPiso.dispose();
        materialPiso.dispose();
        sol.shadow.dispose();
        entorno.dispose();
        mundo.environment = null;
        mundo.clear();
        render.dispose();
        render.forceContextLoss();
        lienzo.remove();
    }

    return { medir, dibujar, rotulo, liberar };
}
