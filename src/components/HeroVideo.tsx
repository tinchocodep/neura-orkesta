import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function HeroVideo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked, that's okay
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen overflow-hidden">
            <motion.div
                style={{ opacity, scale }}
                className="sticky top-0 h-screen flex flex-col items-center justify-center bg-transparent"
            >
                {/* Logo Video - Centered and Large */}
                <div className="w-full max-w-5xl px-6 mb-4">
                    <video
                        ref={videoRef}
                        src="/videos/logo-animation.mp4"
                        className="w-full h-auto opacity-70"
                        muted
                        loop
                        playsInline
                        autoPlay
                        // @ts-expect-error fetchpriority not in React types yet
                        fetchpriority="high"
                    />
                </div>

                {/* Text Below Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-center px-6 pb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-4">
                        NEURACALL <span className="gradient-text">ORKESTA</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary">
                        Tu empresa, operando en tiempo real.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
