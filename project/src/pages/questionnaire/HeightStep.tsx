import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NumberInput from '../../components/ui/NumberInput';
import Toggle from '../../components/ui/Toggle';

interface HeightStepProps {
  value: { value: number; unit: string };
  onChange: (value: { value: number; unit: string }) => void;
}

const HeightStep: React.FC<HeightStepProps> = ({ value, onChange }) => {
  const [useImperial, setUseImperial] = useState(value.unit === 'in');
  const [feet, setFeet] = useState(() => useImperial ? Math.floor(value.value / 12) : 5);
  const [inches, setInches] = useState(() => useImperial ? value.value % 12 : 8);
  const [cm, setCm] = useState(() => useImperial ? Math.round(value.value * 2.54) : value.value);

  const handleUnitToggle = () => {
    const newUseImperial = !useImperial;
    setUseImperial(newUseImperial);
    
    if (newUseImperial) {
      // Convert cm to feet and inches
      const totalInches = Math.round(cm / 2.54);
      const newFeet = Math.floor(totalInches / 12);
      const newInches = totalInches % 12;
      setFeet(newFeet);
      setInches(newInches);
      onChange({ value: totalInches, unit: 'in' });
    } else {
      // Convert feet and inches to cm
      const newCm = Math.round((feet * 12 + inches) * 2.54);
      setCm(newCm);
      onChange({ value: newCm, unit: 'cm' });
    }
  };

  const handleImperialChange = (newFeet: number, newInches: number) => {
    const totalInches = newFeet * 12 + newInches;
    onChange({ value: totalInches, unit: 'in' });
  };

  const handleMetricChange = (newCm: number) => {
    setCm(newCm);
    onChange({ value: newCm, unit: 'cm' });
  };

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-2">How tall are you?</h2>
        <p className="text-dark-300 mb-6">
          Your height is important for calculating body proportions and realistic goals.
        </p>
      </motion.div>

      <div className="flex justify-center mb-6">
        <Toggle
          isOn={useImperial}
          onToggle={handleUnitToggle}
          leftLabel="cm"
          rightLabel="ft/in"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full max-w-sm mx-auto"
      >
        {useImperial ? (
          <div className="space-y-4">
            <NumberInput
              label="Feet"
              value={feet}
              onChange={(newFeet) => {
                setFeet(newFeet);
                handleImperialChange(newFeet, inches);
              }}
              min={3}
              max={8}
              unit="ft"
            />
            <NumberInput
              label="Inches"
              value={inches}
              onChange={(newInches) => {
                setInches(newInches);
                handleImperialChange(feet, newInches);
              }}
              min={0}
              max={11}
              unit="in"
            />
          </div>
        ) : (
          <NumberInput
            label="Height"
            value={cm}
            onChange={handleMetricChange}
            min={120}
            max={220}
            unit="cm"
          />
        )}
      </motion.div>
    </div>
  );
};

export default HeightStep;