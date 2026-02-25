import { motion } from 'framer-motion';
import { Eye, Rocket } from 'lucide-react';

export default function VisionSection() {
    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-4"
                >
                    ¿Qué es Neura Orkesta?
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-8"
                >
                    Automatizamos lo ordinario <br />
                    <span className="text-brand-blue">para que hagas lo extraordinario.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed mb-16"
                >
                    Imaginá que Neura Orkesta es una capa invisible que envuelve toda tu empresa. Tu equipo sigue operando como siempre, pero nadie tiene que cargar datos a mano nunca más. Todo lo que pasa en la calle, en el depósito o en la venta, <strong>queda sincronizado en tiempo real.</strong>
                </motion.p>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ originX: 0 }}
                    className="h-px w-full bg-gradient-to-r from-brand-blue to-transparent mb-16"
                />

                {/* Visión y Misión Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Visión */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-blue-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                        <div className="relative bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:border-brand-blue/30 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-brand-blue" />
                                </div>
                                <p className="text-brand-blue font-bold text-xs tracking-widest uppercase">Nuestra Visión</p>
                            </div>

                            <p className="text-gray-600 text-base leading-relaxed">
                                "Ser el motor de operaciones estándar de las empresas en crecimiento, creando un futuro donde la carga manual de datos sea obsoleta y el talento humano se dedique exclusivamente a la <strong className="text-gray-900">creatividad y la estrategia</strong>."
                            </p>
                        </div>
                    </motion.div>

                    {/* Misión */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-blue-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                        <div className="relative bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:border-brand-blue/30 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                                    <Rocket className="w-5 h-5 text-brand-blue" />
                                </div>
                                <p className="text-brand-blue font-bold text-xs tracking-widest uppercase">Nuestra Misión</p>
                            </div>

                            <p className="text-gray-600 text-base leading-relaxed">
                                "Liberar a las PyMEs de la parálisis operativa, automatizando lo ordinario mediante una arquitectura tecnológica <strong className="text-gray-900">modular y accesible</strong> que transforma el caos manual en eficiencia autónoma inmediata."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
