import { motion } from 'framer-motion';

const costs = [
    {
        number: '01',
        title: 'Doble trabajo',
        description: 'El campo carga en crudo, el admin reformatea y lo sube a cada sistema.',
    },
    {
        number: '02',
        title: 'Error humano',
        description: 'Cada vuelta acumula errores que el sistema toma como válidos.',
    },
    {
        number: '03',
        title: 'Costo de capacitación',
        description: 'Cada persona nueva aprende primero cómo cargar, no cómo trabajar. Si se va, todo empieza de nuevo.',
    },
];

const examples = [
    'Las facturas de proveedores las cargás a mano, una por una',
    'El resumen del banco lo conciliás mirando el PDF',
    'La cobranza vive en una planilla que entiende uno solo',
    'El remito y la factura en ARCA, de a uno',
    'Los sueldos, a mano y rezando en cada cierre',
    'El reporte que necesitás hoy está listo en tres días',
];

export default function ProblemSection() {
    return (
        <section id="problema" className="relative anchor-offset">
            {/* Degradado de entrada (blanco → terracota claro) */}
            <div className="h-24 bg-gradient-to-b from-white to-[#FFF7ED]" />

            {/* Contenido principal sobre fondo opaco */}
            <div className="bg-[#FFF7ED] section-padding !pt-10 !pb-14">
                <div className="max-w-5xl mx-auto">

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-[#C2410C] font-semibold text-sm tracking-widest uppercase mb-6"
                    >
                        El problema
                    </motion.p>

                    {/* Titular + bajada */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-[1.02] tracking-tight mb-6"
                    >
                        El dato entra <span className="text-[#C2410C]">dos veces.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-lg md:text-2xl text-text-secondary leading-relaxed max-w-3xl mb-16"
                    >
                        Tu equipo registra lo que pasa en crudo. Después alguien lo reformatea para que entre en el sistema.
                        Con errores. Siempre.
                    </motion.p>

                    {/* Los tres costos — lista tipográfica, sin tarjetas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8 mb-16">
                        {costs.map((cost, index) => (
                            <motion.div
                                key={cost.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                                className="border-t border-[#C2410C]/25 pt-5"
                            >
                                <span className="block font-mono text-xs font-bold text-[#C2410C]/70 mb-3">
                                    {cost.number}
                                </span>
                                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-2">
                                    {cost.title}
                                </h3>
                                <p className="text-base text-text-secondary leading-relaxed">
                                    {cost.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* El número como respaldo, no como titular */}
                    {/* fase 2: el 15 pasa a ser contador scrubbeado con scrollYProgress, reversible */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 border-l-4 border-[#C2410C] pl-5 sm:pl-6 py-1 mb-20"
                    >
                        <span className="text-4xl md:text-5xl font-display font-bold text-[#C2410C] tabular-nums leading-none">
                            +15
                        </span>
                        <p className="text-base md:text-lg text-text-secondary leading-snug">
                            <span className="font-semibold text-text-primary">horas por semana</span>
                            , por cada empleado administrativo.
                        </p>
                    </motion.div>

                    {/* Los 6 ejemplos — filas compactas de una línea */}
                    <div className="flex items-stretch gap-5 sm:gap-7 mb-16">

                        {/* Barra de acumulación al costado */}
                        {/* fase 2: cada fila que aterriza engorda su segmento de esta barra */}
                        <div
                            aria-hidden="true"
                            className="flex-shrink-0 w-1 flex flex-col gap-px pt-2 pb-2"
                        >
                            {examples.map((_, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    whileInView={{ opacity: 0.25 + index * 0.15, scaleY: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    style={{ originY: 0 }}
                                    className="flex-1 w-full rounded-full bg-[#C2410C]"
                                />
                            ))}
                        </div>

                        <ul className="flex-1 min-w-0 divide-y divide-[#C2410C]/15 border-y border-[#C2410C]/15">
                            {examples.map((example, index) => (
                                <motion.li
                                    key={example}
                                    initial={{ opacity: 0, y: -12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="flex items-baseline gap-4 py-3.5"
                                >
                                    <span className="font-mono text-xs font-bold text-[#C2410C]/60 tabular-nums flex-shrink-0">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text-base md:text-lg text-text-secondary leading-snug">
                                        {example}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Cierre */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-text-primary leading-snug max-w-3xl"
                    >
                        Nada de esto es culpa de tu equipo.{' '}
                        <span className="text-[#C2410C]">Es que nadie conectó los sistemas.</span>
                    </motion.p>

                </div>
            </div>

            {/* Degradado de salida (terracota claro → blanco) */}
            <div className="h-24 bg-gradient-to-b from-[#FFF7ED] to-white" />
        </section>
    );
}
