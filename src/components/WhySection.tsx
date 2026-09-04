import { motion } from 'framer-motion';
import { Clock, Plug, Blocks, Sparkles, Unlock, MapPin } from 'lucide-react';

const WHATSAPP_URL =
    'https://wa.me/5492622567533?text=Hola%21%20Le%C3%AD%20las%20seis%20razones%20y%20quiero%20saber%20c%C3%B3mo%20Neura%20se%20integra%20a%20mi%20sistema';

const reasons = [
    {
        icon: Clock,
        title: 'Implementación en 24hs',
        description: 'No meses de proyecto. Empezás a operar al día siguiente.',
    },
    {
        icon: Plug,
        title: 'Se conecta a lo que ya tenés',
        description: 'Excel, Drive, tu ERP, tu sistema contable, tu banco. No los reemplazamos: los conectamos y les mandamos los datos ya formateados.',
    },
    {
        icon: Blocks,
        title: 'Modular y flexible',
        description: 'Pagás por lo que usás. Sumás funciones cuando las necesitás.',
    },
    {
        icon: Sparkles,
        title: 'IA en el centro',
        description: 'No es un slogan: la IA trabaja en cada registro automático.',
    },
    {
        icon: Unlock,
        title: 'Sin permanencia obligatoria',
        description: 'Nos ganamos tu confianza mes a mes, no con contratos.',
    },
    {
        icon: MapPin,
        title: 'Equipo local que entiende tu negocio',
        description: 'Trabajamos con la realidad argentina: ARCA, SIPER y bancos locales.',
    },
];

const values = [
    {
        number: '01',
        title: 'Pragmatismo Radical',
        description: 'Soluciones simples que funcionan hoy antes que perfecciones que tardan meses.',
    },
    {
        number: '02',
        title: 'Pasión por la Eficiencia',
        description: 'Si una tarea se puede automatizar, la automatizamos. Medimos horas liberadas.',
    },
    {
        number: '03',
        title: 'Flexibilidad Infinita',
        description: 'No imponemos estructuras rígidas: nos adaptamos a la madurez de cada empresa.',
    },
    {
        number: '04',
        title: 'Resultados Reales',
        description: 'Nada de humo: caja, stock y logística resueltos desde el primer minuto.',
    },
    {
        number: '05',
        title: 'Somos Hacedores',
        description: 'Diseñamos para el que está en el día a día: el chofer, el vendedor, el dueño.',
    },
];

export default function WhySection() {
    return (
        <section id="nosotros" className="anchor-offset section-padding bg-light-secondary">
            {/* fase 2: el revelado por barrido diagonal entra sobre esta misma estructura de filas */}
            <div className="max-w-5xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-4"
                >
                    Por qué Neura
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight mb-12 md:mb-16"
                >
                    Seis razones, <span className="gradient-text">ninguna es un slogan.</span>
                </motion.h2>

                {/* Las seis razones — lista tipográfica con hairlines, no grilla de tarjetas */}
                <div className="border-b border-gray-200">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.06 }}
                                className="grid md:grid-cols-12 gap-x-8 gap-y-1 items-start py-5 md:py-6 border-t border-gray-200"
                            >
                                <div className="md:col-span-5 flex items-start gap-3">
                                    <Icon className="w-4 h-4 mt-1.5 shrink-0 text-brand-blue" aria-hidden="true" />
                                    <h3 className="text-lg md:text-xl font-semibold text-text-primary leading-snug">
                                        {reason.title}
                                    </h3>
                                </div>
                                <p className="md:col-span-7 pl-7 md:pl-0 text-base md:text-lg text-text-secondary leading-relaxed">
                                    {reason.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-8"
                >
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-blue-dark transition-colors duration-200"
                    >
                        Escribinos y te contamos cómo se conecta a tu sistema
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </motion.div>

                {/* Quiénes somos — franja compacta: presente, no protagonista */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 md:mt-24 bg-white rounded-2xl p-6 md:p-10"
                >
                    <p className="text-text-muted font-semibold text-xs tracking-widest uppercase mb-4">
                        Quiénes somos
                    </p>

                    <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary leading-snug max-w-3xl">
                        Automatizar lo ordinario para que las personas se dediquen a lo extraordinario.
                    </h3>

                    <p className="mt-3 text-base md:text-lg text-text-secondary max-w-3xl">
                        Ser el motor de operaciones de las empresas que eligen competir con tecnología.
                    </p>

                    {/* ADN — lista numerada compacta */}
                    <dl className="mt-8 border-t border-gray-200">
                        {values.map((value) => (
                            <div
                                key={value.number}
                                className="flex flex-col md:flex-row md:items-baseline gap-x-4 gap-y-0.5 py-3 border-b border-gray-200"
                            >
                                <dt className="flex items-baseline gap-3 md:w-64 md:shrink-0">
                                    <span className="font-mono text-xs font-bold text-brand-blue tabular-nums">
                                        {value.number}
                                    </span>
                                    <span className="text-base font-semibold text-text-primary">{value.title}</span>
                                </dt>
                                <dd className="pl-7 md:pl-0 text-sm md:text-base text-text-secondary leading-relaxed">
                                    {value.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </motion.div>
            </div>
        </section>
    );
}
