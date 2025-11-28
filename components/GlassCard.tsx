import React, { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = true, onClick }) => (
  <div 
    onClick={onClick}
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl transition-all duration-700 ease-out 
    ${hoverEffect ? 'hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:border-white/20 hover:scale-[1.01]' : ''} 
    ${className}`}
  >
    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-[shine_1.5s_ease-in-out]" />
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
    {children}
  </div>
);

export default GlassCard;
