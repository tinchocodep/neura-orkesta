import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo-header.png';

const WHATSAPP_URL =
    'https://wa.me/5492622567533?text=Hola%21%20Me%20interesa%20Neura%20Orkesta%20%F0%9F%9A%80';

const navLinks = [
    { label: 'El problema', href: '#problema' },
    { label: 'Cómo funciona', href: '#capas' },
    { label: 'Para quién', href: '#industrias' },
    { label: 'Cómo trabajamos', href: '#modelos' },
];

function scrollTo(id: string) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ScrollHeader() {
    const { scrollY } = useScroll();
    const [isCompact, setIsCompact] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // El header está visible desde el scroll 0: el CTA no puede depender de que
    // el visitante baje una pantalla entera. Al scrollear sólo se compacta.
    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setIsCompact(latest > 24);
        });
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
                isCompact
                    ? 'bg-white/95 border-b border-gray-100 shadow-sm py-2'
                    : 'bg-white/80 border-b border-transparent py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollTo('#inicio')}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <img src={logo} alt="NeuraOrkesta" width="36" height="36" className="h-9 w-auto" />
                        <div className="text-left">
                            <p className="font-display font-bold text-brand-blue text-base leading-none">NEURAORKESTA</p>
                            <p className="text-xs text-text-muted leading-none">Tu PyME, en tiempo real</p>
                        </div>
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollTo(link.href)}
                                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* CTA + Mobile toggle */}
                    <div className="flex items-center gap-3">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark transition-all shadow-sm text-sm whitespace-nowrap"
                        >
                            Escribinos
                        </a>
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden pt-4 pb-2 border-t border-gray-100 mt-4 flex flex-col gap-1"
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => { scrollTo(link.href); setMobileOpen(false); }}
                                className="text-left px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all"
                            >
                                {link.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
