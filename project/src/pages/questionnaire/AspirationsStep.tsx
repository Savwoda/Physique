import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Trophy, Brain, Users, Clock, Book, Zap, Award } from 'lucide-react';
import SelectionCard from '../../components/ui/SelectionCard';

interface AspirationsStepProps {
  value: {
    mainMotivation: string;
    commitment: string;
    barrier: string;
    adviceType: string;
  };
  onChange: (value: any) => void;
}

const AspirationsStep: React.FC<AspirationsStepProps> = ({ value, onChange }) => {
  const updateField = (field: string, newValue: string) => {
    onChange({ ...value, [field]: newValue });
  };

  const questions = [
    {
      id: 'mainMotivation',
      title: 'What motivates you the most?',
      options: [
        { id: 'appearance', label: 'Better appearance', icon: <Camera size={20} /> },
        { id: 'health', label: 'Improved health', icon: <Heart size={20} /> },
        { id: 'performance', label: 'Athletic performance', icon: <Trophy size={20} /> },
        { id: 'mental', label: 'Mental well-being', icon: <Brain size={20} /> },
        { id: 'accountability', label: 'External accountability', icon: <Users size={20} /> },
      ],
    },
    {
      id: 'commitment',
      title: 'How committed are you to your fitness goals right now?',
      options: [
        { id: 'exploring', label: 'Just exploring', icon: <Book size={20} /> },
        { id: 'somewhat', label: 'Somewhat committed', icon: <Zap size={20} /> },
        { id: 'fully', label: 'Fully committed', icon: <Award size={20} /> },
      ],
    },
    {
      id: 'barrier',
      title: 'Biggest barrier to reaching your goal?',
      options: [
        { id: 'time', label: 'Lack of time', icon: <Clock size={20} /> },
        { id: 'knowledge', label: 'Lack of knowledge', icon: <Book size={20} /> },
        { id: 'motivation', label: 'Motivation issues', icon: <Zap size={20} /> },
        { id: 'routine', label: 'Inconsistent routine', icon: <Users size={20} /> },
        { id: 'health', label: 'Injuries or health concerns', icon: <Heart size={20} /> },
      ],
    },
    {
      id: 'adviceType',
      title: 'What kind of advice do you want most?',
      options: [
        { id: 'training', label: 'Training tips', icon: <Trophy size={20} /> },
        { id: 'nutrition', label: 'Nutrition guidance', icon: <Heart size={20} /> },
        { id: 'motivation', label: 'Motivation / Habit-building', icon: <Zap size={20} /> },
        { id: 'program', label: 'Personalized program', icon: <Award size={20} /> },
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
        <h2 className="text-2xl font-bold mb-2">Aspirations & Motivation</h2>
        <p className="text-dark-300 mb-6">
          Help us understand what drives you and how we can best support your journey.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-8"
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
                  icon={option.icon}
                  isSelected={value[question.id as keyof typeof value] === option.id}
                  onClick={() => updateField(question.id, option.id)}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AspirationsStep;