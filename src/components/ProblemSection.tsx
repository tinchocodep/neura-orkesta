import { motion } from 'framer-motion';



export default function ProblemSection() {
    return (
        <section className="section-padding bg-gray-950 text-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-red-400 font-semibold text-sm tracking-widest uppercase mb-8"
                >
                    El Problema
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-16"
                >
                    El <span className="text-red-400">Caos Manual</span>
                </motion.h2>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ originX: 0 }}
                    className="h-px w-full bg-gradient-to-r from-red-500 to-transparent mb-16"
                />



                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-white/50 max-w-3xl"
                >
                    Las empresas enfrentan cada día más dificultad para conseguir personas dispuestas a hacer tareas repetitivas — y las que las hacen, <span className="text-white/80">desperdician su talento</span> en trabajo que podría automatizarse.
                </motion.p>
            </div>
        </section>
    );
}
