import { motion } from 'framer-motion';
import heroCore from '../assets/hero-core.png';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, rgba(65, 105, 225, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto section-padding">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="inline-block"
                        >
                            <span className="text-brand-blue font-semibold text-lg">NEURACALL ORKESTA</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-display font-bold leading-tight text-text-primary"
                        >
                            Tu empresa,
                            <br />
                            <span className="gradient-text">operando en</span>
                            <br />
                            tiempo real.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl md:text-2xl text-text-secondary leading-relaxed"
                        >
                            No somos un software más. Somos el <span className="text-brand-blue font-semibold">sistema operativo</span> que elimina el trabajo manual.
                            <br />
                            <span className="font-semibold text-text-primary">Empezá con lo básico, escalá al control total.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex gap-4"
                        >
                            <button className="btn-primary text-lg">
                                Aceptá el Desafío 24hs
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right: 3D Core Chip Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="relative"
                    >
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative"
                        >
                            <img
                                src={heroCore}
                                alt="Neuracall Core"
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-brand-blue rounded-full flex justify-center pt-2"
                >
                    <div className="w-1 h-2 bg-brand-blue rounded-full"></div>
                </motion.div>
            </motion.div>
        </section>
    );
}
