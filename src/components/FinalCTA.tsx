import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
    return (
        <section className="section-padding bg-gray-950 text-white">
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-8"
                >
                    Desafío 24hs
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8"
                >
                    Operativo<br />mañana.
                </motion.h2>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ originX: 0 }}
                    className="h-px w-full bg-gradient-to-r from-brand-blue to-transparent mb-12"
                />

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/50 max-w-xl"
                    >
                        Despliegue inmediato. Sin implementaciones eternas. Sin permanencia.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="group px-8 py-4 bg-brand-blue text-white font-bold text-lg rounded-xl flex items-center gap-3 hover:bg-brand-blue-dark transition-colors"
                        >
                            Agendar Demo
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                    </motion.div>
                </div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 flex flex-wrap gap-8 text-white/30 text-sm"
                >
                    <span>✓ Setup 24hs</span>
                    <span>✓ Soporte 24/7</span>
                    <span>✓ Sin permanencia</span>
                </motion.div>
            </div>
        </section>
    );
}
