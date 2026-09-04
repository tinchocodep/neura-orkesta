import LoopVideo from './LoopVideo';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, LayoutDashboard, MessageCircle } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Los 3 motores: Sync (digitaliza y conecta) → Core (donde operás) → Insight (para decidir).
   REGLA DE POSICIONAMIENTO: Neura NO es un ERP y no se centra en el ERP.
   Se integra a TODAS las herramientas que la empresa ya usa: Excel, Drive,
   un ERP, un sistema contable, el banco. El sistema propio incluido se nombra
   siempre segundo y en tono menor.
   ───────────────────────────────────────────────────────────── */

type Layer = {
    id: string;
    number: string;
    eyebrow: string;
    name: string;
    headline: string;
    description: string;
    bullets: string[];
    image?: string;
    video?: string;
    caption: string;
    /* 'brand' = acento azul · 'neutral' = sobrio (capa Integraciones) */
    tone: 'brand' | 'neutral';
};

const layers: Layer[] = [
    {
        id: 'sync',
        number: '01',
        eyebrow: 'Motor 01 · Sync',
        name: 'NeuraSync',
        headline: 'Digitaliza lo que entra y lo conecta con todo lo que ya usás.',
        description: 'Mandá lo que sea: WhatsApp, PDF, Excel sin formato, fotos, mails. Neura lo interpreta con IA, lo estructura y se lo entrega ya formateado a cada herramienta — tu Excel, tu Drive, tu ERP, tu sistema contable, tu banco.',
        bullets: [
            'Lee y entiende cualquier formato',
            'Vos cargás como te sale; el formato lo pone Neura',
            'Excel, Google Drive y planillas compartidas',
            'Tu ERP o tu sistema contable, el que sea',
            'Bancos, ARCA y facturación electrónica',
        ],
        image: '/neura_sync.webp',
        video: '/videos/neura_sync.mp4',
        caption: 'Sync',
        tone: 'brand',
    },
    {
        id: 'core',
        number: '02',
        eyebrow: 'Motor 02 · Core',
        name: 'NeuraCore',
        headline: 'La pantalla donde operás tu empresa.',
        description: 'Acá gestionás el día a día: clientes, cobranzas, compras, entregas y tareas, todo en un solo lugar. Cada acción genera sus registros derivados sola, sin volver a tipear nada.',
        bullets: [
            'CRM: clientes y oportunidades',
            'Tesorería y cobranzas',
            'Compras y proveedores',
            'Logística y entregas',
            'Tareas y flujos de aprobación',
        ],
        image: '/neura_core.webp',
        video: '/videos/neura_core.mp4',
        caption: 'Core',
        tone: 'brand',
    },
    {
        id: 'insight',
        number: '03',
        eyebrow: 'Motor 03 · Insight',
        name: 'NeuraInsight',
        headline: 'Preguntale a tu empresa, en castellano.',
        description: 'Todo lo que Neura digitalizó y conectó vuelve como respuesta. Preguntás en castellano y te contesta con los datos de tu operación, actualizados.',
        bullets: [
            'Dashboards por área',
            'Consultas en lenguaje natural',
            'Alertas proactivas',
            'Exportar a Excel/PDF',
            'Información en tiempo real',
        ],
        image: '/neura_insight.webp',
        video: '/videos/neura_insight.mp4',
        caption: 'Insight',
        tone: 'brand',
    },
];

const WA_INTEGRACIONES = 'https://wa.me/5492622567533?text=Hola%21%20Quiero%20saber%20c%C3%B3mo%20Neura%20se%20integra%20a%20mi%20sistema';
const WA_TABLERO = 'https://wa.me/5492622567533?text=Hola%21%20Quiero%20ver%20el%20Tablero%20Base%20de%20mi%20%C3%A1rea';

/* Grilla sutil de fondo para los paneles ilustrativos */
const panelGrid = {
    backgroundImage:
        'linear-gradient(to right, rgba(65,105,225,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(65,105,225,0.07) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
};

export default function LayersSection() {
    return (
        <section id="capas" className="section-padding anchor-offset bg-white">
            <div className="max-w-6xl mx-auto">
                {/* ── Encuadre ───────────────────────────────── */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-6"
                >
                    Cómo funciona
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight mb-6"
                >
                    Tres motores. <span className="gradient-text">Un solo flujo.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed"
                >
                    Neura no elimina la carga de datos. Elimina el trabajo de darle formato.
                </motion.p>

                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold uppercase tracking-widest text-text-muted"
                >
                    {['Digitalizá', 'Conectá', 'Automatizá', 'Orquestá'].map((verb, i) => (
                        <li key={verb} className="flex items-center gap-3">
                            {i > 0 && <span className="h-px w-5 bg-gray-200" aria-hidden="true" />}
                            <span>{verb}</span>
                        </li>
                    ))}
                </motion.ul>

                {/* ── Las 4 capas ────────────────────────────── */}
                {/* fase 2: este bloque es el candidato a escena anclada única
                    (scrollYProgress mapeado a 4 tramos). La estructura del DOM
                    ya está lista: un contenedor por capa, en orden. */}
                <div className="mt-16 md:mt-24">
                    {layers.map((layer, index) => {
                        const isNeutral = layer.tone === 'neutral';
                        const isReversed = index % 2 !== 0;

                        return (
                            <Fragment key={layer.id}>
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5 }}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
                                >
                                    {/* Texto */}
                                    <div className={isReversed ? 'lg:order-2' : ''}>
                                        <div className="flex items-center gap-4 mb-5">
                                            <span
                                                className={`font-mono text-sm font-bold ${isNeutral ? 'text-text-muted' : 'text-brand-blue'}`}
                                            >
                                                {layer.number}
                                            </span>
                                            <span className="h-px w-8 bg-gray-200" aria-hidden="true" />
                                            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                                                {layer.eyebrow}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-2">
                                            {layer.name}
                                        </h3>

                                        <p
                                            className={`text-xl md:text-2xl font-display font-semibold leading-snug mb-4 ${isNeutral ? 'text-text-primary' : 'text-brand-blue'}`}
                                        >
                                            {layer.headline}
                                        </p>

                                        <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-7 max-w-xl">
                                            {layer.description}
                                        </p>

                                        <ul className="space-y-3">
                                            {layer.bullets.map(bullet => (
                                                <li key={bullet} className="flex items-start gap-3">
                                                    <Check
                                                        className={`w-4 h-4 mt-1 flex-shrink-0 ${isNeutral ? 'text-text-muted' : 'text-brand-blue'}`}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="text-text-secondary text-sm md:text-base">
                                                        {bullet}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {layer.id === 'erp' && (
                                            <a
                                                href={WA_INTEGRACIONES}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
                                            >
                                                Contanos qué sistema usás
                                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                            </a>
                                        )}
                                    </div>

                                    {/* Panel ilustrativo */}
                                    {/* TODO: reemplazar por la captura real del producto de esta capa.
                                        El contenedor ya tiene el aspect-ratio final; solo hay que
                                        cambiar el contenido interno por un <img>. */}
                                    <div className={isReversed ? 'lg:order-1' : ''}>
                                        <div
                                            className={`relative w-full aspect-square rounded-2xl border overflow-hidden ${isNeutral ? 'border-gray-200 bg-light-secondary' : 'border-gray-100 bg-light-secondary'}`}
                                        >
                                            <div
                                                className="absolute inset-0"
                                                style={panelGrid}
                                                aria-hidden="true"
                                            />

                                            {layer.image && layer.video ? (
                                                <LoopVideo
                                                    src={layer.video}
                                                    poster={layer.image}
                                                    alt={`Animación de ${layer.name}`}
                                                    className="relative h-full w-full p-4 sm:p-6"
                                                />
                                            ) : (
                                                /* Diagrama de integración (hoy sin uso: todas las
                                                   capas tienen imagen). Se conserva por si alguna
                                                   vuelve a necesitarlo. */
                                                /* Capa Integraciones: diagrama sobrio.
                                                   El sujeto siempre es Neura conectándose al
                                                   sistema que la empresa ya tiene. */
                                                <div className="relative h-full w-full flex items-center justify-center p-6">
                                                    <div className="flex w-full max-w-sm items-center gap-3">
                                                        <div className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-4 text-center shadow-soft">
                                                            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-blue">
                                                                Neura
                                                            </p>
                                                            <p className="mt-1 text-xs text-text-muted leading-snug">
                                                                datos ya formateados
                                                            </p>
                                                        </div>
                                                        <ArrowRight
                                                            className="w-4 h-4 flex-shrink-0 text-text-muted"
                                                            aria-hidden="true"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {['Excel', 'Drive', 'Tu ERP', 'Tu banco'].map((tool) => (
                                                                    <div
                                                                        key={tool}
                                                                        className="rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-center shadow-soft"
                                                                    >
                                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                                                                            {tool}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="mt-2 text-center text-xs text-text-muted leading-snug">
                                                                las que ya usás
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Sync es el que conecta: el abanico de destinos
                                                vive acá, no en una capa aparte. */}
                                            {layer.id === 'sync' && (
                                                <div className="absolute inset-x-4 bottom-10 sm:bottom-12">
                                                    <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-text-muted">
                                                        Y sale hacia
                                                    </p>
                                                    <div className="flex flex-wrap justify-center gap-1.5">
                                                        {['Excel', 'Drive', 'Tu ERP', 'Tu banco', 'ARCA'].map((tool) => (
                                                            <span
                                                                key={tool}
                                                                className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-text-secondary shadow-soft"
                                                            >
                                                                {tool}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <span className="absolute left-4 bottom-4 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                                                {layer.caption}
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>

                                {/* Conector de flujo entre capas */}
                                {index < layers.length - 1 && (
                                    <div className="flex justify-center py-10 md:py-14" aria-hidden="true">
                                        {/* fase 2: este eje es el camino que va a recorrer el PULSO */}
                                        <span className="h-16 md:h-20 w-px bg-gradient-to-b from-brand-blue/40 via-brand-blue/15 to-transparent" />
                                    </div>
                                )}
                            </Fragment>
                        );
                    })}
                </div>

                {/* ── Cierre: Tablero Base ───────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className="mt-20 md:mt-28 rounded-3xl bg-light-secondary border border-gray-100 p-8 md:p-12"
                >
                    <div className="flex items-center gap-3 mb-5">
                        <LayoutDashboard className="w-5 h-5 text-brand-blue" aria-hidden="true" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-brand-blue">
                            Tablero Base
                        </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-display font-bold text-text-primary leading-tight mb-5 max-w-3xl">
                        No arrancás de cero: arrancás con la estructura del área funcionando.
                    </h3>

                    <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
                        Cada módulo que activás viene con su Tablero Base ya configurado. KPIs, tablas, alertas y flujos
                        listos desde el primer día.
                    </p>

                    <a
                        href={WA_TABLERO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand-blue text-white font-semibold text-base hover:bg-brand-blue-dark transition-colors shadow-brand"
                    >
                        <MessageCircle className="w-5 h-5" aria-hidden="true" />
                        Escribinos por WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
