import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface ScrollVideoProps {
    videoSrc: string;
    title: string;
    subtitle: string;
    features: string[];
}

export default function ScrollVideo({ videoSrc, title, subtitle, features }: ScrollVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animFrameId: number;
        let crop = { top: 0, bottom: 0, left: 0, right: 0 };
        let cropDetected = false;

        const detectCrop = () => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = video.videoWidth;
            tempCanvas.height = video.videoHeight;
            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) return { top: 0, bottom: video.videoHeight, left: 0, right: video.videoWidth };

            tempCtx.drawImage(video, 0, 0);
            const data = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
            const w = tempCanvas.width;
            const h = tempCanvas.height;
            const midX = Math.floor(w / 2);
            const midY = Math.floor(h / 2);
            const threshold = 10;

            let topCrop = 0;
            for (let y = 0; y < h; y++) {
                const idx = (y * w + midX) * 4;
                if (data[idx] > threshold || data[idx + 1] > threshold || data[idx + 2] > threshold) { topCrop = y; break; }
            }

            let bottomCrop = h;
            for (let y = h - 1; y >= 0; y--) {
                const idx = (y * w + midX) * 4;
                if (data[idx] > threshold || data[idx + 1] > threshold || data[idx + 2] > threshold) { bottomCrop = y + 1; break; }
            }

            let leftCrop = 0;
            for (let x = 0; x < w; x++) {
                const idx = (midY * w + x) * 4;
                if (data[idx] > threshold || data[idx + 1] > threshold || data[idx + 2] > threshold) { leftCrop = x; break; }
            }

            let rightCrop = w;
            for (let x = w - 1; x >= 0; x--) {
                const idx = (midY * w + x) * 4;
                if (data[idx] > threshold || data[idx + 1] > threshold || data[idx + 2] > threshold) { rightCrop = x + 1; break; }
            }

            return { top: topCrop, bottom: bottomCrop, left: leftCrop, right: rightCrop };
        };

        const render = () => {
            if (video.readyState >= 2 && video.videoWidth > 0) {
                if (!cropDetected) {
                    crop = detectCrop();
                    cropDetected = true;
                    canvas.width = crop.right - crop.left;
                    canvas.height = crop.bottom - crop.top;
                }
                ctx.drawImage(
                    video,
                    crop.left, crop.top,
                    crop.right - crop.left, crop.bottom - crop.top,
                    0, 0,
                    canvas.width, canvas.height
                );
            }
            animFrameId = requestAnimationFrame(render);
        };

        const onReady = () => {
            video.play().catch(() => { });
            render();
        };

        if (video.readyState >= 2) {
            onReady();
        } else {
            video.addEventListener('loadeddata', onReady);
        }

        return () => {
            cancelAnimationFrame(animFrameId);
            video.removeEventListener('loadeddata', onReady);
        };
    }, []);

    return (
        <section className="section-padding bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-8"
                >
                    Neura Sync
                </motion.p>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-text-primary"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-text-secondary text-lg md:max-w-xs"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                {/* Video — hidden element feeds canvas */}
                <video
                    ref={videoRef}
                    src={videoSrc}
                    style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
                <motion.canvas
                    ref={canvasRef}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full h-auto rounded-2xl"
                />

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-6 mt-8"
                >
                    {features.map((feature, index) => (
                        <span key={index} className="text-sm text-text-secondary border-l-2 border-brand-blue pl-3">
                            {feature}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
