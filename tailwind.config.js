/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                // La tarjeta grande del video pide ancho Y alto: un celular acostado es ancho
                // pero no tiene alto para ella.
                'tarjeta': { raw: '(min-width: 768px) and (min-height: 600px)' },
            },
            colors: {
                // Paleta del deck comercial (sept. 2026). El azul del deck (#3B7BFF) está pensado
                // para fondo oscuro: con texto blanco encima no llega al contraste AA, así que
                // sobre claro se usa uno apenas más profundo y el del deck queda como «bright».
                'brand-blue': '#2B68E6',
                'brand-blue-bright': '#3B7BFF',
                'brand-blue-light': '#91B9FF',
                'brand-blue-dark': '#2457C9',
                'night': '#080F20',
                'night-soft': '#142238',
                'night-line': '#26334B',
                'on-night': '#F4F7FF',
                'on-night-soft': '#B1BED2',
                'mist': '#F1F4F8',
                'ink': '#112039',
                'ink-soft': '#566880',
                'line': '#D6E2F3',
                'sync': '#ED9A70',
                'sync-dark': '#B7663D',
                'insight': '#F0B34D',
                'insight-dark': '#A87817',
                'ok': '#61DFB1',
                // Light theme colors
                'light-bg': '#FFFFFF',
                'light-secondary': '#F8F9FA',
                'light-tertiary': '#E9ECEF',
                'text-primary': '#1A1A1A',
                'text-secondary': '#4A5568',
                'text-muted': '#718096',
            },
            fontFamily: {
                'sans': ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
                'display': ['Archivo', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'brand': '0 4px 20px rgba(43, 104, 230, 0.15)',
                'brand-lg': '0 8px 30px rgba(43, 104, 230, 0.2)',
                'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.6s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
