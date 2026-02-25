import './index.css';
import HeroVideo from './components/HeroVideo';
import VisionSection from './components/VisionSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ProductsSection from './components/ProductsSection';
import FichasSection from './components/FichasSection';
import ValuesSection from './components/ValuesSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import NeuralBackground from './components/NeuralBackground';
import ScrollHeader from './components/ScrollHeader';

function App() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Scroll-triggered Header */}
      <ScrollHeader />

      {/* Animated Neural Network Background */}
      <NeuralBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero with Logo Animation */}
        <div id="inicio"><HeroVideo /></div>

        {/* 1. VISIÓN */}
        <div id="vision"><VisionSection /></div>

        {/* 2. LOS PRODUCTOS */}
        <div id="productos"><ProductsSection /></div>

        {/* 3. EL DOLOR */}
        <div id="problema"><ProblemSection /></div>

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
    </div>
  );
}

export default App;
