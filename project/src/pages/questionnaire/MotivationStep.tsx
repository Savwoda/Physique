import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Eye, 
  Zap, 
  Trophy, 
  HeartHandshake, 
  Briefcase 
} from 'lucide-react';
import SelectionCard from '../../components/ui/SelectionCard';

interface MotivationStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const MotivationStep: React.FC<MotivationStepProps> = ({ value, onChange }) => {
  const motivations = [
    { id: 'health', label: 'Health', icon: <Heart size={20} /> },
    { id: 'looks', label: 'Looks', icon: <Eye size={20} /> },
    { id: 'energy', label: 'Energy', icon: <Zap size={20} /> },
    { id: 'sports', label: 'Sports', icon: <Trophy size={20} /> },
    { id: 'dating', label: 'Dating', icon: <HeartHandshake size={20} /> },
    { id: 'career', label: 'Career', icon: <Briefcase size={20} /> },
  ];

  const toggleMotivation = (motivationId: string) => {
    if (value.includes(motivationId)) {
      onChange(value.filter(id => id !== motivationId));
    } else {
      onChange([...value, motivationId]);
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
        <h2 className="text-2xl font-bold mb-2">What motivates you?</h2>
        <p className="text-dark-300 mb-6">
          Select all that apply. Understanding your motivation helps us keep you on track.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 mt-4"
      >
        {motivations.map((motivation) => (
          <motion.div key={motivation.id} variants={itemVariants}>
            <SelectionCard
              id={motivation.id}
              label={motivation.label}
              icon={motivation.icon}
              isSelected={value.includes(motivation.id)}
              onClick={() => toggleMotivation(motivation.id)}
              multiSelect
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MotivationStep;