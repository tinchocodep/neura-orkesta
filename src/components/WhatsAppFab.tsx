import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// CTA primario único de la página. El mensaje arranca la conversación por el
// lado del posicionamiento: Neura se integra al sistema que la empresa ya usa.
const WHATSAPP_URL =
    'https://wa.me/5492622567533?text=Hola%21%20Quiero%20saber%20c%C3%B3mo%20Neura%20se%20integra%20a%20mi%20sistema';

export default function WhatsAppFab() {
    const [pastHero, setPastHero] = useState(false);
    const [contactoVisible, setContactoVisible] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    // prefers-reduced-motion: sin movimiento, pero el botón sigue existiendo.
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReducedMotion(media.matches);
        sync();
        media.addEventListener('change', sync);
        return () => media.removeEventListener('change', sync);
    }, []);

    // Aparece recién después del hero: ahí abajo el visitante ya no tiene los
    // CTAs de la primera pantalla a mano.
    useEffect(() => {
        const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Se esconde cuando el contacto entra en viewport, para no taparlo.
    // #contacto vive en un chunk lazy, así que puede no existir al montar:
    // esperamos con un MutationObserver y recién ahí observamos.
    useEffect(() => {
        let intersection: IntersectionObserver | null = null;
        let mutation: MutationObserver | null = null;

        const attach = () => {
            const target = document.getElementById('contacto');
            if (!target) return false;
            intersection = new IntersectionObserver(
                ([entry]) => setContactoVisible(entry.isIntersecting),
                { threshold: 0 }
            );
            intersection.observe(target);
            return true;
        };

        if (!attach()) {
            mutation = new MutationObserver(() => {
                if (attach()) {
                    mutation?.disconnect();
                    mutation = null;
                }
            });
            mutation.observe(document.body, { childList: true, subtree: true });
        }

        return () => {
            intersection?.disconnect();
            mutation?.disconnect();
        };
    }, []);

    const visible = pastHero && !contactoVisible;

    return (
        <AnimatePresence>
            {visible && (
                <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escribinos por WhatsApp"
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
                    animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
                    transition={
                        reducedMotion
                            ? { duration: 0 }
                            : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
                    }
                    whileHover={reducedMotion ? undefined : { scale: 1.06 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                    style={{
                        right: 'calc(1rem + env(safe-area-inset-right))',
                        bottom: 'calc(1rem + env(safe-area-inset-bottom))',
                    }}
                    className="fixed z-40 flex h-14 w-14 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#1EBE5A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40 md:h-16 md:w-16"
                >
                    {/* Mismo SVG escrito a mano que ya usa el Footer, no lucide */}
                    <svg
                        className="h-7 w-7 md:h-8 md:w-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </motion.a>
            )}
        </AnimatePresence>
    );
}
