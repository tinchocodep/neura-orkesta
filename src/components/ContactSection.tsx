import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const WHATSAPP_URL =
    'https://wa.me/5492622567533?text=Hola%21%20Te%20cuento%20mi%20peor%20proceso%20manual%3A%20';

const NAV_LINKS = [
    { href: '#que-hace', label: 'Qué hace Neura' },
    { href: '#capas', label: 'Cómo funciona' },
    { href: '#industrias', label: '¿Es para vos?' },
    { href: '#modelos', label: 'Cómo trabajamos' },
    { href: '#nosotros', label: 'Por qué Neura' },
];

const CONTACTOS = [
    {
        href: 'mailto:neuracallbot@gmail.com',
        label: 'neuracallbot@gmail.com',
        aria: 'Enviar un mail a NeuraOrkesta',
        Icon: Mail,
    },
    {
        href: 'https://wa.me/5492622567533',
        label: '+54 9 2622 567533',
        aria: 'Llamar o escribir al +54 9 2622 567533',
        Icon: Phone,
    },
    {
        href: 'https://www.instagram.com/neuraorkesta',
        label: 'instagram.com/neuraorkesta',
        aria: 'Instagram de NeuraOrkesta',
        Icon: Instagram,
    },
    {
        href: 'https://www.linkedin.com/company/neuracall',
        label: 'linkedin.com/company/neuracall',
        aria: 'LinkedIn de Neuracall',
        Icon: Linkedin,
    },
];

/* fase 2: el 'dato' que viaja desde el hero aterriza acá y se convierte
   en el globo de WhatsApp del botón. El <span data-motion="globo"> del CTA
   es el destino del morph; no cambiar ese nodo sin avisar. */

export default function ContactSection() {
    return (
        <footer
            id="contacto"
            className="anchor-offset bg-gray-950 text-white"
        >
            <div className="section-padding">
                <div className="max-w-6xl mx-auto">
                    {/* Titular + CTA */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-8"
                    >
                        Contacto
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] max-w-4xl"
                    >
                        Contame tu peor proceso manual.
                        <br className="hidden md:block" />{' '}
                        <span className="text-white/50">
                            Te mostramos cómo lo resolvemos.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 text-xl md:text-2xl text-white/60"
                    >
                        Una charla de 30 minutos. Sin compromiso.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10"
                    >
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-4 px-8 py-5 md:px-10 md:py-6 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-lg md:text-xl rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                        >
                            <span data-motion="globo" className="shrink-0">
                                <svg
                                    className="w-6 h-6 md:w-7 md:h-7"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </span>
                            Escribinos por WhatsApp
                            <ArrowRight
                                className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform"
                                aria-hidden="true"
                            />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ originX: 0 }}
                        className="h-px w-full bg-gradient-to-r from-brand-blue to-transparent mt-16 md:mt-20"
                    />

                    {/* Datos + navegación */}
                    <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_1fr]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-6">
                                Escribinos
                            </h3>
                            <ul className="space-y-4">
                                {CONTACTOS.map(({ href, label, aria, Icon }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={aria}
                                            className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors break-all"
                                        >
                                            <Icon
                                                className="w-5 h-5 shrink-0 text-white/60 group-hover:text-brand-blue transition-colors"
                                                aria-hidden="true"
                                            />
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.nav
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            aria-label="Secciones del sitio"
                        >
                            <h3 className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-6">
                                Recorrido
                            </h3>
                            <ul className="space-y-4">
                                {NAV_LINKS.map(({ href, label }) => (
                                    <li key={href}>
                                        <a
                                            href={href}
                                            className="text-white/60 hover:text-white transition-colors"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.nav>
                    </div>

                    {/* Cierre de marca */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-20 text-3xl md:text-5xl font-display font-bold gradient-text"
                    >
                        Gestioná tu PyME en tiempo real.
                    </motion.p>

                    {/* Legal */}
                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <p className="text-white/60 text-sm">
                            © 2026 NEURACALL S.A. Todos los derechos reservados.
                        </p>
                        <p className="text-white/50 text-sm">
                            NeuraOrkesta se integra al sistema que ya usás.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
