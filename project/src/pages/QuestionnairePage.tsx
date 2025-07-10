import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import Logo from '../components/ui/Logo';
import TransitionPage from './questionnaire/TransitionPage';

// Import all step components
import GenderStep from './questionnaire/GenderStep';
import AgeStep from './questionnaire/AgeStep';
import HeightStep from './questionnaire/HeightStep';
import WeightStep from './questionnaire/WeightStep';
import GoalsStep from './questionnaire/GoalsStep';
import ActivityStep from './questionnaire/ActivityStep';
import MotivationStep from './questionnaire/MotivationStep';
import DailyHabitsStep from './questionnaire/DailyHabitsStep';
import FitnessGoalsStep from './questionnaire/FitnessGoalsStep';
import AspirationsStep from './questionnaire/AspirationsStep';

// Define the steps structure
const steps = [
  { type: 'question', component: GenderStep, key: 'gender' },
  { type: 'question', component: AgeStep, key: 'age' },
  { type: 'question', component: HeightStep, key: 'height' },
  { type: 'question', component: WeightStep, key: 'weight' },
  { type: 'question', component: GoalsStep, key: 'goals' },
  { type: 'question', component: ActivityStep, key: 'activityLevel' },
  { type: 'question', component: MotivationStep, key: 'motivations' },
  { 
    type: 'transition',
    title: "Now let's talk lifestyle",
    description: "Your daily habits affect your physique more than you think. Let's understand your routine.",
    emoji: "🌟"
  },
  { type: 'question', component: DailyHabitsStep, key: 'dailyHabits' },
  {
    type: 'transition',
    title: "Time to set your goals",
    description: "Let's get clear on where you want to go so we can help you get there.",
    emoji: "🎯"
  },
  { type: 'question', component: FitnessGoalsStep, key: 'fitnessGoals' },
  {
    type: 'transition',
    title: "What drives you?",
    description: "Your motivation and mindset shape your transformation. We're almost done!",
    emoji: "🚀"
  },
  { type: 'question', component: AspirationsStep, key: 'aspirations' },
];

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  // Questionnaire state
  const [formData, setFormData] = useState({
    gender: '',
    age: 30,
    height: { value: 175, unit: 'cm' },
    weight: { value: 70, unit: 'kg' },
    goals: [] as string[],
    activityLevel: '',
    motivations: [] as string[],
    dailyHabits: {
      sleep: '',
      water: '',
      meals: '',
      alcohol: '',
      smoking: '',
      fastFood: '',
      tracking: '',
    },
    fitnessGoals: {
      targetWeight: undefined as { value: number; unit: string } | undefined,
      currentProgram: '',
      workoutStyles: [] as string[],
      otherWorkoutStyle: '',
    },
    aspirations: {
      mainMotivation: '',
      commitment: '',
      barrier: '',
      adviceType: '',
    },
  });

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/photo-upload');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/welcome');
    }
  };

  const currentStepData = steps[currentStep - 1];

  if (currentStepData.type === 'transition') {
    return (
      <TransitionPage
        title={currentStepData.title}
        description={currentStepData.description}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        emoji={currentStepData.emoji}
      />
    );
  }

  const StepComponent = currentStepData.component;

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <header className="p-4">
        <Logo />
      </header>

      <div className="p-4 md:p-6">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <div className="flex-1 flex flex-col px-4 py-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-lg mx-auto w-full"
        >
          <StepComponent
            value={formData[currentStepData.key]}
            onChange={(value: any) => updateFormData(currentStepData.key, value)}
          />
        </motion.div>
      </div>

      <div className="p-4 md:p-6 flex justify-between">
        <Button
          variant="secondary"
          onClick={handleBack}
          leftIcon={<ArrowLeft size={18} />}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!formData[currentStepData.key]}
          rightIcon={<ArrowRight size={18} />}
        >
          {currentStep === totalSteps ? 'Continue' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionnairePage;