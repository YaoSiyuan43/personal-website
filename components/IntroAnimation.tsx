
import React, { useEffect, useState } from 'react';
import { Leaf, Sparkles } from 'lucide-react';

interface IntroAnimationProps {
    onComplete: () => void;
    onDissolveStart: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete, onDissolveStart }) => {
    const [phase, setPhase] = useState<'rising' | 'dissolving' | 'hidden'>('rising');
    
    useEffect(() => {
        // Phase 1: Rising (0s - 2.5s) is handled by CSS animation on mount
        
        // Phase 2: Dissolving (starts at 2.5s)
        const dissolveTimer = setTimeout(() => {
            setPhase('dissolving');
            onDissolveStart(); // Notify App to start fading in content
        }, 2500);

        // Phase 3: Complete (starts at 5s to allow dissolve to finish)
        const completeTimer = setTimeout(() => {
            setPhase('hidden');
            onComplete();
        }, 5000);

        return () => {
            clearTimeout(dissolveTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete, onDissolveStart]);

    if (phase === 'hidden') return null;

    return (
        <div className="fixed inset-0 z-[15] flex items-center justify-center overflow-hidden pointer-events-none">
            {/* Main Glowing Leaf Phantom */}
            <div 
                className={`transform transition-all ease-in-out will-change-transform flex flex-col items-center justify-center
                    ${phase === 'rising' ? 'opacity-100' : ''}
                    ${phase === 'dissolving' ? 'opacity-0 blur-3xl' : ''}
                `}
                style={{
                    animation: phase === 'rising' ? 'riseUp 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards' : '',
                    // Manual transition style for the dissolve phase to allow complex scale/opacity interaction
                    transitionDuration: phase === 'dissolving' ? '2500ms' : '0ms',
                    transform: phase === 'dissolving' ? 'scale(30)' : undefined
                }}
            >
                <div className="relative group">
                    {/* Rotating Halo */}
                    <div className="absolute inset-0 border border-[#9caf88]/30 rounded-full scale-150 animate-[spin_10s_linear_infinite] opacity-50"></div>
                    <div className="absolute inset-0 border border-[#9caf88]/10 rounded-full scale-[1.8] animate-[spin_15s_linear_infinite_reverse] opacity-30"></div>

                    {/* Sparkles */}
                    <div className="absolute -top-10 -right-10 animate-pulse delay-75"><Sparkles size={24} className="text-[#9caf88]/60" /></div>
                    <div className="absolute -bottom-5 -left-12 animate-pulse delay-300"><Sparkles size={18} className="text-[#9caf88]/40" /></div>

                    {/* Inner bright core */}
                    <Leaf size={180} className="text-[#9caf88] fill-[#9caf88] drop-shadow-[0_0_30px_rgba(156,175,136,0.8)] relative z-10" strokeWidth={0.5} />
                    
                    {/* Outer glow phantom */}
                    <div className="absolute inset-0 blur-[20px] opacity-60 scale-110 animate-pulse">
                        <Leaf size={180} className="text-[#9caf88] fill-[#9caf88]" />
                    </div>
                    
                    {/* Extra Bloom */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#9caf88] rounded-full blur-[80px] opacity-20 animate-pulse"></div>
                </div>
            </div>

            <style>{`
                @keyframes riseUp {
                    0% { transform: translateY(110vh) scale(0.8) rotate(-10deg); opacity: 0; }
                    100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default IntroAnimation;
