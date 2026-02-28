import { motion } from 'framer-motion';
import { Clock, RefreshCw, BarChart3 } from 'lucide-react';

const painPoints = [
    {
        icon: Clock,
        title: 'Horas perdidas',
        description: 'Tu equipo pierde tiempo valioso cargando datos a mano que podrían procesarse solos.',
        color: '#ef4444',
    },
    {
        icon: RefreshCw,
        title: 'Datos duplicados',
        description: 'Información repetida entre sistemas que nadie reconcilia hasta que explota un problema.',
        color: '#f97316',
    },
    {
        icon: BarChart3,
        title: 'Decisiones a ciegas',
        description: 'Sin datos unificados, las decisiones se toman por intuición, no por evidencia.',
        color: '#eab308',
    },
];

export default function ProblemSection() {
    return (
        <section className="relative overflow-hidden">
            {/* Top gradient fade (white → red-50) */}
            <div className="h-24 bg-gradient-to-b from-white to-red-50" />

            {/* Main content with solid opaque background */}
            <div className="bg-red-50 section-padding !pt-8 !pb-8">
                <div className="max-w-6xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-red-500 font-semibold text-sm tracking-widest uppercase mb-8"
                    >
                        El Problema
                    </motion.p>

                    {/* Two-column layout */}
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                        {/* Left: Title + Paragraph */}
                        <div className="lg:w-1/2 lg:sticky lg:top-32 lg:self-start">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none mb-8 text-gray-900"
                            >
                                El <span className="text-red-500">Caos Manual</span>
                            </motion.h2>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                style={{ originX: 0 }}
                                className="h-px w-full bg-gradient-to-r from-red-400 to-transparent mb-8"
                            />

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-lg md:text-xl text-gray-500 leading-relaxed"
                            >
                                Las empresas enfrentan cada día más dificultad para conseguir personas dispuestas a hacer tareas repetitivas — y las que las hacen, <span className="text-gray-800 font-semibold">desperdician su talento</span> en trabajo que podría automatizarse.
                            </motion.p>
                        </div>

                        {/* Right: Pain Points — bold and staggered on scroll */}
                        <div className="lg:w-1/2 space-y-6">
                            {painPoints.map((point, index) => (
                                <motion.div
                                    key={point.title}
                                    initial={{ opacity: 0, x: 60, scale: 0.95 }}
                                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
                                    className="group relative bg-white rounded-2xl p-7 border-l-4 shadow-md hover:shadow-xl transition-all duration-300"
                                    style={{ borderLeftColor: point.color }}
                                >
                                    <div className="flex items-start gap-5">
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                                            style={{ backgroundColor: point.color + '18' }}
                                        >
                                            <point.icon className="w-7 h-7" style={{ color: point.color }} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1.5">{point.title}</h3>
                                            <p className="text-gray-500 text-base leading-relaxed">{point.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom gradient fade (red-50 → white) */}
            <div className="h-24 bg-gradient-to-b from-red-50 to-white" />
        </section>
    );
}
