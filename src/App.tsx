import './index.css';
import { lazy, Suspense, useCallback, useState, type ReactNode } from 'react';
import Hero from './components/Hero';
import ScrollHeader from './components/ScrollHeader';

// Lazy load everything below the fold for faster LCP
const VideoWidget = lazy(() => import('./components/VideoWidget'));
const NeuralBackground = lazy(() => import('./components/NeuralBackground'));
const VisionSection = lazy(() => import('./components/VisionSection'));
const ProblemSection = lazy(() => import('./components/ProblemSection'));
const SolutionSection = lazy(() => import('./components/SolutionSection'));
const ProductsSection = lazy(() => import('./components/ProductsSection'));
const FichasSection = lazy(() => import('./components/FichasSection'));
const ValuesSection = lazy(() => import('./components/ValuesSection'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const Footer = lazy(() => import('./components/Footer'));

// El ancla existe desde el primer pintado aunque su sección todavía esté bajando:
// así el menú y los links del hero siempre tienen adónde ir.
function Seccion({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id}>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}

function App() {
  const [videoAbierto, setVideoAbierto] = useState(false);
  const abrirVideo = useCallback(() => setVideoAbierto(true), []);
  const cerrarVideo = useCallback(() => setVideoAbierto(false), []);

  return (
    <div className="min-h-screen bg-white relative">
      <ScrollHeader />

      {/* Hero loads immediately for fast LCP */}
      <div className="relative z-10">
        <div id="inicio"><Hero onVerVideo={abrirVideo} /></div>
      </div>

      <Suspense fallback={null}>
        <VideoWidget abierto={videoAbierto} onAbrir={abrirVideo} onCerrar={cerrarVideo} />
      </Suspense>

      <Suspense fallback={null}>
        <NeuralBackground />
      </Suspense>

      <div className="relative z-10">
        {/* 1. VISIÓN */}
        <Seccion id="vision"><VisionSection /></Seccion>

        {/* 2. EL DOLOR */}
        <Seccion id="problema"><ProblemSection /></Seccion>

        {/* 3. LOS PRODUCTOS */}
        <Seccion id="productos"><ProductsSection /></Seccion>

        {/* 4. LA SOLUCIÓN */}
        <Seccion id="solucion"><SolutionSection /></Seccion>

        {/* 5. SISTEMA DE FICHAS */}
        <Seccion id="fichas"><FichasSection /></Seccion>

        {/* 6. EL ABORDAJE */}
        <Seccion id="abordaje"><ValuesSection /></Seccion>

        <Suspense fallback={null}>
          <FinalCTA />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
