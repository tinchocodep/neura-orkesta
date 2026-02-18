/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary brand color from logo
                'brand-blue': '#4169E1',
                'brand-blue-light': '#6B8FFF',
                'brand-blue-dark': '#2952CC',
                // Light theme colors
                'light-bg': '#FFFFFF',
                'light-secondary': '#F8F9FA',
                'light-tertiary': '#E9ECEF',
                'text-primary': '#1A1A1A',
                'text-secondary': '#4A5568',
                'text-muted': '#718096',
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                'display': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'brand': '0 4px 20px rgba(65, 105, 225, 0.15)',
                'brand-lg': '0 8px 30px rgba(65, 105, 225, 0.2)',
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
