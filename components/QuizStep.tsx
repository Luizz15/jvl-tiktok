import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { playSound } from '../utils/audio';

interface QuizStepProps {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
  discount: number;
  userName?: string;
}

export const QuizStep: React.FC<QuizStepProps> = ({ question, options, onSelect, discount, userName }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    
    // Tocar som pop quando o bônus vai aparecer (breve delay para sincronia visual)
    setTimeout(() => {
      playSound('POP', 0.4);
    }, 400);

    setTimeout(() => {
      onSelect(option);
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      
      {/* 3D Wallet Premium Card - Altura reduzida de h-32 para h-24 */}
      <div className="relative w-full h-24 mb-10 group perspective-1000">
        {/* Neon Glow Behind */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-tiktok-cyan via-purple-500 to-tiktok-pink rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse-slow"></div>

        {/* Card Body */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-tiktok-cyan/50 shadow-[0_10px_40px_-10px_rgba(0,242,234,0.3)] transform transition-transform duration-500 hover:scale-[1.02]">
          
          {/* Background Gradient (Pink -> Purple -> Blue/Cyan) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF0050] via-[#6e00ff] to-[#00F2EA]"></div>

          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

          {/* Decorative Particles/Shine */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Floating Particles (Simulated with simple dots) */}
          <div className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full opacity-60 animate-float"></div>
          <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-pulse"></div>

          {/* Card Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            
            {/* Top Label */}
            <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-white/90 uppercase mb-1 drop-shadow-md">
              Desconto Acumulado
            </p>

            {/* Animated Number */}
            <div className="flex items-baseline justify-center overflow-hidden h-16">
              <div 
                key={discount} 
                className="flex items-baseline animate-[bounce_1s_ease-in-out_1]"
              >
                <span className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] tracking-tighter">
                  {discount}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-white/90 ml-1">
                  %
                </span>
              </div>
            </div>

            {/* Simulated Chip/Detail for "Wallet" feel */}
            <div className="absolute bottom-3 right-4 opacity-40">
                <div className="w-8 h-5 rounded border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-md">
                    <div className="w-5 h-3 border border-white/30 rounded-[2px]"></div>
                </div>
            </div>

          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white text-center mb-8 leading-relaxed">
        {userName && <span className="block text-lg text-gray-400 font-normal mb-2">Olá, {userName}!</span>}
        {question}
      </h2>

      <div className="space-y-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(option)}
            className={`w-full p-5 rounded-xl text-left transition-all duration-300 border flex items-center justify-between group
              ${selected === option 
                ? 'bg-tiktok-cyan/20 border-tiktok-cyan shadow-[0_0_15px_rgba(0,242,234,0.3)]' 
                : 'bg-white/5 border-white/10 hover:border-tiktok-cyan/50 hover:bg-white/10'
              }`}
          >
            <span className="font-semibold text-lg">{option}</span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
              ${selected === option ? 'border-tiktok-cyan bg-tiktok-cyan text-black' : 'border-gray-600 group-hover:border-tiktok-cyan'}`}>
              {selected === option && <Check size={14} strokeWidth={4} />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};