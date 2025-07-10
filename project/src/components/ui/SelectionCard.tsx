import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SelectionCardProps {
  id: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  multiSelect?: boolean;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  id,
  label,
  isSelected,
  onClick,
  icon,
  className = '',
  multiSelect = false,
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-lg cursor-pointer
        border ${isSelected ? 'border-primary-500 bg-dark-800' : 'border-dark-700 bg-dark-900'}
        hover:border-primary-500/70 transition-all duration-200
        ${className}
      `}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-primary-500">{icon}</div>}
        <div className="font-medium">{label}</div>
        {isSelected && (
          <div className="ml-auto">
            <div className={`${multiSelect ? 'w-5 h-5 rounded border border-primary-500 flex items-center justify-center bg-primary-500' : ''}`}>
              <Check size={16} className="text-dark-950" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SelectionCard;