import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────── */

/** Franja transversal: lo que vale para los tres modelos por igual. */
const guarantees = [
    'Implementación en 24 horas',
    'Sin permanencia obligatoria',
    'Soporte continuo',
    'Escalamos con vos',
    'Equipo local, decisiones rápidas',
];

/** Los tres modelos de trabajo. Sin montos: la sección promete estructura, no precio. */
const models = [
    {
        number: '01',
        name: 'Producto ya desarrollado',
        description: 'Accedés a una solución que ya existe dentro de Neura Orkesta, lista para usar. Configuramos el sistema para tu empresa y en 24 horas estás operando.',
        structure: [
            'Fee de instalación único, al inicio',
            'Suscripción mensual por uso y soporte',
        ],
    },
    {
        number: '02',
        name: 'Customización sobre Neura Orkesta',
        description: 'Tomamos la plataforma base y la adaptamos a los procesos específicos de tu empresa. Cambios en flujos, formularios, integraciones o reportes a medida.',
        structure: [
            'Fee de instalación y configuración, al inicio',
            'Suscripción mensual por uso y soporte',
        ],
    },
    {
        number: '03',
        name: 'Desarrollo a medida',
        description: 'Para lo que va más allá de la plataforma estándar. Construimos la solución con tu lógica de negocio, integrada a tu Orkesta.',
        structure: [
            'Presupuesto por proyecto, por etapas',
            'Mantenimiento posterior: opcional y acordado',
        ],
    },
];

/** Los 4 pasos del desarrollo a medida. Siempre visibles: es contenido, no un easter egg. */
const customSteps = [
    {
        number: '1',
        title: 'Escuchamos el dolor real',
        description: 'Nos reunimos con el equipo que vive el problema, sin consultores intermediarios.',
    },
    {
        number: '2',
        title: 'Diseñamos la solución juntos',
        description: 'Prototipos antes de escribir código. Vos aprobás, nosotros construimos.',
    },
    {
        number: '3',
        title: 'Desarrollamos rápido',
        description: 'Iteraciones cortas, primera versión funcionando en semanas.',
    },
    {
        number: '4',
        title: 'Se integra a tu Orkesta',
        description: 'No queda como una isla: se conecta con Sync, Core y los datos que ya existen.',
    },
];

/** Cómo se empieza: eje distinto de los modelos. Los modelos dicen cómo se cobra; esto, por dónde arrancás. */
const levels = [
    {
        badge: 'Nivel 1',
        name: 'Motores individuales',
        lead: 'Sync · Core · Insight',
        description: 'Cada motor se activa por separado. Viene con su Tablero Base ya configurado: operativo desde el día uno, sin depender del resto.',
    },
    {
        badge: 'Nivel 2',
        name: 'Orkesta completo',
        lead: 'Plataforma + fichas',
        description: 'Con los tres motores integrados se habilita el sistema de fichas: módulos adicionales por área para profundizar según lo que necesite tu operación.',
    },
];

const WHATSAPP_MODELOS = 'https://wa.me/5492622567533?text=Hola%21%20Quiero%20saber%20cu%C3%A1l%20de%20los%20tres%20modelos%20de%20trabajo%20me%20conviene';
const WHATSAPP_NEURALITE = 'https://wa.me/5492622567533?text=Hola%21%20Quiero%20probar%20Neuralite%20gratis%20%F0%9F%9A%80';

/* ─── Section ──────────────────────────────────────────────────── */

export default function ModelsSection() {
    /* fase 2: esta sección se queda quieta a propósito (sístole/diástole).
       Si algo se mueve acá después, que sea el barrido de la franja de garantías
       y nada más — el resto es zona de lectura. */
    return (
        <section id="modelos" className="anchor-offset section-padding bg-light-secondary">
            <div className="max-w-6xl mx-auto">

                {/* ── Encabezado ────────────────────────────────── */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-4"
                >
                    Cómo trabajamos
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight max-w-3xl"
                >
                    Tres formas de trabajar juntos. <span className="gradient-text">Ninguna te ata.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl"
                >
                    Elegís cómo entrar y hasta dónde llegar. Sin contratos rígidos, sin permanencia obligatoria.
                </motion.p>

                {/* ── Franja transversal de garantías ───────────── */}
                <motion.ul
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-y border-gray-200 py-5"
                >
                    {guarantees.map(item => (
                        <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" aria-hidden="true" />
                            {item}
                        </li>
                    ))}
                </motion.ul>

                {/* ── Los tres modelos ──────────────────────────── */}
                <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {models.map((model, index) => (
                        <motion.article
                            key={model.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className="flex flex-col bg-white rounded-2xl border border-gray-200 p-7 md:p-8"
                        >
                            <p className="font-mono text-xs font-bold tracking-widest text-brand-blue uppercase">
                                Modelo {model.number}
                            </p>

                            <h3 className="mt-4 text-2xl font-display font-bold text-text-primary leading-snug">
                                {model.name}
                            </h3>

                            <p className="mt-4 text-base text-text-secondary leading-relaxed flex-1">
                                {model.description}
                            </p>

                            <div className="mt-7 pt-6 border-t border-gray-100">
                                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
                                    Estructura
                                </p>
                                <ul className="space-y-2.5">
                                    {model.structure.map(row => (
                                        <li key={row} className="flex items-start gap-2.5">
                                            <Check className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            <span className="text-sm text-text-secondary leading-relaxed">{row}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* ── Los 4 pasos del Modelo 03 ─────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-6 bg-white rounded-2xl border border-gray-200 p-7 md:p-10"
                >
                    <p className="font-mono text-xs font-bold tracking-widest text-brand-blue uppercase">
                        Modelo 03 · Cómo lo construimos
                    </p>

                    <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {customSteps.map(step => (
                            <li key={step.number} className="relative pt-5 border-t border-gray-200">
                                <span
                                    className="absolute -top-[1px] left-0 w-10 h-[2px] bg-brand-blue"
                                    aria-hidden="true"
                                />
                                <span className="font-mono text-xs font-bold text-brand-blue">{step.number}</span>
                                <h4 className="mt-2 text-base font-bold text-text-primary leading-snug">
                                    {step.title}
                                </h4>
                                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                                    {step.description}
                                </p>
                            </li>
                        ))}
                    </ol>
                </motion.div>

                {/* ── Cómo se empieza — activación en dos niveles ── */}
                <div className="mt-20 md:mt-24">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-display font-bold text-text-primary"
                    >
                        Cómo se empieza
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="mt-4 text-lg text-text-secondary max-w-2xl"
                    >
                        Los modelos dicen cómo se trabaja. Esto dice por dónde arrancás.
                    </motion.p>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {levels.map((level, index) => (
                            <motion.article
                                key={level.badge}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                                className="bg-white rounded-2xl border border-gray-200 p-7 md:p-8"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold tracking-wide">
                                        {level.badge}
                                    </span>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                                        {level.lead}
                                    </span>
                                </div>

                                <h4 className="mt-5 text-2xl font-display font-bold text-text-primary">
                                    {level.name}
                                </h4>

                                <p className="mt-3 text-base text-text-secondary leading-relaxed">
                                    {level.description}
                                </p>
                            </motion.article>
                        ))}
                    </div>
                </div>

                {/* ── Cierre: CTA primario + Neuralite como secundario ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 border-t border-gray-200 pt-10"
                >
                    <a
                        href={WHATSAPP_MODELOS}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-brand-blue text-white font-bold text-base hover:bg-brand-blue-dark transition-colors shadow-brand"
                    >
                        Contanos qué necesitás
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </a>

                    <div className="text-sm text-text-secondary">
                        <a
                            href={WHATSAPP_NEURALITE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-text-primary underline decoration-brand-blue/40 underline-offset-4 hover:decoration-brand-blue transition-colors"
                        >
                            Probá gratis Neuralite
                        </a>
                        <span className="block sm:inline sm:ml-2 text-text-muted">
                            Sin tarjeta, sin compromiso.
                        </span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
