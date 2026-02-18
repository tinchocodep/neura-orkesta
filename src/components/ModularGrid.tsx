import { motion } from 'framer-motion';
import { Layers, Zap, Shield, Sparkles } from 'lucide-react';

const coreModules = [
    { name: 'Ventas', icon: '💼', color: 'from-blue-500 to-blue-600' },
    { name: 'Admin', icon: '📊', color: 'from-purple-500 to-purple-600' },
    { name: 'Operaciones', icon: '⚙️', color: 'from-green-500 to-green-600' },
    { name: 'Inteligencia', icon: '🧠', color: 'from-orange-500 to-orange-600' },
];

const features = [
    {
        icon: Layers,
        title: 'Modular',
        description: 'Elegí solo lo que necesitás o llevate todo',
    },
    {
        icon: Zap,
        title: 'Tiempo Real',
        description: 'Todos los módulos sincronizados al instante',
    },
    {
        icon: Shield,
        title: 'Seguro',
        description: 'Datos encriptados y respaldos automáticos',
    },
    {
        icon: Sparkles,
        title: 'IA Integrada',
        description: 'Automatización inteligente en cada módulo',
    },
];

export default function ModularGrid() {
    return (
        <section className="section-padding bg-white relative overflow-hidden">
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
                        Arquitectura <span className="gradient-text">modular</span>
                    </h2>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                        Cuatro módulos principales que trabajan juntos como un sistema operativo
                    </p>
                </motion.div>

                {/* Core Modules Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {coreModules.map((module, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-brand-blue transition-all shadow-sm hover:shadow-xl">
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                                    {module.icon}
                                </div>
                                {/* Name */}
                                <h3 className="text-2xl font-bold text-text-primary">{module.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-brand-blue transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-brand-blue" />
                            </div>
                            <h4 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h4>
                            <p className="text-sm text-text-secondary">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
