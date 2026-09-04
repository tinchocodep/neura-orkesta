import { motion } from 'framer-motion';
import {
    Truck, ShoppingCart, Handshake, Factory, HardHat, Stethoscope, Wheat,
} from 'lucide-react';

/* ─── Industrias ───────────────────────────────────────────────── */

const industries = [
    {
        icon: Truck,
        name: 'Distribución y Logística',
        line: 'Pedidos, remitos, rutas y entregas sincronizados.',
    },
    {
        icon: ShoppingCart,
        name: 'Retail y Mayoristas',
        line: 'Stock, precios, cobranzas y clientes en un solo lugar.',
    },
    {
        icon: Handshake,
        name: 'Servicios B2B',
        line: 'Presupuestos, facturación, contratos y seguimiento de clientes.',
    },
    {
        icon: Factory,
        name: 'Industria y Manufactura',
        line: 'Producción, insumos, proveedores y nómina integrados.',
    },
    {
        icon: HardHat,
        name: 'Construcción',
        line: 'Obras, materiales, subcontratistas y costos por obra.',
    },
    {
        icon: Stethoscope,
        name: 'Salud y Profesionales',
        line: 'Turnos, facturación, honorarios y reportes.',
    },
    {
        icon: Wheat,
        name: 'Agro',
        line: 'Campo, acopio y la operación de temporada.',
    },
];

/* ─── Módulos ──────────────────────────────────────────────────── */

/**
 * Los 30 módulos, rescatados tal cual de FichasSection.tsx.
 * Único cambio de copy: 'Facturación AFIP' → 'Facturación ARCA'
 * (ARCA es el nombre actual del organismo; regla de tono del proyecto).
 */
const allModules = [
    'Presupuestos Pro', 'CRM Pipeline',
    'Seguimiento Automático', 'Cuentas Corrientes', 'Listas de Precios',
    'Tesorería Unificada', 'Conciliación Bancaria', 'Chequera Digital',
    'Cashflow', 'Impuestos', 'Inventario Dinámico', 'Compras',
    'Logística & Ruteo', 'App Choferes', 'Mantenimiento de Flota',
    'Legajo Digital', 'Asistencia', 'Novedades', 'Liquidación Simple',
    'WhatsApp Bot', 'Email Automático', 'Facturación ARCA', 'Webhooks',
    'API Abierta', 'Reportes Custom', 'Alertas', 'Mobile App',
    'IA Sync', 'Storage',
];

/** Dos filas para el marquee bidireccional (mismo split que FichasSection) */
const marqueeRowA = allModules.slice(0, Math.ceil(allModules.length / 2));
const marqueeRowB = allModules.slice(Math.ceil(allModules.length / 2));

/**
 * Las 6 categorías que hoy viven dentro de SolutionSection.tsx se conservan,
 * pero como franja tipográfica y no como grilla de tarjetas con ícono:
 * agrupar los 30 nombres dentro del marquee obligaba a inventar la asignación
 * de cada módulo a su área, y además rompía el loop parejo de las dos filas.
 * Acá cumplen su función real: decir en una línea qué áreas cubren los módulos.
 * (Se dejan afuera los subtítulos, los íconos y los colores de la versión vieja.)
 */
const moduleAreas = [
    'Comercial', 'Financiero', 'Operativo',
    'Capital Humano', 'Integraciones', 'Infraestructura',
];

/* ─── Marquee Row ──────────────────────────────────────────────── */

interface MarqueeRowProps {
    items: string[];
    direction?: 'left' | 'right';
    speed?: number;
}

function MarqueeRow({ items, direction = 'left', speed = 40 }: MarqueeRowProps) {
    const animationClass = direction === 'left' ? 'marquee-left' : 'marquee-right';

    return (
        <div className="relative overflow-hidden py-3">
            {/* Máscaras de fade — asumen fondo blanco en la sección */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

            {/* fase 2: atar animationDuration a useVelocity(scrollY) — la estructura ya está lista */}
            <div
                className={`flex gap-6 whitespace-nowrap ${animationClass}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {/* Duplicado para loop sin costura */}
                {[...items, ...items].map((mod, i) => (
                    <span
                        key={`${mod}-${i}`}
                        className="inline-flex items-center gap-2 text-sm text-text-muted font-medium tracking-wide"
                    >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-brand-blue opacity-50" />
                        {mod}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ─── Sección ──────────────────────────────────────────────────── */

export default function IndustriesSection() {
    return (
        <section id="industrias" className="section-padding anchor-offset bg-white">
            <div className="max-w-6xl mx-auto">

                {/* ── Encabezado ─────────────────────────────── */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-6"
                >
                    Para quién
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight mb-6 max-w-4xl"
                >
                    No es solo para PyMEs.<br className="hidden md:block" />{' '}
                    Es para <span className="gradient-text">cualquier empresa que opera</span>.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mb-14"
                >
                    El caos operativo no tiene rubro. Desde una distribuidora hasta un estudio
                    contable, los dolores son los mismos: datos dispersos, procesos manuales y
                    tiempo perdido.
                </motion.p>

                {/* ── Las 7 industrias ───────────────────────── */}
                {/* Lista tipográfica con hairlines, no grilla de tarjetas. */}
                <ul className="border-t border-gray-100">
                    {industries.map((industry, i) => {
                        const Icon = industry.icon;

                        return (
                            <motion.li
                                key={industry.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                                className="group border-b border-gray-100"
                            >
                                <div className="flex items-start gap-4 py-5 md:grid md:grid-cols-[auto_18rem_1fr] md:items-center md:gap-6 md:py-6">
                                    <span
                                        aria-hidden="true"
                                        className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center transition-colors group-hover:bg-brand-blue/10"
                                    >
                                        <Icon className="w-5 h-5 text-brand-blue" strokeWidth={1.75} />
                                    </span>

                                    <div className="min-w-0 md:contents">
                                        <h3 className="text-lg md:text-xl font-display font-semibold text-text-primary">
                                            {industry.name}
                                        </h3>
                                        <p className="text-text-secondary text-base leading-relaxed mt-1 md:mt-0">
                                            {industry.line}
                                        </p>
                                    </div>
                                </div>
                            </motion.li>
                        );
                    })}
                </ul>

                {/* ── ¿No ves tu rubro? ──────────────────────── */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-text-muted text-sm mt-6"
                >
                    ¿No ves tu rubro?{' '}
                    <a
                        href="https://wa.me/5492622567533?text=Hola%21%20Quiero%20saber%20si%20Neura%20sirve%20para%20mi%20rubro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue font-semibold underline underline-offset-4 decoration-brand-blue/30 hover:decoration-brand-blue transition-colors"
                    >
                        Contanos qué hacés y te decimos si te sirve
                    </a>
                    .
                </motion.p>

                {/* ── Módulos — pegado a las industrias ──────── */}
                {/* La adyacencia es deliberada: el marquee acá es prueba de amplitud. */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mt-16 pt-10 border-t border-gray-100"
                >
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-3">
                        Activás lo que necesitás. Pagás por lo que usás.
                    </h3>

                    <p className="text-text-muted text-xs md:text-sm tracking-widest uppercase mb-8">
                        {moduleAreas.join(' · ')}
                    </p>

                    <div className="-mx-6 md:-mx-12 lg:-mx-24">
                        <MarqueeRow items={marqueeRowA} direction="left" speed={40} />
                        <MarqueeRow items={marqueeRowB} direction="right" speed={45} />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
