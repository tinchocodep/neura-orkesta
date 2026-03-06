import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
    Users, TrendingUp, Wallet, Package, Plug, Database
} from 'lucide-react';

/* ─── Module categories (relocated from FichasSection) ──────── */
const moduleCategories = [
    { title: 'Comercial', subtitle: 'Aumentá tus ventas', icon: TrendingUp, color: '#3b82f6' },
    { title: 'Financiero', subtitle: 'Control total de finanzas', icon: Wallet, color: '#10b981' },
    { title: 'Operativo', subtitle: 'Control de mercadería', icon: Package, color: '#a855f7' },
    { title: 'Capital Humano', subtitle: 'Gestión de RRHH', icon: Users, color: '#ec4899' },
    { title: 'Integraciones', subtitle: 'Bancos y apps', icon: Plug, color: '#f97316' },
    { title: 'Infraestructura', subtitle: 'Escalabilidad', icon: Database, color: '#6366f1' },
];

/* ─── Timeline pillars ──────────────────────────────────────── */
const pillarBefore = {
    number: '01',
    title: 'Motor Modular',
    description: 'Una plataforma componentizada que escala con tu negocio. Activás solo lo que necesitás, cuando lo necesitás.',
    detail: 'Cada módulo es independiente pero habla con el resto. No hay silos.',
};

const pillarsAfter = [
    {
        number: '02',
        title: 'IA que elimina la carga manual',
        description: 'Automatización cognitiva para liberarte de la carga de datos. Neura Orkesta aprende el contexto de tu empresa.',
        detail: 'Cero tipeo. Cero doble carga. El dato entra una sola vez.',
    },
    {
        number: '03',
        title: 'Desafío 24hs',
        description: 'Traé tu problema más urgente. En 24 horas diseñamos una solución a medida y te mostramos cómo Neura lo resuelve.',
        detail: 'Un dolor concreto, una solución real. Sin PowerPoints ni promesas: acción directa.',
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

                    <div className="space-y-0">
                        {/* ── 01 — Motor Modular ─────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5 }}
                            className="relative flex gap-8 md:gap-12 pb-10"
                        >
                            <div className="relative flex-shrink-0 mt-1">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                                    className="w-10 h-10 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center md:w-14 md:h-14"
                                >
                                    <span className="text-brand-blue font-mono font-bold text-xs md:text-sm">{pillarBefore.number}</span>
                                </motion.div>
                            </div>
                            <div className="pt-1 flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">{pillarBefore.title}</h3>
                                <p className="text-text-secondary text-lg mb-3 max-w-2xl">{pillarBefore.description}</p>
                                <p className="text-brand-blue font-semibold text-sm">{pillarBefore.detail}</p>
                            </div>
                        </motion.div>

                        {/* ── Module Categories Grid (between 01 & 02) ── */}
                        <div className="relative flex gap-8 md:gap-12 pb-16">
                            {/* Spacer to align with timeline */}
                            <div className="w-10 md:w-14 flex-shrink-0" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.6 }}
                                className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4"
                            >
                                {moduleCategories.map((cat, index) => (
                                    <motion.div
                                        key={cat.title}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: '-30px' }}
                                        transition={{ delay: index * 0.06, duration: 0.4 }}
                                        whileHover={{ y: -4, scale: 1.03 }}
                                        className="group flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 cursor-default"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                                            style={{ backgroundColor: cat.color + '18' }}
                                        >
                                            <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-bold text-text-primary truncate">{cat.title}</h4>
                                            <p className="text-xs font-medium truncate" style={{ color: cat.color + 'aa' }}>
                                                {cat.subtitle}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* ── 02 & 03 — Remaining pillars ────────── */}
                        {pillarsAfter.map((pillar, index) => (
                            <motion.div
                                key={pillar.number}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="relative flex gap-8 md:gap-12 pb-16 last:pb-0"
                            >
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
