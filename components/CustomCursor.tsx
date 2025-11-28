import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

const CustomCursor: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            const isInteractive = target.closest('a, button, .cursor-pointer, [role="button"]');
            setIsHovering(!!isInteractive);
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div 
            className="fixed pointer-events-none z-[100] hidden md:block mix-blend-screen" 
            style={{ 
                left: 0,
                top: 0,
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            }}
        >
            <div className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${isHovering ? 'scale-[1.5] rotate-12' : 'scale-100 rotate-0'}`}>
                {/* Glow effect layer */}
                <div className="absolute inset-0 bg-[#9caf88] blur-[20px] opacity-60 rounded-full scale-150 animate-pulse"></div>
                {/* The Leaf */}
                <Leaf 
                    size={32} 
                    className="text-[#9caf88] fill-[#9caf88]/30 relative z-10" 
                    style={{ filter: 'drop-shadow(0 0 10px #9caf88)' }}
                    strokeWidth={1.5}
                />
            </div>
        </div>
    );
};

export default CustomCursor;