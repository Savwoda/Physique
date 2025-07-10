import React from 'react';
import { motion } from 'framer-motion';
import { Scale as Male, Scale as Female, Users } from 'lucide-react';
import SelectionCard from '../../components/ui/SelectionCard';

interface GenderStepProps {
  value: string;
  onChange: (value: string) => void;
}

const GenderStep: React.FC<GenderStepProps> = ({ value, onChange }) => {
  const options = [
    { id: 'male', label: 'Male', icon: <Male size={20} /> },
    { id: 'female', label: 'Female', icon: <Female size={20} /> },
    { id: 'other', label: 'Other', icon: <Users size={20} /> },
  ];

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
        <h2 className="text-2xl font-bold mb-2">What's your gender?</h2>
        <p className="text-dark-300 mb-6">
          We use this to provide more accurate body analysis and recommendations.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 mt-4"
      >
        {options.map((option) => (
          <motion.div key={option.id} variants={itemVariants}>
            <SelectionCard
              id={option.id}
              label={option.label}
              icon={option.icon}
              isSelected={value === option.id}
              onClick={() => onChange(option.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GenderStep;