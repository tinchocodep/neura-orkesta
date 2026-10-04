import Aparece from '../ui/Aparece';
import { useEnPantalla } from '../ui/useEnPantalla';

const palabras = ['Pymes', 'Software que se adapta', 'IA'];

const trazo = 'transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

export default function Vision() {
    const { ref, enPantalla } = useEnPantalla<HTMLDivElement>(0.2);

    return (
        <section id="vision" aria-labelledby="vision-titulo" className="seccion seccion-clara">
            <div className="contenedor">
                <Aparece>
                    <p className="sobretitulo">¿Qué es Neura Orkesta?</p>
                    <h2
                        id="vision-titulo"
                        className="titulo-seccion text-[clamp(2.125rem,10.2vw,2.5rem)] leading-[1.02] [text-wrap:balance] sm:text-5xl sm:leading-[1.02] lg:text-[clamp(3.5rem,5vw,4.5rem)]"
                    >
                        <span className="block">Automatizamos lo ordinario</span>{' '}
                        <span className="block text-brand-blue">para que hagas lo extraordinario.</span>
                    </h2>
                </Aparece>

                <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-0">
                    <Aparece retraso={80} className="lg:pr-12">
                        <p className="bajada mt-0 xl:text-[1.375rem] xl:leading-[1.55]">
                            <span className="font-medium text-ink">
                                Una plataforma de gestión con IA para pymes argentinas:
                            </span>{' '}
                            un solo core que conecta la operación de cada rubro, como la obra, el viaje, el contrato,
                            el pedido o el turno, con lo que es igual para todos: comprobantes, caja, banco, cobros y
                            pagos, y la gente.
                        </p>
                    </Aparece>

                    <Aparece retraso={160} className="lg:pl-12">
                        <ul aria-label="En tres palabras" className="border-t border-line">
                            {palabras.map((palabra, i) => (
                                <li
                                    key={palabra}
                                    className="flex items-baseline gap-5 border-b border-line py-4 last:border-b-0 lg:last:border-b"
                                >
                                    <span
                                        className="text-xs font-medium tabular-nums tracking-[0.2em] text-brand-blue-dark"
                                        aria-hidden="true"
                                    >
                                        0{i + 1}
                                    </span>
                                    <span className="font-display text-2xl font-semibold tracking-[-0.02em]">
                                        {palabra}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Aparece>
                </div>

                <div ref={ref} className="mt-8 lg:mt-20">
                    <span
                        className={`block h-px origin-left bg-line duration-1000 ${trazo} ${enPantalla ? 'scale-x-100' : 'scale-x-0'}`}
                        aria-hidden="true"
                    />

                    <div className="relative grid md:grid-cols-2">
                        <span
                            className={`absolute bottom-0 left-1/2 top-12 hidden w-px origin-top bg-line delay-300 duration-700 md:block ${trazo} ${enPantalla ? 'scale-y-100' : 'scale-y-0'}`}
                            aria-hidden="true"
                        />

                        <Aparece className="py-10 md:pb-0 md:pr-12 md:pt-12">
                            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                                Por qué existimos
                            </h3>
                            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
                                Las pymes todavía tienen procesos poco digitalizados. Existimos para automatizar lo
                                ordinario, con software que se adapta a la empresa y con la IA como una nueva forma de
                                construirlo e implementarlo.
                            </p>
                        </Aparece>

                        <Aparece retraso={120} className="border-t border-line pt-10 md:border-t-0 md:pl-12 md:pt-12">
                            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                                Hacia dónde vamos
                            </h3>
                            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
                                Un solo core para muchas pymes y muchos rubros. Neura construye una vez y reutiliza
                                muchas, y cada cliente siente una solución propia.{' '}
                                <span className="mt-3 block font-medium text-ink [text-wrap:balance]">
                                    La meta: que una pyme cuente lo que le pasa y reciba su Neura armado.
                                </span>
                            </p>
                        </Aparece>
                    </div>
                </div>
            </div>
        </section>
    );
}
