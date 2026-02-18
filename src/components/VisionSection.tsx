import { motion } from 'framer-motion';

export default function VisionSection() {
    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
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
                    className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed mb-12"
                >
                    Imaginá que Neura Orkesta es una capa invisible que le ponemos arriba a tu empresa. Vos seguís trabajando, pero nadie tiene que cargar datos a mano nunca más. Todo lo que pasa en la calle, en el depósito o en la venta, <strong>se anota solo en el sistema.</strong>
                </motion.p>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ originX: 0 }}
                    className="h-px w-full bg-gradient-to-r from-brand-blue to-transparent mb-12"
                />

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Sin silos de información</h3>
                        <p className="text-gray-600">
                            La información fluye libremente entre áreas. Ventas sabe lo que hace Logística, y Finanzas lo ve todo en tiempo real.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Tecnología invisible</h3>
                        <p className="text-gray-600">
                            La mejor tecnología es la que no se nota. Orkesta está ahí, orquestando todo, sin interrumpir tu flujo de trabajo.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
