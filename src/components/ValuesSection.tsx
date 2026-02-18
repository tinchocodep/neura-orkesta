import { motion } from 'framer-motion';
import { Zap, Clock, Puzzle, Shield, Heart } from 'lucide-react';

const values = [
    {
        number: '01',
        icon: Zap,
        title: 'Pragmatismo Radical',
        description: 'Preferimos soluciones simples que funcionen hoy ("Desafío 24hs") antes que perfecciones teóricas que tarden meses. La velocidad es nuestra ventaja.',
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-500/10',
    },
    {
        number: '02',
        icon: Clock,
        title: 'Obsesión por la Eficiencia',
        description: 'No toleramos el desperdicio de tiempo humano. Si una tarea se puede automatizar, es nuestro mandato hacerlo. Medimos nuestro éxito en horas-hombre liberadas.',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-500/10',
    },
    {
        number: '03',
        icon: Puzzle,
        title: 'Flexibilidad Modular',
        subtitle: '"Fichas"',
        description: 'Creemos en crecer con el cliente. No imponemos estructuras rígidas; ofrecemos un ecosistema vivo que se adapta a la madurez de cada empresa.',
        color: 'from-violet-500 to-purple-500',
        bgColor: 'bg-violet-500/10',
    },
    {
        number: '04',
        icon: Shield,
        title: 'Verdad Operativa',
        description: 'No vendemos humo tecnológico ni palabras de moda. Entregamos herramientas que resuelven dolores reales (caja, stock, logística) desde el primer minuto.',
        color: 'from-emerald-500 to-green-500',
        bgColor: 'bg-emerald-500/10',
    },
    {
        number: '05',
        icon: Heart,
        title: 'Empatía con el Hacedor',
        description: 'Diseñamos pensando en el que está en la trinchera (el chofer, el vendedor, el dueño), eliminando fricción para que su trabajo fluya, no para complicarlo.',
        color: 'from-rose-500 to-pink-500',
        bgColor: 'bg-rose-500/10',
    },
];

export default function ValuesSection() {
    return (
        <section className="section-padding bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-4"
                >
                    Nuestro ADN
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight mb-6"
                >
                    Nuestros <span className="gradient-text">Valores</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-500 max-w-2xl mb-16"
                >
                    Estos son los principios innegociables que nos definen como equipo y como producto.
                </motion.p>

                {/* Values — numbered list with icons */}
                <div className="space-y-0">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex items-start gap-6 md:gap-8 py-8 md:py-10 border-t border-gray-100 last:border-b hover:bg-gray-50/50 transition-colors duration-300 -mx-4 px-4 rounded-xl"
                            >
                                {/* Number + Icon */}
                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <span className="text-brand-blue font-mono text-sm font-bold mt-0.5">{value.number}</span>
                                    <div className={`w-10 h-10 ${value.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-5 h-5 text-gray-700" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-1.5">
                                        {value.title}
                                        {value.subtitle && (
                                            <span className="text-brand-blue ml-2 text-lg font-semibold">{value.subtitle}</span>
                                        )}
                                    </h3>
                                    <p className="text-text-secondary text-base md:text-lg leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12"
                >
                    <p className="text-2xl md:text-3xl font-semibold text-white max-w-3xl leading-relaxed">
                        Trabajamos con el mandato innegociable de <span className="text-brand-blue">eliminar la esclavitud operativa</span> y liberar el talento humano.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
