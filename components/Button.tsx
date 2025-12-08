import React from 'react';
import { playSound } from '../utils/audio';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  onClick,
  ...props 
}) => {
  const baseStyles = "py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,242,234,0.15)]";
  
  const variants = {
    primary: "gradient-btn text-white",
    outline: "border-2 border-tiktok-cyan text-tiktok-cyan hover:bg-tiktok-cyan/10",
    ghost: "text-gray-400 hover:text-white"
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Fix: Prevent external scripts (pixels) from accessing React internals and crashing
    playSound('CLICK', 0.4);
    if (onClick) onClick(e);
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};