
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import GlassCard from './GlassCard';
import { GalleryPhoto } from '../types';

interface Carousel3DProps {
    items: GalleryPhoto[];
}

const Carousel3D: React.FC<Carousel3DProps> = ({ items }) => {
    const [rotation, setRotation] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    // Adjusted for 4:3 Landscape Orientation - Increased size
    const radius = 650; 
    const cardWidth = 500;
    const cardHeight = 375;
    const count = items.length;
    const angleStep = 360 / count;

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (containerRef.current && containerRef.current.contains(e.target as Node)) {
                e.preventDefault();
                setRotation(prev => prev + e.deltaY * 0.1);
            }
        };
        const el = containerRef.current;
        if(el) el.addEventListener('wheel', handleWheel, { passive: false });
        return () => { if(el) el.removeEventListener('wheel', handleWheel); }
    }, []);

    return (
        <div className="relative h-[700px] w-full flex items-center justify-center overflow-hidden perspective-[1000px]" ref={containerRef}>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-white/40 text-sm uppercase tracking-[0.2em] flex items-center gap-2 z-10 animate-pulse">
                <Sparkles size={14}/> Scroll to Explore
            </div>
            <div 
                className="relative transition-transform duration-1000 ease-out will-change-transform transform-style-3d" 
                style={{ 
                    width: cardWidth, 
                    height: cardHeight, 
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${-rotation}deg)` 
                }}
            >
                {items.map((item, index) => {
                    const angle = index * angleStep;
                    return (
                        <div 
                            key={item.id} 
                            className="absolute top-0 left-0 w-full h-full transition-all duration-500 backface-hidden" 
                            style={{ 
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            <GlassCard className="w-full h-full p-2 group">
                                <div className="w-full h-full relative rounded-xl overflow-hidden">
                                    <img 
                                        src={item.src} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                                    />
                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
                                        <MapPin size={16} className="text-[#9caf88]" />
                                        <span className="text-white font-serif italic tracking-wide text-lg font-thin">{item.title}</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050a05] to-transparent pointer-events-none z-10" />
        </div>
    );
};

export default Carousel3D;
