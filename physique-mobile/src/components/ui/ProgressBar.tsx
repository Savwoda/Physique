import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = useSharedValue(0);
  const progressPercentage = (currentStep / totalSteps) * 100;

  useEffect(() => {
    progress.value = withTiming(progressPercentage / 100, { duration: 300 });
  }, [currentStep, totalSteps, progressPercentage]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.stepText}>
          Step {currentStep} of {totalSteps}
        </Text>
        <Text style={styles.percentageText}>
          {Math.round(progressPercentage)}%
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 12,
    color: Colors.dark[300],
  },
  percentageText: {
    fontSize: 12,
    color: Colors.dark[300],
  },
  progressContainer: {
    height: 8,
    backgroundColor: Colors.dark[800],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: 4,
  },
});

export default ProgressBar;