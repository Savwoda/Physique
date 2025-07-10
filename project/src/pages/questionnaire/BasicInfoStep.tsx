import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NumberInput from '../../components/ui/NumberInput';

interface BasicInfoStepProps {
  onNext: () => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ onNext }) => {
  const [age, setAge] = useState(25);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(8);
  const [weight, setWeight] = useState(150);

  return (
    <div className="flex flex-col min-h-screen bg-dark-950">
      <div className="flex-1 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
          <p className="text-dark-300 mb-8">
            Let's get some basic information to help customize your fitness journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-8"
        >
          <NumberInput
            label="Enter your age"
            value={age}
            onChange={setAge}
            min={13}
            max={100}
            unit="years"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Enter your height</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <NumberInput
                  label="Feet"
                  value={feet}
                  onChange={setFeet}
                  min={3}
                  max={8}
                  unit="ft"
                />
              </div>
              <div className="flex-1">
                <NumberInput
                  label="Inches"
                  value={inches}
                  onChange={setInches}
                  min={0}
                  max={11}
                  unit="in"
                />
              </div>
            </div>
          </div>

          <NumberInput
            label="Enter your weight"
            value={weight}
            onChange={setWeight}
            min={70}
            max={400}
            unit="lbs"
          />
        </motion.div>
      </div>

      <div className="p-4 bg-dark-950 border-t border-dark-800">
        <button
          onClick={onNext}
          className="w-full h-14 bg-primary-500 text-dark-950 rounded-lg font-medium
                   hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500
                   focus:ring-offset-2 focus:ring-offset-dark-950 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicInfoStep;