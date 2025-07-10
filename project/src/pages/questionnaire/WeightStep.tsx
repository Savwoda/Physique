import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NumberInput from '../../components/ui/NumberInput';
import Toggle from '../../components/ui/Toggle';

interface WeightStepProps {
  value: { value: number; unit: string };
  onChange: (value: { value: number; unit: string }) => void;
}

const WeightStep: React.FC<WeightStepProps> = ({ value, onChange }) => {
  const [useImperial, setUseImperial] = useState(value.unit === 'lb');

  const handleUnitToggle = () => {
    const newUseImperial = !useImperial;
    setUseImperial(newUseImperial);
    
    if (newUseImperial) {
      // Convert kg to lb
      const lb = Math.round(value.value * 2.20462);
      onChange({ value: lb, unit: 'lb' });
    } else {
      // Convert lb to kg
      const kg = Math.round(value.value / 2.20462);
      onChange({ value: kg, unit: 'kg' });
    }
  };

  const handleWeightChange = (newValue: number) => {
    onChange({ value: newValue, unit: useImperial ? 'lb' : 'kg' });
  };

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-2">What's your current weight?</h2>
        <p className="text-dark-300 mb-6">
          We'll use this to track your progress and calculate metrics like BMI.
        </p>
      </motion.div>

      <div className="flex justify-center mb-6">
        <Toggle
          isOn={useImperial}
          onToggle={handleUnitToggle}
          leftLabel="kg"
          rightLabel="lb"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full max-w-sm mx-auto"
      >
        <NumberInput
          label="Weight"
          value={value.value}
          onChange={handleWeightChange}
          min={useImperial ? 70 : 32}
          max={useImperial ? 400 : 181}
          unit={useImperial ? "lb" : "kg"}
        />
      </motion.div>
    </div>
  );
};

export default WeightStep;