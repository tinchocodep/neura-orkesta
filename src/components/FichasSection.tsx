import { motion } from 'framer-motion';
import {
    Users, TrendingUp, Wallet, Package, Plug, Database,
    LayoutDashboard
} from 'lucide-react';

const categories = [
    {
        title: 'Comercial',
        subtitle: 'Vender Más',
        icon: TrendingUp,
        color: '#3b82f6',
        gradient: 'from-blue-500 to-blue-600',
        span: 'md:col-span-2',
        items: ['Facturación Electrónica', 'Presupuestos Pro', 'CRM Pipeline', 'Seguimiento Automático', 'Cuentas Corrientes', 'Listas de Precios'],
    },
    {
        title: 'Financiero',
        subtitle: 'Controlar la Caja',
        icon: Wallet,
        color: '#10b981',
        gradient: 'from-emerald-500 to-teal-500',
        span: 'md:col-span-1',
        items: ['Tesorería Unificada', 'Conciliación Bancaria', 'Chequera Digital', 'Cashflow', 'Impuestos'],
    },
    {
        title: 'Operativo',
        subtitle: 'Mover la Mercadería',
        icon: Package,
        color: '#a855f7',
        gradient: 'from-purple-500 to-violet-600',
        span: 'md:col-span-1',
        items: ['Inventario Dinámico', 'Compras', 'Logística & Ruteo', 'App Choferes', 'Mantenimiento de Flota'],
    },
    {
        title: 'Capital Humano',
        subtitle: 'RRHH Simple',
        icon: Users,
        color: '#ec4899',
        gradient: 'from-pink-500 to-rose-500',
        span: 'md:col-span-1',
        items: ['Legajo Digital', 'Asistencia', 'Novedades', 'Liquidación Simple'],
    },
    {
        title: 'Integraciones',
        subtitle: 'Conectá todo',
        icon: Plug,
        color: '#f97316',
        gradient: 'from-orange-500 to-amber-500',
        span: 'md:col-span-2',
        items: ['WhatsApp Bot', 'Email Automático', 'Facturación AFIP', 'Webhooks', 'API Abierta', 'Reportes Custom', 'Alertas'],
    },
    {
        title: 'Infraestructura',
        subtitle: 'Escalabilidad',
        icon: Database,
        color: '#6366f1',
        gradient: 'from-indigo-500 to-blue-600',
        span: 'md:col-span-1',
        items: ['+Usuarios', '+IA Sync', 'Mobile App', 'API Access', 'Storage'],
    },
];

export default function FichasSection() {
    return (
        <section className="section-padding bg-gray-950 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
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
                        Armá tu empresa <br />
                        <span className="gradient-text">módulo a módulo.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mb-4"
                    >
                        Neura Orkesta no es un software que se compra completo. Es una plataforma que se <span className="text-white font-semibold">construye con vos</span>: empezás con el Tablero Base y activás las fichas que tu operación necesita.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-base text-gray-500 max-w-2xl"
                    >
                        Sin paquetes cerrados. Sin funciones que no usás. Solo pagás por lo que activás.
                    </motion.p>
                </div>

                {/* Tablero Base — Entry Point */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 relative rounded-2xl overflow-hidden border border-white/10 p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
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

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: index * 0.07, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className={`relative overflow-hidden rounded-2xl p-6 ${cat.span} group cursor-default`}
                            style={{ background: `linear-gradient(135deg, ${cat.color}22 0%, ${cat.color}08 100%)`, border: `1px solid ${cat.color}30` }}
                        >
                            {/* Background glow */}
                            <div
                                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                                style={{ backgroundColor: cat.color }}
                            />

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: cat.color + '25' }}
                                    >
                                        <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                                        <p className="text-sm font-medium" style={{ color: cat.color }}>{cat.subtitle}</p>
                                    </div>
                                </div>
                                <span
                                    className="text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: cat.color + '20', color: cat.color }}
                                >
                                    +{cat.items.length} módulos
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
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
