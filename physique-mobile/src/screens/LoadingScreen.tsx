import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

import Logo from '../components/ui/Logo';
import { Colors } from '../constants/Colors';

type LoadingScreenProps = {
  navigation: StackNavigationProp<any>;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ navigation }) => {
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    // Navigate to results after 5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Results');
    }, 5000);

    // Start animations
    scale1.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );

    scale2.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
        withTiming(1, { duration: 400 })
      ),
      -1
    );

    scale3.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
        withTiming(1, { duration: 200 })
      ),
      -1
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.5, { duration: 1000 })
      ),
      -1
    );

    return () => clearTimeout(timer);
  }, [navigation]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
    opacity: opacity.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
    opacity: opacity.value * 0.7,
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
    opacity: opacity.value * 0.4,
  }));

  const steps = [
    'Analyzing body proportions...',
    'Identifying areas for improvement...',
    'Generating personalized recommendations...',
    'Finalizing your results...',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Analyzing your physique...</Text>
        <Text style={styles.description}>
          Our AI is processing your data to provide personalized insights and recommendations.
        </Text>

        <View style={styles.animationContainer}>
          <Animated.View style={[styles.circle, styles.circle3, animatedStyle3]} />
          <Animated.View style={[styles.circle, styles.circle2, animatedStyle2]} />
          <Animated.View style={[styles.circle, styles.circle1, animatedStyle1]} />
          <View style={styles.centerDot} />
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={styles.stepDot} />
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.dark[300],
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 22,
  },
  animationContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  circle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.primary[500],
    borderRadius: 100,
  },
  circle1: {
    width: 80,
    height: 80,
  },
  circle2: {
    width: 120,
    height: 120,
  },
  circle3: {
    width: 160,
    height: 160,
  },
  centerDot: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary[500],
    borderRadius: 20,
  },
  stepsContainer: {
    width: '100%',
    gap: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.primary[500],
    borderRadius: 4,
  },
  stepText: {
    fontSize: 14,
    color: Colors.dark[300],
  },
});

export default LoadingScreen;