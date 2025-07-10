import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/ui/Logo';

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate analysis delay and navigate to results
    const timer = setTimeout(() => {
      navigate('/results');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Animation variants
  const circleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <header className="p-4">
        <Logo />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <h2 className="text-2xl font-bold mb-3">Analyzing your physique...</h2>
          <p className="text-dark-300 mb-10">
            Our AI is processing your data to provide personalized insights and recommendations.
          </p>
        </motion.div>

        <div className="relative w-48 h-48 mb-10">
          {/* Circles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-primary-500/40"
              initial={{ scale: 1, opacity: 0.4 }}
              variants={circleVariants}
              animate="animate"
              custom={i}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}

          {/* Center pulse */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary-500/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary-500/30 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.2426 3.75736C24.5858 8.10051 24.5858 15.0248 20.2426 19.3679C15.8995 23.7111 8.97514 23.7111 4.63203 19.3679C0.288921 15.0248 0.288921 8.10051 4.63203 3.75736" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-2 w-full max-w-md">
          {/* Progress steps */}
          {[
            "Analyzing body proportions...",
            "Identifying areas for improvement...",
            "Generating personalized recommendations...",
            "Finalizing your results..."
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.8, duration: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary-500 mr-3"></div>
              <motion.p 
                className="text-dark-300 text-sm"
                variants={textVariants}
                animate="animate"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {step}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;