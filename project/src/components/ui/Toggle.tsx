import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onToggle,
  leftLabel,
  rightLabel,
  className = '',
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {leftLabel && (
        <span className={`text-sm font-medium ${!isOn ? 'text-primary-500' : 'text-white/70'}`}>
          {leftLabel}
        </span>
      )}
      
      <button
        onClick={onToggle}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30
          ${isOn ? 'bg-primary-500' : 'bg-dark-700'}
        `}
      >
        <span className="sr-only">Toggle</span>
        <motion.span
          layout
          className="inline-block h-4 w-4 transform rounded-full bg-white"
          animate={{ x: isOn ? 20 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      
      {rightLabel && (
        <span className={`text-sm font-medium ${isOn ? 'text-primary-500' : 'text-white/70'}`}>
          {rightLabel}
        </span>
      )}
    </div>
  );
};

export default Toggle;