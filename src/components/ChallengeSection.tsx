import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
    'https://wa.me/5492622567533?text=Hola%21%20Quiero%20arrancar%20el%20Desaf%C3%ADo%2024hs%3A%20%C2%BFcu%C3%A1ndo%20hacemos%20el%20kick-off%3F';

const milestones = [
    {
        step: '01',
        when: 'Día 0 — mañana',
        detail: 'Kick-off. Entendemos tus datos y tus procesos, y exportamos lo necesario.',
    },
    {
        step: '02',
        when: 'Día 0 — tarde',
        detail: 'Configuramos el sistema, cargamos tus datos y activamos las integraciones.',
    },
    {
        step: '03',
        when: 'Día 1 — 8:00 AM',
        detail: 'Tu equipo entra, hace un tutorial de 15 minutos y empieza a operar.',
    },
];

export default function ChallengeSection() {
    return (
        <section id="desafio" className="section-padding anchor-offset bg-gray-950 text-white">
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-6"
                >
                    Desafío 24hs
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight max-w-4xl"
                >
                    Hoy nos contás.<br />
                    <span className="text-white/60">Mañana a las 8 tu equipo está operando.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl"
                >
                    Sin implementaciones de seis meses. Sin consultoras. Sin contratos de permanencia.
                </motion.p>

                {/* Hitos */}
                {/* fase 2: track horizontal scrubbeado — estos 3 hitos son hijos directos
                    del contenedor flex de abajo y se van a desplazar en x con scrollYProgress
                    (~120vh, sin hijack). Hoy es grilla vertical en mobile y horizontal en desktop. */}
                <div className="relative mt-16 md:mt-24">
                    {/* Riel: en fase 2 es el camino que recorre el track */}
                    <div
                        aria-hidden="true"
                        className="hidden md:block absolute left-0 right-0 top-3 h-px bg-gradient-to-r from-brand-blue via-brand-blue/30 to-transparent"
                    />

                    <ol className="flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-12">
                        {milestones.map((milestone, index) => (
                            <motion.li
                                key={milestone.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
                                className="relative flex-1 md:pr-6"
                            >
                                {/* Nodo sobre el riel */}
                                <div className="flex items-center gap-4 md:block">
                                    <span
                                        aria-hidden="true"
                                        className="block w-1.5 h-1.5 rounded-full bg-brand-blue ring-4 ring-brand-blue/15 md:relative md:top-[9px]"
                                    />
                                    <span className="font-mono text-xs text-white/50 tracking-widest md:block md:mt-6">
                                        {milestone.step}
                                    </span>
                                </div>

                                <h3 className="mt-4 md:mt-3 text-xl md:text-2xl font-display font-bold text-white">
                                    {milestone.when}
                                </h3>

                                <p className="mt-3 text-base md:text-lg text-white/50 leading-relaxed max-w-sm">
                                    {milestone.detail}
                                </p>
                            </motion.li>
                        ))}
                    </ol>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-center gap-8 md:gap-12"
                >
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-blue text-white font-bold text-base md:text-lg hover:bg-brand-blue-dark transition-colors self-start"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Arrancá el desafío por WhatsApp
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
