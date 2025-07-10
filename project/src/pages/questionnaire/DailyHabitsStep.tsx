import React from 'react';
import { motion } from 'framer-motion';
import SelectionCard from '../../components/ui/SelectionCard';
import { Moon, Droplets, UtensilsCrossed, Wine, Cigarette, Merge as Burger, Calculator } from 'lucide-react';

interface DailyHabitsStepProps {
  value: {
    sleep: string;
    water: string;
    meals: string;
    alcohol: string;
    smoking: string;
    fastFood: string;
    tracking: string;
  };
  onChange: (value: any) => void;
}

const DailyHabitsStep: React.FC<DailyHabitsStepProps> = ({ value, onChange }) => {
  const updateHabit = (habit: string, newValue: string) => {
    onChange({ ...value, [habit]: newValue });
  };

  const questions = [
    {
      id: 'sleep',
      title: 'How many hours do you sleep per night on average?',
      icon: <Moon size={20} />,
      options: [
        { id: 'less_than_5', label: 'Less than 5' },
        { id: '5_to_6', label: '5–6' },
        { id: '7_to_8', label: '7–8' },
        { id: '9_plus', label: '9+' },
      ],
    },
    {
      id: 'water',
      title: 'How many liters of water do you drink per day?',
      icon: <Droplets size={20} />,
      options: [
        { id: 'less_than_1', label: 'Less than 1L' },
        { id: '1_to_2', label: '1–2L' },
        { id: '2_to_3', label: '2–3L' },
        { id: '3_plus', label: '3L+' },
      ],
    },
    {
      id: 'meals',
      title: 'How many meals do you eat daily?',
      icon: <UtensilsCrossed size={20} />,
      options: [
        { id: '1', label: '1' },
        { id: '2', label: '2' },
        { id: '3', label: '3' },
        { id: '4_plus', label: '4+' },
      ],
    },
    {
      id: 'alcohol',
      title: 'Do you consume alcohol regularly?',
      icon: <Wine size={20} />,
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'occasionally', label: 'Occasionally' },
        { id: 'no', label: 'No' },
      ],
    },
    {
      id: 'smoking',
      title: 'Do you smoke or vape?',
      icon: <Cigarette size={20} />,
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'occasionally', label: 'Occasionally' },
        { id: 'no', label: 'No' },
      ],
    },
    {
      id: 'fastFood',
      title: 'How often do you consume processed or fast food?',
      icon: <Burger size={20} />,
      options: [
        { id: 'daily', label: 'Daily' },
        { id: 'few_times', label: 'Few times a week' },
        { id: 'rarely', label: 'Rarely' },
        { id: 'never', label: 'Never' },
      ],
    },
    {
      id: 'tracking',
      title: 'Do you track your calories or macros?',
      icon: <Calculator size={20} />,
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'sometimes', label: 'Sometimes' },
        { id: 'no', label: 'No' },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-2">Daily Habits</h2>
        <p className="text-dark-300 mb-6">
          Let's understand your current lifestyle to provide better recommendations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-6"
      >
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <h3 className="text-lg font-medium mb-3">{question.title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {question.options.map((option) => (
                <SelectionCard
                  key={option.id}
                  id={option.id}
                  label={option.label}
                  icon={question.icon}
                  isSelected={value[question.id as keyof typeof value] === option.id}
                  onClick={() => updateHabit(question.id, option.id)}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DailyHabitsStep;