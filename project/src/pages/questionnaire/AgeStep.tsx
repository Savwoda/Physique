import React from 'react';
import { motion } from 'framer-motion';
import NumberInput from '../../components/ui/NumberInput';

interface AgeStepProps {
  value: number;
  onChange: (value: number) => void;
}

const AgeStep: React.FC<AgeStepProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-2">How old are you?</h2>
        <p className="text-dark-300 mb-6">
          Your age helps us tailor fitness recommendations appropriate for your stage of life.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full max-w-sm mx-auto"
      >
        <NumberInput
          label="Enter your age"
          value={value}
          onChange={onChange}
          min={13}
          max={100}
          unit="years"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="mt-8 text-center text-dark-400 text-sm"
      >
        <p>We tailor our recommendations based on your body's needs at different life stages.</p>
      </motion.div>
    </div>
  );
};

export default AgeStep;