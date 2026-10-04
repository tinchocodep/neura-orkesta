// Sólo en desarrollo: /?solo=Problema monta UNA sección de src/components/secciones/
// sin header ni el resto de la página, para mirarla o sacarle una captura.
import { StrictMode, Suspense, lazy, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const modulos = import.meta.glob<{ default: ComponentType }>('./components/secciones/*.tsx');

export function montarSolo(nombre: string) {
    const raiz = createRoot(document.getElementById('root')!);
    const cargar = modulos[`./components/secciones/${nombre}.tsx`];
    if (!cargar) {
        raiz.render(
            <p style={{ padding: 40, fontFamily: 'monospace' }}>
                No existe la sección «{nombre}». Hay: {Object.keys(modulos).join(', ') || 'ninguna'}
            </p>,
        );
        return;
    }
    const Seccion = lazy(cargar);
    raiz.render(
        <StrictMode>
            <Suspense fallback={null}>
                <Seccion />
            </Suspense>
        </StrictMode>,
    );
}
