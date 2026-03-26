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

        // Set canvas size
        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        // Fewer neurons on mobile for better performance
        const isMobile = window.innerWidth < 768;
        const neuronCount = isMobile ? 20 : 60;
        const connectionDistance = isMobile ? 120 : 180;
        const neurons: Neuron[] = [];

        for (let i = 0; i < neuronCount; i++) {
            neurons.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw neurons
            neurons.forEach((neuron, i) => {
                // Update position
                neuron.x += neuron.vx;
                neuron.y += neuron.vy;

                // Bounce off edges
                if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
                if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;

                // Draw neuron (larger and more visible)
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(65, 105, 225, 0.7)';
                ctx.fill();

                // Draw connections to nearby neurons
                neurons.slice(i + 1).forEach((otherNeuron) => {
                    const dx = neuron.x - otherNeuron.x;
                    const dy = neuron.y - otherNeuron.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(neuron.x, neuron.y);
                        ctx.lineTo(otherNeuron.x, otherNeuron.y);
                        const opacity = (1 - distance / connectionDistance) * 0.4;
                        ctx.strokeStyle = `rgba(65, 105, 225, ${opacity})`;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
