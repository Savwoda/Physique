import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Logo from '../../components/ui/Logo';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';

interface TransitionPageProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  emoji: string;
}

const TransitionPage: React.FC<TransitionPageProps> = ({
  title,
  description,
  currentStep,
  totalSteps,
  onNext,
  emoji,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <header className="p-4">
        <Logo />
      </header>

      <div className="p-4 md:p-6">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <div className="flex justify-center mb-8">
            <motion.div 
              className="w-24 h-24 bg-dark-800 rounded-xl flex items-center justify-center overflow-hidden relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent"></div>
              <div className="text-4xl">{emoji}</div>
            </motion.div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {title}
          </h2>
          
          <p className="text-dark-300 text-lg mb-12">
            {description}
          </p>

          <Button 
            size="lg" 
            onClick={onNext}
            rightIcon={<ArrowRight size={20} />}
            className="w-full md:w-auto"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TransitionPage;