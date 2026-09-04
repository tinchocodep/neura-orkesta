import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   TODO — CONTENIDO PENDIENTE DEL CLIENTE (bloquea la publicación de esta sección)

   Esta sección está maquetada pero VACÍA A PROPÓSITO. No hay ningún nombre,
   logo ni testimonio real todavía. Falta que el cliente mande:

     1. Los logos (SVG o PNG con fondo transparente, alto útil ~40px) y el
        nombre de cada empresa que autorizó aparecer.
     2. Un testimonio con cita textual + nombre, cargo y empresa de quien lo dijo.

   PARA CARGARLO NO HAY QUE TOCAR EL JSX: se cambian las dos constantes de acá
   abajo (`clientes` y `testimonio`) y la sección se reconfigura sola —
   los placeholders desaparecen en cuanto los campos dejan de estar en null.

     - Poné los archivos en `public/logos/` y referencialos como '/logos/x.svg'.
     - Un slot con `logo: null` sigue mostrando el placeholder "Logo cliente";
       borrá los slots que sobren si al final son menos de 6.
     - Mientras `testimonio.cita` sea null, el bloque se muestra con borde
       punteado y texto entre corchetes para que sea imposible confundirlo
       con un testimonio real si esto se publicara por accidente.

   NO inventar nombres, logos, cantidades de clientes ni citas. Si el cliente
   no manda nada, esta sección no se publica.
   ═══════════════════════════════════════════════════════════════════════════ */

type Cliente = {
    /** Nombre de la empresa. Se usa como alt del logo. */
    nombre: string | null;
    /** Ruta al archivo dentro de /public, ej: '/logos/empresa.svg' */
    logo: string | null;
};

type Testimonio = {
    cita: string | null;
    nombre: string | null;
    cargo: string | null;
    empresa: string | null;
};

// ── REEMPLAZAR ACÁ (1 de 2): los logos ──────────────────────────────────────
const clientes: Cliente[] = [
    { nombre: null, logo: null },
    { nombre: null, logo: null },
    { nombre: null, logo: null },
    { nombre: null, logo: null },
    { nombre: null, logo: null },
    { nombre: null, logo: null },
];

// ── REEMPLAZAR ACÁ (2 de 2): el testimonio ──────────────────────────────────
const testimonio: Testimonio = {
    cita: null,
    nombre: null,
    cargo: null,
    empresa: null,
};

const WHATSAPP_CLIENTES =
    'https://wa.me/5492622567533?text=Hola%21%20Quiero%20saber%20c%C3%B3mo%20Neura%20se%20integra%20a%20mi%20sistema';

export default function ClientsSection() {
    const logosPendientes = clientes.every((cliente) => !cliente.logo);
    const testimonioPendiente = !testimonio.cita;

    // Mientras no haya NADA real, la sección no se renderiza. El copy afirma en
    // pasado que hay empresas operando con Neura; publicarlo sobre placeholders
    // vacíos sería inventar prueba social. Con un solo logo o una sola cita, aparece.
    if (logosPendientes && testimonioPendiente) return null;

    return (
        <section
            id="clientes"
            className="anchor-offset section-padding bg-light-secondary"
        >
            <div className="max-w-6xl mx-auto">

                {/* ── Encabezado ─────────────────────────────────────────── */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-4"
                >
                    Clientes
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight mb-6"
                >
                    Empresas que ya operan con Neura.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12 md:mb-16"
                >
                    Cada una siguió trabajando con el sistema que ya tenía. Neura se integró
                    al lado y les sacó de encima el trabajo de reformatear el dato.
                </motion.p>

                {/* ── Grilla de logos ────────────────────────────────────────
                    Contenedor con hairlines: el fondo gris se ve sólo en el gap de 1px,
                    así los slots vacíos se leen como una tabla prolija y no como
                    cajas grises flotando.
                    fase 2: acá va el PULSO recorriendo la fila de logos. */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden"
                >
                    {clientes.map((cliente, index) => (
                        <div
                            key={index}
                            className="bg-white flex items-center justify-center min-h-[120px] md:min-h-[140px] px-6 py-8"
                        >
                            {cliente.logo ? (
                                <img
                                    src={cliente.logo}
                                    alt={cliente.nombre ?? ''}
                                    loading="lazy"
                                    decoding="async"
                                    className="max-h-10 md:max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                                />
                            ) : (
                                /* TODO: reemplazar con asset real (ver bloque de arriba) */
                                <span
                                    aria-hidden="true"
                                    className="select-none text-[11px] uppercase tracking-[0.22em] text-gray-300"
                                >
                                    Logo cliente
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>

                {logosPendientes && (
                    <p className="mt-4 text-sm text-text-muted font-mono">
                        [Logos pendientes de envío del cliente]
                    </p>
                )}

                {/* ── Testimonio destacado ───────────────────────────────── */}
                <motion.figure
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className={`mt-12 md:mt-16 rounded-2xl bg-white p-8 md:p-12 lg:p-14 ${
                        testimonioPendiente
                            ? 'border border-dashed border-gray-300'
                            : 'border border-gray-100 shadow-soft'
                    }`}
                >
                    <Quote
                        aria-hidden="true"
                        className={`w-9 h-9 md:w-10 md:h-10 mb-6 ${
                            testimonioPendiente ? 'text-gray-200' : 'text-brand-blue'
                        }`}
                    />

                    <blockquote
                        className={`font-display font-semibold leading-snug max-w-4xl ${
                            testimonioPendiente
                                ? 'text-2xl md:text-3xl text-gray-300 font-mono font-normal tracking-tight'
                                : 'text-2xl md:text-3xl lg:text-4xl text-text-primary'
                        }`}
                    >
                        {testimonio.cita ?? '[Testimonio pendiente]'}
                    </blockquote>

                    <figcaption className="mt-8 flex items-center gap-4">
                        {/* Avatar: placeholder neutro hasta que haya foto real.
                            TODO: reemplazar con asset real si el cliente manda foto. */}
                        <div
                            aria-hidden="true"
                            className={`w-12 h-12 rounded-full flex-shrink-0 ${
                                testimonioPendiente
                                    ? 'border border-dashed border-gray-300'
                                    : 'bg-brand-blue/10'
                            }`}
                        />

                        <div className="min-w-0">
                            {testimonioPendiente ? (
                                <p className="text-sm md:text-base font-mono text-gray-400 break-words">
                                    [Nombre] · [Cargo] · [Empresa]
                                </p>
                            ) : (
                                <>
                                    <p className="text-base font-semibold text-text-primary">
                                        {testimonio.nombre}
                                    </p>
                                    <p className="text-sm text-text-muted">
                                        {testimonio.cargo} · {testimonio.empresa}
                                    </p>
                                </>
                            )}
                        </div>
                    </figcaption>
                </motion.figure>

                {/* ── Cierre discreto: zona de credibilidad, nada de botón grande ── */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="mt-10 text-base text-text-secondary"
                >
                    Contanos cómo trabajás hoy y te mostramos qué cambia.{' '}
                    <a
                        href={WHATSAPP_CLIENTES}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue font-semibold underline underline-offset-4 decoration-brand-blue/30 hover:decoration-brand-blue transition-colors"
                    >
                        Escribinos por WhatsApp →
                    </a>
                </motion.p>

            </div>
        </section>
    );
}
