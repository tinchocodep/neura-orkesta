import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const pillars = [
    {
        number: '01',
        title: 'Motor Modular',
        description: 'Una plataforma componentizada que escala con tu negocio. Activás solo lo que necesitás, cuando lo necesitás.',
        detail: 'Cada módulo es independiente pero habla con el resto. No hay silos.',
    },
    {
        number: '02',
        title: 'IA que elimina la carga manual',
        description: 'Automatización cognitiva para liberarte de la carga de datos. Neura Orkesta aprende el contexto de tu empresa.',
        detail: 'Cero tipeo. Cero doble carga. El dato entra una sola vez.',
    },
    {
        number: '03',
        title: 'Desafío 24hs',
        description: 'Despliegue inmediato, operativo en un día. Sin implementaciones eternas ni consultoras intermedias.',
        detail: 'Mañana ya estás operando con Neura Orkesta.',
    },
];

export default function SolutionSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.8', 'end 0.5'],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-8"
                >
                    Características
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-tight mb-20"
                >
                    El <span className="gradient-text">Motor de Operaciones</span><br />de tu empresa
                </motion.h2>

                {/* Timeline */}
                <div ref={containerRef} className="relative">
                    {/* Vertical track — background */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-100 md:left-[27px]" />

                    {/* Animated fill line */}
                    <div className="absolute left-[19px] top-0 w-px overflow-hidden md:left-[27px]" style={{ height: '100%' }}>
                        <motion.div
                            className="w-full bg-gradient-to-b from-brand-blue to-brand-blue-light"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Steps */}
                    <div className="space-y-0">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="relative flex gap-8 md:gap-12 pb-16 last:pb-0"
                            >
                                {/* Node dot */}
                                <div className="relative flex-shrink-0 mt-1">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ delay: index * 0.15 + 0.1, type: 'spring', stiffness: 300 }}
                                        className="w-10 h-10 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center md:w-14 md:h-14"
                                    >
                                        <span className="text-brand-blue font-mono font-bold text-xs md:text-sm">{pillar.number}</span>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="pt-1 flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">{pillar.title}</h3>
                                    <p className="text-text-secondary text-lg mb-3 max-w-2xl">{pillar.description}</p>
                                    <p className="text-brand-blue font-semibold text-sm">{pillar.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
