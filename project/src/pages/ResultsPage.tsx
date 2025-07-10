import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  AlignVerticalJustifyCenter, 
  FileBarChart, 
  ArrowRight,
  ArrowDownToLine
} from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/photo-upload');
  };

  const score = 75;
  const improvements = [
    {
      title: "Shoulder Alignment",
      description: "Your right shoulder is slightly higher than your left. This may be causing muscle imbalances.",
      icon: <AlignVerticalJustifyCenter size={20} />,
    },
    {
      title: "Posture",
      description: "Forward head posture detected, which can lead to neck strain and upper back issues.",
      icon: <FileBarChart size={20} />,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <header className="p-4">
        <Logo />
      </header>

      <div className="flex-1 flex flex-col px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-lg mx-auto w-full"
        >
          <h2 className="text-2xl font-bold mb-2">Your Physique Analysis</h2>
          <p className="text-dark-300 mb-6">
            Based on your photo and profile information, we've identified these key insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-lg mx-auto w-full bg-dark-900 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium mb-1">Physique Score</h3>
              <p className="text-sm text-dark-400">Based on proportions and alignment</p>
            </div>
            <div className="relative">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="#2A2A2A"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="#FFC107"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={36 * 2 * Math.PI}
                  strokeDashoffset={36 * 2 * Math.PI * (1 - score / 100)}
                  initial={{ strokeDashoffset: 36 * 2 * Math.PI }}
                  animate={{ strokeDashoffset: 36 * 2 * Math.PI * (1 - score / 100) }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  className="text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {score}
                </motion.span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-3">Areas for Improvement</h3>
            <div className="space-y-4">
              {improvements.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-dark-800 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  <div className="mt-1 text-primary-500">{item.icon}</div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-dark-400 mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              <div className="text-sm text-dark-400">Overall Assessment</div>
              <div className="font-medium text-primary-500">Good with room to improve</div>
            </div>
            <Button 
              size="sm" 
              rightIcon={<ArrowDownToLine size={16} />}
            >
              Save Report
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="max-w-lg mx-auto w-full bg-primary-500/10 border border-primary-500/20 rounded-xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-primary-500">Recommended Next Steps</h3>
            <div className="bg-primary-500 rounded-full p-1">
              <ArrowUpRight size={16} className="text-dark-950" />
            </div>
          </div>
          
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
              <span className="text-white">Schedule a posture correction session</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
              <span className="text-white">Follow our shoulder alignment workout program</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
              <span className="text-white">Track your progress with weekly photo updates</span>
            </li>
          </ul>

          <Button fullWidth rightIcon={<ArrowRight size={18} />}>
            View Detailed Recommendations
          </Button>
        </motion.div>
      </div>

      <div className="p-4 md:p-6">
        <Button
          variant="secondary"
          onClick={handleBack}
          leftIcon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;