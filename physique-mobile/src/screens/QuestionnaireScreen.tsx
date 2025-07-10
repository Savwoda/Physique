import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import SelectionCard from '../components/ui/SelectionCard';
import { Colors } from '../constants/Colors';

type QuestionnaireScreenProps = {
  navigation: StackNavigationProp<any>;
};

const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    age: 30,
    goals: [] as string[],
  });

  const totalSteps = 5; // Simplified for demo

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigation.navigate('PhotoUpload');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const updateGender = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(id => id !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const renderGenderStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What's your gender?</Text>
      <Text style={styles.stepDescription}>
        We use this to provide more accurate body analysis and recommendations.
      </Text>
      
      <View style={styles.optionsContainer}>
        {[
          { id: 'male', label: 'Male', icon: <Ionicons name="male" size={20} color={Colors.primary[500]} /> },
          { id: 'female', label: 'Female', icon: <Ionicons name="female" size={20} color={Colors.primary[500]} /> },
          { id: 'other', label: 'Other', icon: <Ionicons name="people" size={20} color={Colors.primary[500]} /> },
        ].map((option) => (
          <SelectionCard
            key={option.id}
            id={option.id}
            label={option.label}
            icon={option.icon}
            isSelected={formData.gender === option.id}
            onPress={() => updateGender(option.id)}
          />
        ))}
      </View>
    </View>
  );

  const renderGoalsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What are your fitness goals?</Text>
      <Text style={styles.stepDescription}>
        Select all that apply. This helps us create your personalized plan.
      </Text>
      
      <View style={styles.optionsContainer}>
        {[
          { id: 'lose_fat', label: 'Lose fat', icon: <Ionicons name="flame" size={20} color={Colors.primary[500]} /> },
          { id: 'build_muscle', label: 'Build muscle', icon: <Ionicons name="barbell" size={20} color={Colors.primary[500]} /> },
          { id: 'maintain', label: 'Maintain', icon: <Ionicons name="scale" size={20} color={Colors.primary[500]} /> },
          { id: 'improve_posture', label: 'Improve posture', icon: <Ionicons name="body" size={20} color={Colors.primary[500]} /> },
          { id: 'boost_confidence', label: 'Boost confidence', icon: <Ionicons name="sparkles" size={20} color={Colors.primary[500]} /> },
        ].map((goal) => (
          <SelectionCard
            key={goal.id}
            id={goal.id}
            label={goal.label}
            icon={goal.icon}
            isSelected={formData.goals.includes(goal.id)}
            onPress={() => toggleGoal(goal.id)}
            multiSelect
          />
        ))}
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderGenderStep();
      case 2:
        return renderGoalsStep();
      default:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step {currentStep}</Text>
            <Text style={styles.stepDescription}>
              This is a placeholder for step {currentStep}. More questions would be implemented here.
            </Text>
          </View>
        );
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.gender !== '';
      case 2:
        return formData.goals.length > 0;
      default:
        return true;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="secondary"
          leftIcon={<Ionicons name="arrow-back" size={18} color={Colors.white} />}
        />
        <Button
          title={currentStep === totalSteps ? 'Continue' : 'Next'}
          onPress={handleNext}
          disabled={!isStepValid()}
          rightIcon={<Ionicons name="arrow-forward" size={18} color={Colors.dark[950]} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark[950],
  },
  header: {
    padding: 16,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepContainer: {
    paddingBottom: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: Colors.dark[300],
    marginBottom: 24,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 16,
  },
});

export default QuestionnaireScreen;