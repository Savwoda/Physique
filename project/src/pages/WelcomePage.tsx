import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Zap, Heart } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/questionnaire');
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <header className="p-4 md:p-6">
        <Logo />
      </header>

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's help you build your <span className="text-primary-500">best physique</span>.
          </h1>
          
          <p className="text-dark-300 mb-8 text-lg">
            Our AI-powered analysis helps you understand your body and provides personalized recommendations to achieve your fitness goals.
          </p>

          <div className="flex justify-center mb-12">
            <motion.div 
              className="w-64 h-64 bg-dark-800 rounded-xl flex items-center justify-center overflow-hidden relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent"></div>
              <div className="text-6xl">💪</div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: <Zap className="text-primary-500" />, text: "Accurate Analysis" },
              { icon: <Award className="text-primary-500" />, text: "Expert Recommendations" },
              { icon: <Heart className="text-primary-500" />, text: "Personalized Plan" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="mb-2">{feature.icon}</div>
                <div className="text-sm text-dark-300">{feature.text}</div>
              </motion.div>
            ))}
          </div>

          <Button 
            size="lg" 
            onClick={handleGetStarted}
            rightIcon={<ArrowRight size={20} />}
            className="mt-4"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;