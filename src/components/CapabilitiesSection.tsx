import { motion } from 'framer-motion';

/**
 * Qué hace Neura.
 *
 * Esta sección reemplaza a la vieja "El dato entra dos veces", que estaba
 * construida sobre el error: lo que el equipo hace mal, las horas que se
 * pierden, la culpa. El foco ahora es lo que Neura hace hoy.
 *
 * Cada capacidad es concreta y verificable. Nada de adjetivos.
 */

const capabilities = [
    'Las facturas de proveedores se cargan solas',
    'El resumen del banco se concilia solo',
    'Las cobranzas quedan registradas al momento',
    'Los remitos y las facturas ARCA salen automáticos',
    'La liquidación de sueldos, sin tipear',
    'El reporte que necesitás hoy, listo hoy',
];

const pillars = [
    {
        number: '01',
        title: 'Digitaliza',
        description:
            'Mandás lo que sea —una foto, un PDF, una planilla, un mensaje de WhatsApp— y Neura lo lee, lo entiende y lo convierte en datos usables.',
    },
    {
        number: '02',
        title: 'Conecta',
        description:
            'Excel, Drive, tu ERP, tu sistema contable, tu banco. Neura los une y les manda a cada uno los datos con el formato que necesita.',
    },
    {
        number: '03',
        title: 'Automatiza',
        description:
            'El dato entra una vez y se acomoda solo en todos lados. Tu equipo deja de reformatear y vuelve a hacer su trabajo.',
    },
];

export default function CapabilitiesSection() {
    return (
        <section id="que-hace" className="section-padding anchor-offset bg-white">
            <div className="max-w-6xl mx-auto">

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-6"
                >
                    Qué hace Neura
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-[1.05] tracking-tight mb-6 max-w-4xl"
                >
                    Tu operación, <span className="gradient-text">al día sola.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mb-16"
                >
                    Neura digitaliza lo que entra, conecta las herramientas que ya usás y automatiza
                    el trabajo de darle formato al dato. Tu equipo sigue trabajando como siempre.
                </motion.p>

                {/* ── Los tres verbos ─────────────────────────────────────── */}
                {/* fase 2: los tres pilares pasan a escena anclada con scrub */}
                <div className="grid md:grid-cols-3 gap-px bg-gray-100 mb-20 rounded-2xl overflow-hidden">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="bg-white p-7 md:p-8"
                        >
                            <span className="font-mono text-xs font-bold text-brand-blue tracking-widest">
                                {pillar.number}
                            </span>
                            <h3 className="text-2xl font-display font-bold text-text-primary mt-4 mb-3">
                                {pillar.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Lo concreto ─────────────────────────────────────────── */}
                <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-8"
                >
                    En concreto, desde el primer día:
                </motion.h3>

                <ul className="grid sm:grid-cols-2 gap-x-10">
                    {capabilities.map((item, index) => (
                        <motion.li
                            key={item}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.45, delay: (index % 2) * 0.06 + Math.floor(index / 2) * 0.08 }}
                            className="flex items-start gap-4 py-5 border-t border-gray-100"
                        >
                            <span
                                aria-hidden="true"
                                className="mt-2 w-2 h-2 rounded-full bg-brand-blue flex-shrink-0"
                            />
                            <span className="text-base md:text-lg text-text-secondary leading-snug">
                                {item}
                            </span>
                        </motion.li>
                    ))}
                </ul>

            </div>
        </section>
    );
}
