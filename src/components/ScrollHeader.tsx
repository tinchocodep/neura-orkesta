import { useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import logo from '../assets/logo-header.png';
import { URL_INGRESAR, WHATSAPP_REUNION } from './contacto';
import { irA } from './navegacion';

const navLinks = [
    { label: 'Qué es', href: '#vision' },
    { label: 'El problema', href: '#problema' },
    { label: 'Tres piezas', href: '#solucion' },
    { label: 'Clientes', href: '#clientes' },
    { label: 'Implementación', href: '#implementacion' },
    { label: 'Neuralite', href: '#neuralite' },
];

export default function ScrollHeader() {
    const [sobreHero, setSobreHero] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const abiertoEn = useRef(0);

    useEffect(() => {
        const medir = () => {
            setSobreHero(window.scrollY < 24);
            // Si con el menú abierto se sigue bajando, se cierra solo: quedaba tapando media pantalla.
            if (Math.abs(window.scrollY - abiertoEn.current) > 48) setMobileOpen(false);
        };
        medir();
        window.addEventListener('scroll', medir, { passive: true });
        return () => window.removeEventListener('scroll', medir);
    }, []);

    const solido = !sobreHero || mobileOpen;

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-50 border-b px-6 text-ink transition-colors duration-300 md:px-12 ${
                solido ? 'border-gray-100 bg-white/95 shadow-sm backdrop-blur-md' : 'border-transparent'
            }`}
        >
            <div className="mx-auto max-w-7xl py-4">
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={() => irA('#inicio')}
                        className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
                    >
                        <img src={logo} alt="" width="36" height="36" className="h-9 w-auto" />
                        <span className="font-display text-xl font-semibold tracking-tight">
                            Neura Or<span className="text-brand-blue">k</span>esta
                        </span>
                    </button>

                    <div className="hidden items-center gap-1 xl:flex">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => irA(link.href)}
                                className="rounded-lg px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-brand-blue/5 hover:text-brand-blue-dark"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href={URL_INGRESAR}
                            className="hidden rounded-lg px-3.5 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-gray-100 sm:inline-flex"
                        >
                            Ingresar
                        </a>
                        <a
                            href={WHATSAPP_REUNION}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Coordinemos una reunión por WhatsApp"
                            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-brand-blue p-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark sm:px-5 sm:py-2.5"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            <span className="hidden sm:inline">Coordinemos una reunión</span>
                        </a>
                        <button
                            className="rounded-lg p-2 transition-colors hover:bg-gray-100 xl:hidden"
                            onClick={() => { abiertoEn.current = window.scrollY; setMobileOpen(!mobileOpen); }}
                            aria-label={mobileOpen ? 'Cerrar el menú' : 'Abrir el menú'}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pb-2 pt-4 xl:hidden">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => { irA(link.href); setMobileOpen(false); }}
                                className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-brand-blue/5 hover:text-brand-blue-dark"
                            >
                                {link.label}
                            </button>
                        ))}
                        <a
                            href={URL_INGRESAR}
                            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-gray-100 sm:hidden"
                        >
                            Ingresar
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}
