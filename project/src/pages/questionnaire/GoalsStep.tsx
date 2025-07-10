import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Dumbbell, 
  Scale, 
  AlignVerticalJustifyCenter, 
  Sparkles 
} from 'lucide-react';
import SelectionCard from '../../components/ui/SelectionCard';

interface GoalsStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const GoalsStep: React.FC<GoalsStepProps> = ({ value, onChange }) => {
  const goals = [
    { id: 'lose_fat', label: 'Lose fat', icon: <Flame size={20} /> },
    { id: 'build_muscle', label: 'Build muscle', icon: <Dumbbell size={20} /> },
    { id: 'maintain', label: 'Maintain', icon: <Scale size={20} /> },
    { id: 'improve_posture', label: 'Improve posture', icon: <AlignVerticalJustifyCenter size={20} /> },
    { id: 'boost_confidence', label: 'Boost confidence', icon: <Sparkles size={20} /> },
  ];

  const toggleGoal = (goalId: string) => {
    if (value.includes(goalId)) {
      onChange(value.filter(id => id !== goalId));
    } else {
      onChange([...value, goalId]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-2">What are your fitness goals?</h2>
        <p className="text-dark-300 mb-6">
          Select all that apply. This helps us create your personalized plan.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 mt-4"
      >
        {goals.map((goal) => (
          <motion.div key={goal.id} variants={itemVariants}>
            <SelectionCard
              id={goal.id}
              label={goal.label}
              icon={goal.icon}
              isSelected={value.includes(goal.id)}
              onClick={() => toggleGoal(goal.id)}
              multiSelect
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GoalsStep;