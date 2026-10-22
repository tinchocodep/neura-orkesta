import { Instagram, Linkedin, Mail, MessageCircle, type LucideIcon } from 'lucide-react';
import { WHATSAPP_REUNION } from '../contacto';
import Aparece from '../ui/Aparece';
import { useEnPantalla } from '../ui/useEnPantalla';

const enlaces: { nombre: string; href: string; externo: boolean; Icono: LucideIcon }[] = [
    { nombre: 'WhatsApp', href: 'https://wa.me/5492622567533', externo: true, Icono: MessageCircle },
    { nombre: 'Instagram', href: 'https://www.instagram.com/neuraorkesta', externo: true, Icono: Instagram },
    { nombre: 'LinkedIn', href: 'https://www.linkedin.com/company/neuraorkesta/', externo: true, Icono: Linkedin },
    { nombre: 'Mail', href: 'mailto:martincabrera@neuraorkesta.com', externo: false, Icono: Mail },
];

// El render trae su propio fondo, un piso con reflejos y una bruma clara en una esquina. La
// máscara llega a cero en los cuatro bordes y «lighten» deja pasar sólo lo que brilla más que
// la sección: así no se nota el rectángulo. Mezcla, máscara y opacidad van en el <img>; un
// envoltorio con transform u opacidad aislaría la mezcla y volvería a verse el recuadro.
const mascaraAnillos =
    'radial-gradient(ellipse 50% 46% at 50% 46%, black 46%, rgba(0, 0, 0, 0.72) 76%, transparent 100%)';

function Anillos() {
    const { ref, enPantalla } = useEnPantalla<HTMLImageElement>(0.2);

    return (
        <img
            ref={ref}
            src="/secciones/cierre/anillos.webp"
            alt=""
            aria-hidden="true"
            width="850"
            height="752"
            loading="lazy"
            decoding="async"
            className={`pointer-events-none mx-auto -mt-10 mb-6 w-[min(100%,23rem)] select-none mix-blend-lighten transition-opacity duration-[1600ms] ease-out motion-reduce:transition-none lg:absolute lg:-right-[min(7rem,max(4.5rem,50vw-38.5rem))] lg:top-1/2 lg:m-0 lg:w-[min(45vw,40rem)] lg:-translate-y-1/2 ${
                enPantalla ? 'opacity-80' : 'opacity-0'
            }`}
            style={{ maskImage: mascaraAnillos, WebkitMaskImage: mascaraAnillos }}
        />
    );
}

function Pie() {
    return (
        <footer className="bg-night px-6 text-on-night md:px-12">
            <div className="contenedor flex flex-col gap-7 border-t border-night-line py-9 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
                <p className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight">
                        Neura Or<span className="text-brand-blue-light">k</span>esta
                    </span>
                    <span className="text-sm text-on-night-soft">Tu pyme, en tiempo real con IA</span>
                </p>

                <nav aria-label="Contacto y redes">
                    {/* En el celular, dos por fila y del mismo ancho: sueltos quedaban tres arriba y uno solo abajo. */}
                    <ul className="grid grid-cols-2 gap-2.5 text-sm font-medium sm:flex sm:flex-wrap">
                        {enlaces.map(({ nombre, href, externo, Icono }) => (
                            <li key={nombre}>
                                <a
                                    href={href}
                                    target={externo ? '_blank' : undefined}
                                    rel={externo ? 'noopener noreferrer' : undefined}
                                    className="flex min-h-12 items-center gap-3 rounded-xl border border-night-line bg-night-soft px-4 text-on-night transition-colors duration-200 hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-light sm:min-h-11 sm:rounded-full"
                                >
                                    <Icono
                                        className="h-[1.125rem] w-[1.125rem] shrink-0 text-brand-blue-light"
                                        strokeWidth={1.75}
                                        aria-hidden="true"
                                    />
                                    {nombre}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <p className="text-sm text-on-night-soft">© 2026 Neura Orkesta S.A.</p>
            </div>
        </footer>
    );
}

export default function Cierre() {
    return (
        <>
            <section
                id="contacto"
                aria-labelledby="cierre-titulo"
                className="seccion seccion-oscura isolate overflow-hidden lg:py-36"
            >
                <div className="contenedor relative">
                    <Anillos />

                    <div className="relative z-10 lg:max-w-[52rem]">
                        <Aparece>
                            {/* Verde como en la hoja de cierre del deck; el «!» le gana a «.seccion-oscura .sobretitulo». */}
                            <p className="sobretitulo !text-ok">El próximo paso</p>
                            <h2
                                id="cierre-titulo"
                                className="titulo-seccion text-[2.75rem] leading-none [text-wrap:balance] sm:text-[3.25rem] sm:leading-none lg:text-[clamp(3.2rem,5vw,4.5rem)]"
                            >
                                <span className="block">¿Qué proceso te gustaría</span>{' '}
                                <span className="block text-brand-blue-light">automatizar con Neura?</span>
                            </h2>
                        </Aparece>

                        <Aparece retraso={100}>
                            <figure className="mt-10 flex items-center gap-4 lg:mt-12">
                                <span
                                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-night-line bg-night-soft"
                                    aria-hidden="true"
                                >
                                    <img
                                        src="/secciones/cierre/logo-blanco.svg"
                                        alt=""
                                        width="20"
                                        height="24"
                                        loading="lazy"
                                        decoding="async"
                                        className="h-6 w-auto"
                                    />
                                </span>
                                <div>
                                    <blockquote className="text-xl leading-snug sm:text-2xl lg:text-xl xl:text-2xl">
                                        “Transformo horas de tu operación en minutos.”
                                    </blockquote>
                                    <figcaption className="mt-1.5 text-sm font-medium text-on-night-soft">
                                        — Neura
                                    </figcaption>
                                </div>
                            </figure>
                        </Aparece>

                        <Aparece retraso={200} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a
                                href={WHATSAPP_REUNION}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="boton-primario focus-visible:outline-brand-blue-light"
                            >
                                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                                Coordinemos una reunión
                            </a>
                            <a href="#neuralite" className="boton-secundario">
                                Dejanos tu contacto
                            </a>
                        </Aparece>
                    </div>
                </div>
            </section>

            <Pie />
        </>
    );
}
