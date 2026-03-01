import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const navLinks = [
    { label: '¿Qué es Neura Orkesta?', href: '#vision' },
    { label: 'El Problema', href: '#problema' },
    { label: 'Trilogía', href: '#productos' },
    { label: 'Características', href: '#solucion' },
    { label: 'Abordaje', href: '#fichas' },
];

function scrollTo(id: string) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ScrollHeader() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setIsVisible(latest > window.innerHeight * 0.8);
        });
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollTo('#inicio')}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <img src={logo} alt="Neura Call" className="h-9 w-auto" />
                        <div>
                            <p className="font-display font-bold text-brand-blue text-base leading-none">NEURACALL</p>
                            <p className="text-xs text-text-muted leading-none">Neuracall Orkesta</p>
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
                        <button
                            onClick={() => scrollTo('#contacto')}
                            className="px-5 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark transition-all shadow-sm text-sm"
                        >
                            Contacto
                        </button>
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
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
