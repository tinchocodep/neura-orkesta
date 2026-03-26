import './index.css';
import { lazy, Suspense } from 'react';
import HeroVideo from './components/HeroVideo';

// Lazy load everything below the fold for faster LCP
const ScrollHeader = lazy(() => import('./components/ScrollHeader'));
const NeuralBackground = lazy(() => import('./components/NeuralBackground'));
const VisionSection = lazy(() => import('./components/VisionSection'));
const ProblemSection = lazy(() => import('./components/ProblemSection'));
const SolutionSection = lazy(() => import('./components/SolutionSection'));
const ProductsSection = lazy(() => import('./components/ProductsSection'));
const FichasSection = lazy(() => import('./components/FichasSection'));
const ValuesSection = lazy(() => import('./components/ValuesSection'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Hero loads immediately for fast LCP */}
      <div className="relative z-10">
        <div id="inicio"><HeroVideo /></div>
      </div>

      {/* Everything below the fold is lazy loaded */}
      <Suspense fallback={null}>
        <ScrollHeader />
        <NeuralBackground />

        <div className="relative z-10">
          {/* 1. VISIÓN */}
          <div id="vision"><VisionSection /></div>

          {/* 2. EL DOLOR */}
          <div id="problema"><ProblemSection /></div>

          {/* 3. LOS PRODUCTOS */}
          <div id="productos"><ProductsSection /></div>

          {/* 4. LA SOLUCIÓN */}
          <div id="solucion"><SolutionSection /></div>

          {/* 5. SISTEMA DE FICHAS */}
          <div id="fichas"><FichasSection /></div>

          {/* 6. EL ABORDAJE */}
          <div id="abordaje"><ValuesSection /></div>

          {/* Final CTA */}
          <FinalCTA />

          {/* Footer */}
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
