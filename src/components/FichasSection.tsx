import { motion } from 'framer-motion';

/* ─── Data ─────────────────────────────────────────────────────── */

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
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

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
        <section className="section-padding bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">



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

                {/* ── Neuralite CTA Card ───────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl overflow-hidden border border-white/10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
                    style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)' }}
                >
                    <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none" />
                    <div className="flex-1 relative z-10">
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Probá gratis Neuralite</h3>
                        <p className="text-white/50 text-sm max-w-lg">
                            Activá tu plataforma en minutos. Sin tarjeta, sin compromiso. Experimentá cómo Neura Orkesta transforma tu operación.
                        </p>
                    </div>
                    <a
                        href="https://wa.me/5492622567533?text=Hola%21%20Quiero%20probar%20Neuralite%20gratis%20%F0%9F%9A%80"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 flex-shrink-0 px-8 py-4 bg-brand-blue text-white font-bold text-base rounded-xl hover:bg-brand-blue-dark transition-colors shadow-lg shadow-brand-blue/20"
                    >
                        Probar gratis →
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
