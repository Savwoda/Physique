import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, PersonStanding, Heart, Zap, StretchVertical as Stretch, Swords } from 'lucide-react';
import SelectionCard from '../../components/ui/SelectionCard';
import NumberInput from '../../components/ui/NumberInput';
import Toggle from '../../components/ui/Toggle';

interface FitnessGoalsStepProps {
  value: {
    targetWeight?: { value: number; unit: string };
    currentProgram: string;
    workoutStyles: string[];
    otherWorkoutStyle?: string;
  };
  onChange: (value: any) => void;
}

const FitnessGoalsStep: React.FC<FitnessGoalsStepProps> = ({ value, onChange }) => {
  const [useImperial, setUseImperial] = useState(value.targetWeight?.unit === 'lb');
  const [showOtherInput, setShowOtherInput] = useState(value.workoutStyles.includes('other'));

  const handleTargetWeightChange = (newValue: number) => {
    onChange({
      ...value,
      targetWeight: { value: newValue, unit: useImperial ? 'lb' : 'kg' }
    });
  };

  const handleUnitToggle = () => {
    const newUseImperial = !useImperial;
    if (value.targetWeight) {
      const newValue = newUseImperial
        ? Math.round(value.targetWeight.value * 2.20462)
        : Math.round(value.targetWeight.value / 2.20462);
      onChange({
        ...value,
        targetWeight: { value: newValue, unit: newUseImperial ? 'lb' : 'kg' }
      });
    }
    setUseImperial(newUseImperial);
  };

  const toggleWorkoutStyle = (style: string) => {
    let newStyles: string[];
    if (value.workoutStyles.includes(style)) {
      newStyles = value.workoutStyles.filter(s => s !== style);
      if (style === 'other') {
        setShowOtherInput(false);
        onChange({ ...value, workoutStyles: newStyles, otherWorkoutStyle: undefined });
        return;
      }
    } else {
      newStyles = [...value.workoutStyles, style];
      if (style === 'other') {
        setShowOtherInput(true);
      }
    }
    onChange({ ...value, workoutStyles: newStyles });
  };

  const workoutStyles = [
    { id: 'weightlifting', label: 'Weightlifting', icon: <Dumbbell size={20} /> },
    { id: 'calisthenics', label: 'Calisthenics', icon: <PersonStanding size={20} /> },
    { id: 'cardio', label: 'Cardio', icon: <Heart size={20} /> },
    { id: 'hiit', label: 'HIIT', icon: <Zap size={20} /> },
    { id: 'yoga', label: 'Yoga / Pilates', icon: <Stretch size={20} /> },
    { id: 'martial_arts', label: 'Sports / Martial arts', icon: <Swords size={20} /> },
    { id: 'other', label: 'Other', icon: null },
  ];

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-2">Fitness Goals</h2>
        <p className="text-dark-300 mb-6">
          Tell us about your fitness goals and preferences.
        </p>
      </motion.div>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-medium mb-3">Target weight (optional)</h3>
          <div className="flex justify-center mb-4">
            <Toggle
              isOn={useImperial}
              onToggle={handleUnitToggle}
              leftLabel="kg"
              rightLabel="lb"
            />
          </div>
          <NumberInput
            label="Target Weight"
            value={value.targetWeight?.value || (useImperial ? 150 : 68)}
            onChange={handleTargetWeightChange}
            min={useImperial ? 70 : 32}
            max={useImperial ? 400 : 181}
            unit={useImperial ? "lb" : "kg"}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-medium mb-3">Are you currently following a workout program?</h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'yes', label: 'Yes' },
              { id: 'no', label: 'No' },
              { id: 'own', label: 'I make my own routines' },
            ].map((option) => (
              <SelectionCard
                key={option.id}
                id={option.id}
                label={option.label}
                isSelected={value.currentProgram === option.id}
                onClick={() => onChange({ ...value, currentProgram: option.id })}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-3">Preferred workout style(s)</h3>
          <div className="grid grid-cols-2 gap-2">
            {workoutStyles.map((style) => (
              <SelectionCard
                key={style.id}
                id={style.id}
                label={style.label}
                icon={style.icon}
                isSelected={value.workoutStyles.includes(style.id)}
                onClick={() => toggleWorkoutStyle(style.id)}
                multiSelect
              />
            ))}
          </div>
          {showOtherInput && (
            <input
              type="text"
              placeholder="Specify other workout style"
              value={value.otherWorkoutStyle || ''}
              onChange={(e) => onChange({ ...value, otherWorkoutStyle: e.target.value })}
              className="mt-3 w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FitnessGoalsStep;