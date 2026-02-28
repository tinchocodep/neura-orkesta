import { motion } from 'framer-motion';
import {
    Users, TrendingUp, Wallet, Package, Plug, Database,
    LayoutDashboard
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────── */

const categories = [
    {
        title: 'Comercial',
        subtitle: 'Aumentá tus ventas',
        icon: TrendingUp,
        color: '#3b82f6',
    },
    {
        title: 'Financiero',
        subtitle: 'Control y organización total de finanzas',
        icon: Wallet,
        color: '#10b981',
    },
    {
        title: 'Operativo',
        subtitle: 'Control de movimiento de mercadería',
        icon: Package,
        color: '#a855f7',
    },
    {
        title: 'Capital Humano',
        subtitle: 'Gestión de RRHH',
        icon: Users,
        color: '#ec4899',
    },
    {
        title: 'Integraciones',
        subtitle: 'Conectá tus bancos y apps',
        icon: Plug,
        color: '#f97316',
    },
    {
        title: 'Infraestructura',
        subtitle: 'Escalabilidad',
        icon: Database,
        color: '#6366f1',
    },
];

/** All module names for the marquee ticker */
const allModules = [
    'Facturación Electrónica', 'Presupuestos Pro', 'CRM Pipeline',
    'Seguimiento Automático', 'Cuentas Corrientes', 'Listas de Precios',
    'Tesorería Unificada', 'Conciliación Bancaria', 'Chequera Digital',
    'Cashflow', 'Impuestos', 'Inventario Dinámico', 'Compras',
    'Logística & Ruteo', 'App Choferes', 'Mantenimiento de Flota',
    'Legajo Digital', 'Asistencia', 'Novedades', 'Liquidación Simple',
    'WhatsApp Bot', 'Email Automático', 'Facturación AFIP', 'Webhooks',
    'API Abierta', 'Reportes Custom', 'Alertas', 'Mobile App',
    'IA Sync', 'Storage',
];

/** Split modules into two rows for dual-direction marquee */
const marqueeRowA = allModules.slice(0, Math.ceil(allModules.length / 2));
const marqueeRowB = allModules.slice(Math.ceil(allModules.length / 2));

/* ─── Marquee Row Component ────────────────────────────────────── */

interface MarqueeRowProps {
    items: string[];
    direction?: 'left' | 'right';
    speed?: number;
}

function MarqueeRow({ items, direction = 'left', speed = 35 }: MarqueeRowProps) {
    const animationClass = direction === 'left' ? 'marquee-left' : 'marquee-right';

    return (
        <div className="relative overflow-hidden py-3">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-950 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-950 to-transparent pointer-events-none" />

            <div
                className={`flex gap-6 whitespace-nowrap ${animationClass}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {/* Duplicate items for seamless loop */}
                {[...items, ...items].map((mod, i) => (
                    <span
                        key={`${mod}-${i}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium tracking-wide"
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50"
                            style={{ backgroundColor: 'var(--brand-blue)' }}
                        />
                        {mod}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ─── Main Section ─────────────────────────────────────────────── */

export default function FichasSection() {
    return (
        <section className="section-padding bg-gray-950 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* ── Header ─────────────────────────────────── */}
                <div className="mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-4"
                    >
                        Propuesta Comercial
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6"
                    >
                        Potenciá tu empresa <br />
                        <span className="gradient-text">módulo a módulo.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl"
                    >
                        Activás solo lo que necesitás. Sin paquetes cerrados.
                    </motion.p>
                </div>

                {/* ── Tablero Base — Entry Point ──────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 relative rounded-2xl overflow-hidden border border-white/10 p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
                    style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)' }}
                >
                    <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none" />
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <LayoutDashboard className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">Punto de Entrada · Low Ticket</span>
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white mb-1">Tablero Base</h3>
                        <p className="text-white/50 text-sm">Identidad · Agenda · Base de Clientes & Proveedores · Configuración de Empresa</p>
                    </div>
                    <div className="text-right flex-shrink-0 relative z-10">
                        <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Incluido siempre</p>
                        <p className="text-white font-bold text-lg">Gratis al activar</p>
                    </div>
                </motion.div>

                {/* ── Categories — Typographic List ───────────── */}
                <div className="mb-16 divide-y divide-white/[0.06]">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ delay: index * 0.06, duration: 0.5 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="group flex items-center justify-between py-5 md:py-6 cursor-default transition-all duration-300"
                        >
                            {/* Left: icon + title */}
                            <div className="flex items-center gap-4 md:gap-6">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: cat.color + '18' }}
                                >
                                    <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white/90 group-hover:text-white transition-all duration-300">
                                    {cat.title}
                                </h3>
                            </div>

                            {/* Right: subtitle */}
                            <span
                                className="text-sm md:text-base font-medium transition-all duration-300 hidden sm:block group-hover:scale-105"
                                style={{ color: cat.color + 'aa' }}
                            >
                                {cat.subtitle}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* ── Marquee — All Modules Ticker ────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-16"
                >
                    <MarqueeRow items={marqueeRowA} direction="left" speed={40} />
                    <MarqueeRow items={marqueeRowB} direction="right" speed={45} />
                </motion.div>

                {/* ── Bottom CTA ─────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-gray-400 text-lg mb-6">
                        Cada área tiene sus propios módulos. <span className="text-white font-semibold">Activás solo lo que necesitás.</span>
                    </p>
                    <a
                        href="https://wa.me/5492622567533?text=Hola%21%20Quiero%20conocer%20la%20propuesta%20completa%20de%20m%C3%B3dulos%20de%20Neura%20Orkesta%20%F0%9F%93%8B"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-base px-8 py-4 inline-block"
                    >
                        Quiero ver la propuesta completa
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
