import { motion } from 'framer-motion';

const stats = [
    { value: '40%', label: 'Pérdida de rentabilidad por ineficiencia' },
    { value: '15h', label: 'Desperdiciadas por semana en carga manual' },
    { value: '0', label: 'Visibilidad en tiempo real' },
];

export default function ProblemSection() {
    return (
        <section className="section-padding bg-gray-950 text-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-red-400 font-semibold text-sm tracking-widest uppercase mb-8"
                >
                    El Problema
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-16"
                >
                    El <span className="text-red-400">Caos Manual</span>
                </motion.h2>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ originX: 0 }}
                    className="h-px w-full bg-gradient-to-r from-red-500 to-transparent mb-16"
                />

                {/* Stats — horizontal, no boxes */}
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <p className="text-6xl md:text-7xl font-display font-bold text-red-400 mb-3">{stat.value}</p>
                            <p className="text-white/60 text-lg">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-white/50 max-w-3xl"
                >
                    PyMEs pierden rentabilidad y queman talento calificado en tareas repetitivas que no aportan valor.
                </motion.p>
            </div>
        </section>
    );
}
