import { motion } from 'framer-motion';
import { ShoppingCart, FileText, Truck, Brain, Check } from 'lucide-react';

const modules = [
    {
        icon: ShoppingCart,
        name: 'Ventas',
        tagline: 'Cierra más, más rápido',
        color: 'from-blue-500 to-blue-600',
        features: [
            'CRM con seguimiento automático',
            'Cotizaciones en segundos',
            'Pipeline visual en tiempo real',
            'Predicción de ventas con IA',
        ],
    },
    {
        icon: FileText,
        name: 'Admin',
        tagline: 'Contabilidad sin esfuerzo',
        color: 'from-purple-500 to-purple-600',
        features: [
            'Facturación automática',
            'Conciliación bancaria inteligente',
            'Reportes financieros en vivo',
            'Cumplimiento fiscal garantizado',
        ],
    },
    {
        icon: Truck,
        name: 'Operaciones',
        tagline: 'Logística perfecta',
        color: 'from-green-500 to-green-600',
        features: [
            'Gestión de stock en tiempo real',
            'Rutas optimizadas con IA',
            'Tracking de entregas',
            'Alertas automáticas de reposición',
        ],
    },
    {
        icon: Brain,
        name: 'Inteligencia',
        tagline: 'Decisiones basadas en datos',
        color: 'from-orange-500 to-orange-600',
        features: [
            'Dashboard ejecutivo en vivo',
            'Análisis predictivo',
            'KPIs personalizados',
            'Alertas inteligentes',
        ],
    },
];

export default function ModulesBreakdown() {
    return (
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">
                        Cada módulo, <span className="gradient-text">una solución completa</span>
                    </h2>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                        Profundizá en cada área de tu negocio con herramientas especializadas
                    </p>
                </motion.div>

                {/* Modules Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {modules.map((module, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-brand-blue transition-all shadow-lg hover:shadow-2xl group"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <module.icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-text-primary">{module.name}</h3>
                                    <p className="text-text-secondary">{module.tagline}</p>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-3">
                                {module.features.map((feature, fIndex) => (
                                    <motion.div
                                        key={fIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 + fIndex * 0.05 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-green-600" />
                                        </div>
                                        <p className="text-text-secondary">{feature}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
