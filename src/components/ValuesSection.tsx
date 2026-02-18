import { motion } from 'framer-motion';

const values = [
    { number: '01', title: 'Obsesión con la velocidad', description: 'Despliegue en 24hs. Sin excusas, sin demoras.' },
    { number: '02', title: 'Arquitectura flexible', description: 'Modular, escalable, adaptable a cualquier industria.' },
    { number: '03', title: 'Sin pedir perdón', description: 'Automatización agresiva. El mandato es liberar talento.' },
];

export default function ValuesSection() {
    return (
        <section className="section-padding bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-8"
                >
                    El Abordaje
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-tight mb-16"
                >
                    Nuestros <span className="gradient-text">Valores</span>
                </motion.h2>

                {/* Values — numbered list */}
                <div className="space-y-0">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="flex items-start gap-8 py-10 border-t border-gray-100 last:border-b"
                        >
                            <span className="text-brand-blue font-mono text-sm font-bold mt-1 flex-shrink-0">{value.number}</span>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">{value.title}</h3>
                                <p className="text-text-secondary text-lg">{value.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-2xl md:text-3xl font-semibold text-text-primary max-w-3xl leading-relaxed"
                >
                    Trabajamos con el mandato innegociable de eliminar la esclavitud operativa.
                </motion.p>
            </div>
        </section>
    );
}
