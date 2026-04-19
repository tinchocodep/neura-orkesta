import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
import { useState } from 'react';

const products = [
    {
        id: 'sync',
        image: '/neura_sync.png',
        name: 'Neura Sync',
        tagline: 'Motor de Ingesta',
        alias: 'La Caja Mágica',
        pitch: 'Todo lo que entra a tu empresa — PDF, Excel, WhatsApp, email — se procesa solo. Cero tipeo manual.',
        color: 'from-blue-500 to-blue-600',
        textColor: 'text-blue-500',
        bgLight: 'bg-blue-50',
        accentBg: 'bg-blue-500',
        pill: 'bg-blue-100 text-blue-600',
        includes: [
            'Drop Zone universal para cualquier formato',
            'Cognición AI que entiende contexto',
            'Inyección limpia a tu plataforma',
            'Pipeline automático sin intervención manual',
            'Soporte multi-fuente: PDF, Excel, WhatsApp, email',
        ],
        detail: 'Neura Sync es el punto de entrada de datos de tu empresa. Cualquier documento, mensaje o archivo que llegue a tu negocio es procesado, interpretado y cargado automáticamente en la plataforma. Cero tipeo manual.',
    },
    {
        id: 'core',
        image: '/neura_core.png',
        name: 'Neura Core',
        tagline: 'Motor Operativo',
        alias: 'El Corazón',
        pitch: 'CRM, Tesorería, Compras y Logística integrados. Cada acción genera automáticamente los registros derivados.',
        color: 'from-purple-500 to-purple-600',
        textColor: 'text-purple-500',
        bgLight: 'bg-purple-50',
        accentBg: 'bg-purple-500',
        pill: 'bg-purple-100 text-purple-600',
        includes: [
            'Dato por Consecuencia — sin doble carga',
            'Máquina de Estados para flujos complejos',
            'CRM, Tesorería, Compras integrados',
            'Roles y permisos granulares',
            'Historial completo de cada entidad',
        ],
        detail: 'Neura Core es el corazón operativo. Gestiona clientes, ventas, compras y tesorería con una lógica de "dato por consecuencia": cada acción genera automáticamente los registros derivados, eliminando la doble carga.',
    },
    {
        id: 'insight',
        image: '/neura_insight.png',
        name: 'Neura Insight',
        tagline: 'Motor de Decisión',
        alias: 'El Cerebro',
        pitch: 'Hablále a tu empresa como si fuera una persona. Pregúntale por qué y recibí una respuesta con inteligencia real.',
        color: 'from-orange-500 to-orange-600',
        textColor: 'text-orange-500',
        bgLight: 'bg-orange-50',
        accentBg: 'bg-orange-500',
        pill: 'bg-orange-100 text-orange-600',
        includes: [
            'Análisis conversacional sobre tus datos reales',
            'Responde "¿Por qué?" con contexto e historial',
            'Visualización predictiva en tiempo real',
            'Señales proactivas antes de que el problema explote',
            'Exportación instantánea a cualquier formato',
        ],
        detail: 'Neura Insight le da conciencia a tu operación. Podelé preguntar cualquier cosa, como si tuvieras un analista de datos disponible 24/7 que conoce cada movimiento de tu empresa y te responde en segundos.',
    },
];

export default function ProductsSection() {
    const [openProduct, setOpenProduct] = useState<string | null>(null);
    const activeProduct = products.find(p => p.id === openProduct);

    return (
        <section className="section-padding bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-6"
                >
                    La Solución
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-tight mb-6"
                >
                    La Trilogía <span className="gradient-text">Sinérgica</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-text-secondary max-w-2xl mb-20"
                >
                    Tres motores diseñados para trabajar juntos. Cada uno potente por sí solo, imparables en conjunto.
                </motion.p>

                {/* Product Rows */}
                <div className="space-y-24">
                    {products.map((product, index) => {
                        const isReversed = index % 2 !== 0;
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}
                            >
                                {/* Image */}
                                <div className="w-full md:w-1/2 flex-shrink-0">
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                        className="relative aspect-square flex items-center justify-center"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            width="500"
                                            height="500"
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                        />
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="w-full md:w-1/2">
                                    {/* Pills */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.pill}`}>
                                            {product.tagline}
                                        </span>
                                        <span className="text-xs text-text-secondary font-medium">
                                            "{product.alias}"
                                        </span>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
                                        {product.name}
                                    </h3>

                                    <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                                        {product.pitch}
                                    </p>

                                    {/* Feature list */}
                                    <div className="space-y-3 mb-8">
                                        {product.includes.map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className={`w-5 h-5 rounded-full ${product.accentBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                                    <Check className="w-3 h-3 text-white" />
                                                </div>
                                                <span className="text-text-secondary text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setOpenProduct(product.id)}
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${product.color} text-white font-bold text-sm hover:opacity-90 transition-opacity`}
                                    >
                                        Ver detalles
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Orkesta callout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-24 text-center"
                >
                    <div className="inline-block bg-brand-blue/5 border border-brand-blue/20 rounded-3xl px-10 py-8">
                        <p className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-2">Juntos forman</p>
                        <p className="text-4xl font-display font-bold text-text-primary mb-3">Neura Orkesta</p>
                        <p className="text-text-secondary max-w-md mx-auto">
                            El motor de operaciones completo para tu empresa. Ingesta + Operación + Decisión, todo integrado.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {openProduct && activeProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpenProduct(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${activeProduct.pill} mb-3 inline-block`}>
                                        {activeProduct.tagline}
                                    </span>
                                    <h3 className="text-2xl font-bold text-text-primary">{activeProduct.name}</h3>
                                </div>
                                <button
                                    onClick={() => setOpenProduct(null)}
                                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            <p className="text-text-secondary text-base mb-6 leading-relaxed">{activeProduct.detail}</p>

                            <div className="space-y-3 mb-8">
                                <p className="text-xs font-bold text-text-primary uppercase tracking-widest">Incluye</p>
                                {activeProduct.includes.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`w-5 h-5 rounded-full ${activeProduct.accentBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-text-secondary text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-4 rounded-xl bg-gradient-to-r ${activeProduct.color} text-white font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}>
                                Activar {activeProduct.name}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
