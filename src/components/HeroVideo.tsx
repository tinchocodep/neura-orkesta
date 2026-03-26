import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import logoSm from '../assets/logo-sm.png';

export default function HeroVideo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        if (videoRef.current && !isMobile) {
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked, that's okay
            });
        }
    }, [isMobile]);

    return (
        <div ref={containerRef} className="relative h-screen overflow-hidden">
            <motion.div
                style={{ opacity, scale }}
                className="sticky top-0 h-screen flex flex-col items-center justify-center bg-transparent"
            >
                {/* Logo: static image on mobile, video on desktop */}
                <div className="w-full max-w-5xl px-6 mb-4">
                    {isMobile ? (
                        <img
                            src={logoSm}
                            alt="Neuracall Orkesta"
                            width="192"
                            height="192"
                            className="w-48 h-auto mx-auto opacity-70"
                        />
                    ) : (
                        <video
                            ref={videoRef}
                            src="/videos/logo-animation.mp4"
                            className="w-full h-auto opacity-70"
                            muted
                            loop
                            playsInline
                            autoPlay
                        />
                    )}
                </div>

                {/* Text Below Logo — no animation delay for faster LCP */}
                <div className="text-center px-6 pb-12">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-4">
                        NEURACALL <span className="gradient-text">ORKESTA</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary">
                        Tu empresa, operando en tiempo real.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
