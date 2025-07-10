import React from 'react';
import { Dumbbell } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Dumbbell className="text-primary-500" size={size === 'lg' ? 40 : size === 'md' ? 28 : 20} />
      <span className={`font-bold ${sizeClasses[size]} text-white`}>
        Physique<span className="text-primary-500">AI</span>
      </span>
    </div>
  );
};

export default Logo;