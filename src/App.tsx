import './index.css';
import { lazy, Suspense, useCallback, useState } from 'react';
import Hero from './components/Hero';
import ScrollHeader from './components/ScrollHeader';

// Lazy load everything below the fold for faster LCP
const VideoWidget = lazy(() => import('./components/VideoWidget'));
const Vision = lazy(() => import('./components/secciones/Vision'));
const Problema = lazy(() => import('./components/secciones/Problema'));
const Solucion = lazy(() => import('./components/secciones/Solucion'));
const SietePasos = lazy(() => import('./components/secciones/SietePasos'));
const Clientes = lazy(() => import('./components/secciones/Clientes'));
const Implementacion = lazy(() => import('./components/secciones/Implementacion'));
const Neuralite = lazy(() => import('./components/secciones/Neuralite'));
const Cierre = lazy(() => import('./components/secciones/Cierre'));

function App() {
  const [videoAbierto, setVideoAbierto] = useState(false);
  const abrirVideo = useCallback(() => setVideoAbierto(true), []);
  const cerrarVideo = useCallback(() => setVideoAbierto(false), []);

  return (
    <div className="min-h-screen bg-white">
      <ScrollHeader />

      <main>
        {/* Hero loads immediately for fast LCP */}
        <div id="inicio"><Hero onVerVideo={abrirVideo} /></div>

        {/* Un Suspense por sección: si una tarda, las demás igual aparecen. */}
        <Suspense fallback={null}><Vision /></Suspense>
        <Suspense fallback={null}><Problema /></Suspense>
        <Suspense fallback={null}><Solucion /></Suspense>
        <Suspense fallback={null}><SietePasos /></Suspense>
        <Suspense fallback={null}><Clientes /></Suspense>
        <Suspense fallback={null}><Implementacion /></Suspense>
        <Suspense fallback={null}><Neuralite /></Suspense>
      </main>

      <Suspense fallback={null}><Cierre /></Suspense>

      <Suspense fallback={null}>
        <VideoWidget abierto={videoAbierto} onAbrir={abrirVideo} onCerrar={cerrarVideo} />
      </Suspense>
    </div>
  );
}

export default App;
