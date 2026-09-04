import './index.css';
import { lazy, Suspense } from 'react';
import Hero from './components/Hero';

// El Hero es el único eager: es el candidato a LCP y no importa framer-motion,
// así que el chunk de framer queda detrás de este boundary y sale del camino crítico.
const ScrollHeader = lazy(() => import('./components/ScrollHeader'));
const NeuralBackground = lazy(() => import('./components/NeuralBackground'));
const ProblemSection = lazy(() => import('./components/ProblemSection'));
const LayersSection = lazy(() => import('./components/LayersSection'));
const ClientsSection = lazy(() => import('./components/ClientsSection'));
const ChallengeSection = lazy(() => import('./components/ChallengeSection'));
const ModelsSection = lazy(() => import('./components/ModelsSection'));
const IndustriesSection = lazy(() => import('./components/IndustriesSection'));
const WhySection = lazy(() => import('./components/WhySection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const WhatsAppFab = lazy(() => import('./components/WhatsAppFab'));

/**
 * Altura reservada para cada sección lazy mientras baja su chunk.
 * Sin esto el fallback mide 0px, la altura del documento cambia al aterrizar
 * cada chunk y eso rompe el CLS — y en la fase 2 haría saltar las escenas
 * atadas al scroll.
 */
function SectionFallback({ minHeight }: { minHeight: number }) {
    return <div style={{ minHeight }} aria-hidden="true" />;
}

function App() {
    return (
        <div className="min-h-screen bg-white relative">
            <div className="relative z-10">
                <div id="inicio" className="anchor-offset"><Hero /></div>
            </div>

            <Suspense fallback={null}>
                <ScrollHeader />
                <NeuralBackground />
            </Suspense>

            <div className="relative z-10">
                {/* 1. El problema — el dato entra dos veces */}
                <Suspense fallback={<SectionFallback minHeight={1200} />}>
                    <ProblemSection />
                </Suspense>

                {/* 2. Cómo funciona — las 4 capas */}
                <Suspense fallback={<SectionFallback minHeight={2400} />}>
                    <LayersSection />
                </Suspense>

                {/* 3. Clientes — no se renderiza hasta que haya logos o testimonio reales */}
                <Suspense fallback={null}>
                    <ClientsSection />
                </Suspense>

                {/* 4. Desafío 24hs */}
                <Suspense fallback={<SectionFallback minHeight={700} />}>
                    <ChallengeSection />
                </Suspense>

                {/* 5. Cómo trabajamos — modelos y niveles de activación */}
                <Suspense fallback={<SectionFallback minHeight={1400} />}>
                    <ModelsSection />
                </Suspense>

                {/* 6. Para quién — industrias y módulos */}
                <Suspense fallback={<SectionFallback minHeight={1000} />}>
                    <IndustriesSection />
                </Suspense>

                {/* 7. Por qué Neura — razones y quiénes somos */}
                <Suspense fallback={<SectionFallback minHeight={1100} />}>
                    <WhySection />
                </Suspense>

                {/* 8. Contacto — cierre y footer */}
                <Suspense fallback={<SectionFallback minHeight={600} />}>
                    <ContactSection />
                </Suspense>
            </div>

            <Suspense fallback={null}>
                <WhatsAppFab />
            </Suspense>
        </div>
    );
}

export default App;
