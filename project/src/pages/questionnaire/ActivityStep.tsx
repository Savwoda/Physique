import React from 'react';
import { motion } from 'framer-motion';
import { Sofa, PersonStanding, User, UserRound as UserRun } from 'lucide-react';
import SelectionCard from '../../components/ui/SelectionCard';

interface ActivityStepProps {
  value: string;
  onChange: (value: string) => void;
}

const ActivityStep: React.FC<ActivityStepProps> = ({ value, onChange }) => {
  const activityLevels = [
    { 
      id: 'sedentary', 
      label: 'Sedentary', 
      icon: <Sofa size={20} />,
      description: 'Little to no exercise, desk job'
    },
    { 
      id: 'lightly_active', 
      label: 'Lightly Active', 
      icon: <PersonStanding size={20} />,
      description: 'Light exercise 1-3 days/week'
    },
    { 
      id: 'active', 
      label: 'Active', 
      icon: <User size={20} />,
      description: 'Moderate exercise 3-5 days/week'
    },
    { 
      id: 'very_active', 
      label: 'Very Active', 
      icon: <UserRun size={20} />,
      description: 'Hard exercise 6-7 days/week'
    },
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
        <h2 className="text-2xl font-bold mb-2">What's your activity level?</h2>
        <p className="text-dark-300 mb-6">
          This helps us calculate your energy expenditure and nutritional needs.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 mt-4"
      >
        {activityLevels.map((level) => (
          <motion.div key={level.id} variants={itemVariants}>
            <div 
              className={`
                p-4 rounded-lg cursor-pointer
                border ${value === level.id ? 'border-primary-500 bg-dark-800' : 'border-dark-700 bg-dark-900'}
                hover:border-primary-500/70 transition-all duration-200
              `}
              onClick={() => onChange(level.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary-500">{level.icon}</div>
                <div>
                  <div className="font-medium">{level.label}</div>
                  <div className="text-sm text-dark-400 mt-1">{level.description}</div>
                </div>
                {value === level.id && (
                  <div className="ml-auto mt-1">
                    <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L4.5 7.5L11 1" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ActivityStep;