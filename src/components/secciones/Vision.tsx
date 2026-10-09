import Aparece from '../ui/Aparece';
import { useEnPantalla } from '../ui/useEnPantalla';

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

                <Aparece retraso={80} className="mt-10 max-w-3xl lg:mt-14">
                    <p className="bajada mt-0 xl:text-[1.375rem] xl:leading-[1.55]">
                        <span className="font-medium text-ink">
                            Una plataforma de gestión con IA para pequeñas y medianas empresas:
                        </span>{' '}
                        un solo core que conecta la operación de tu empresa.
                    </p>
                </Aparece>

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
                                Por qué Neura
                            </h3>
                            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
                                Las pequeñas y medianas empresas todavía tienen procesos poco digitalizados. Neura
                                existe para{' '}
                                <span className="font-medium text-ink">
                                    digitalizarlos, conectarlos y automatizarlos.
                                </span>
                            </p>
                        </Aparece>

                        <Aparece retraso={120} className="border-t border-line pt-10 md:border-t-0 md:pl-12 md:pt-12">
                            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                                A dónde lleva Neura
                            </h3>
                            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
                                A un producto con el que{' '}
                                <span className="font-medium text-ink">tu empresa se autogestiona.</span>
                            </p>
                        </Aparece>
                    </div>
                </div>
            </div>
        </section>
    );
}
