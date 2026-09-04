import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Neuron {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export default function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Respetar prefers-reduced-motion: se dibuja un frame y no se anima.
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const updateSize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        const isMobile = window.innerWidth < 768;
        const neuronCount = isMobile ? 16 : 60;
        const connectionDistance = isMobile ? 120 : 180;
        // Comparar distancias al cuadrado evita una raíz cuadrada por par de neuronas.
        const connectionDistanceSq = connectionDistance * connectionDistance;

        const neurons: Neuron[] = [];
        for (let i = 0; i < neuronCount; i++) {
            neurons.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        let frameId = 0;
        let lastFrame = 0;
        const FRAME_MS = 1000 / 30; // 30fps alcanza para un fondo ambiente

        const draw = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < neurons.length; i++) {
                const neuron = neurons[i];

                if (!reduceMotion) {
                    neuron.x += neuron.vx;
                    neuron.y += neuron.vy;
                    if (neuron.x < 0 || neuron.x > w) neuron.vx *= -1;
                    if (neuron.y < 0 || neuron.y > h) neuron.vy *= -1;
                }

                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(65, 105, 225, 0.22)';
                ctx.fill();

                // Índices en vez de slice(): no aloca un array nuevo por neurona por frame.
                for (let j = i + 1; j < neurons.length; j++) {
                    const other = neurons[j];
                    const dx = neuron.x - other.x;
                    const dy = neuron.y - other.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq >= connectionDistanceSq) continue;

                    const opacity = (1 - Math.sqrt(distSq) / connectionDistance) * 0.13;
                    ctx.beginPath();
                    ctx.moveTo(neuron.x, neuron.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `rgba(65, 105, 225, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        };

        const animate = (now: number) => {
            frameId = requestAnimationFrame(animate);
            if (now - lastFrame < FRAME_MS) return;
            lastFrame = now;
            if (document.hidden) return;
            draw();
        };

        if (reduceMotion) {
            draw();
        } else {
            frameId = requestAnimationFrame(animate);
        }

        return () => {
            // El cleanup original sólo removía el listener de resize: el loop de rAF
            // sobrevivía al unmount (y en StrictMode arrancaban dos).
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
