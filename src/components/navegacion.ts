// Las secciones se cargan después del hero. Si alguien toca el menú antes de que la
// sección exista, se espera a que aparezca en vez de no hacer nada.
export function irA(ancla: string) {
    const buscar = () => document.querySelector(ancla);
    const mover = (el: Element) => {
        const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'start' });
    };

    const destino = buscar();
    if (destino) {
        mover(destino);
        return;
    }

    const observador = new MutationObserver(() => {
        const el = buscar();
        if (!el) return;
        observador.disconnect();
        window.clearTimeout(limite);
        mover(el);
    });
    const limite = window.setTimeout(() => observador.disconnect(), 5000);
    observador.observe(document.body, { childList: true, subtree: true });
}
