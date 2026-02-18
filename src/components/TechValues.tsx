import { motion } from 'framer-motion';
import { FileText, Zap, Target, Cpu, Cloud, Lock } from 'lucide-react';

const features = [
    {
        icon: FileText,
        title: 'Neura Sync',
        description: 'Subís un PDF o Excel y el sistema lo entiende solo. Chau data entry manual.',
        gradient: 'from-blue-500 to-blue-600',
    },
    {
        icon: Zap,
        title: 'Tiempo Real',
        description: 'Todos los módulos sincronizados al instante. Lo que pasa en ventas, lo ve admin.',
        gradient: 'from-purple-500 to-purple-600',
    },
    {
        icon: Target,
        title: 'IA Predictiva',
        description: 'Anticipá problemas antes de que pasen. Stock, ventas, flujo de caja.',
        gradient: 'from-orange-500 to-orange-600',
    },
    {
        icon: Cpu,
        title: 'API Abierta',
        description: 'Conectá con cualquier sistema. Mercado Libre, WhatsApp, tu ERP legacy.',
        gradient: 'from-green-500 to-green-600',
    },
    {
        icon: Cloud,
        title: '100% Cloud',
        description: 'Accedé desde cualquier lugar. Backups automáticos. Cero mantenimiento.',
        gradient: 'from-cyan-500 to-cyan-600',
    },
    {
        icon: Lock,
        title: 'Seguridad Enterprise',
        description: 'Encriptación de punta a punta. Cumplimiento GDPR. Auditoría completa.',
        gradient: 'from-red-500 to-red-600',
    },
];

export default function TechValues() {
    return (
        <section className="section-padding bg-white">
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
                        Tecnología que <span className="gradient-text">marca la diferencia</span>
                    </h2>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                        No es solo software, es inteligencia aplicada a tu negocio
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-brand-blue transition-all shadow-sm hover:shadow-xl h-full">
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-text-primary mb-3">{feature.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
