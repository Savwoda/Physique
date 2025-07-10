import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  className = '' 
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between mb-1 text-xs text-dark-300">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;