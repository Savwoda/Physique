import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import { Colors } from '../constants/Colors';

type ResultsScreenProps = {
  navigation: StackNavigationProp<any>;
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ navigation }) => {
  const progressValue = useSharedValue(0);
  const score = 75;

  useEffect(() => {
    progressValue.value = withDelay(500, withTiming(score / 100, { duration: 1500 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progressValue.value,
  }));

  const improvements = [
    {
      title: 'Shoulder Alignment',
      description: 'Your right shoulder is slightly higher than your left. This may be causing muscle imbalances.',
      icon: 'body',
    },
    {
      title: 'Posture',
      description: 'Forward head posture detected, which can lead to neck strain and upper back issues.',
      icon: 'analytics',
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Physique Analysis</Text>
        <Text style={styles.description}>
          Based on your photo and profile information, we've identified these key insights.
        </Text>

        <View style={styles.scoreContainer}>
          <View style={styles.scoreHeader}>
            <View>
              <Text style={styles.scoreTitle}>Physique Score</Text>
              <Text style={styles.scoreSubtitle}>Based on proportions and alignment</Text>
            </View>
            <View style={styles.scoreCircle}>
              <Svg width={80} height={80}>
                <Circle
                  cx={40}
                  cy={40}
                  r={36}
                  stroke={Colors.dark[800]}
                  strokeWidth={8}
                  fill="none"
                />
                <Circle
                  cx={40}
                  cy={40}
                  r={36}
                  stroke={Colors.primary[500]}
                  strokeWidth={8}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${36 * 2 * Math.PI}`}
                  strokeDashoffset={36 * 2 * Math.PI * (1 - score / 100)}
                />
              </Svg>
              <Animated.View style={[styles.scoreText, animatedStyle]}>
                <Text style={styles.scoreNumber}>{score}</Text>
              </Animated.View>
            </View>
          </View>

          <View style={styles.improvementsContainer}>
            <Text style={styles.improvementsTitle}>Areas for Improvement</Text>
            {improvements.map((item, index) => (
              <View key={index} style={styles.improvementItem}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={Colors.primary[500]}
                />
                <View style={styles.improvementContent}>
                  <Text style={styles.improvementTitle}>{item.title}</Text>
                  <Text style={styles.improvementDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.assessmentContainer}>
            <View>
              <Text style={styles.assessmentLabel}>Overall Assessment</Text>
              <Text style={styles.assessmentValue}>Good with room to improve</Text>
            </View>
            <Button
              title="Save Report"
              onPress={() => {}}
              size="sm"
              rightIcon={<Ionicons name="download" size={16} color={Colors.dark[950]} />}
            />
          </View>
        </View>

        <View style={styles.recommendationsContainer}>
          <View style={styles.recommendationsHeader}>
            <Text style={styles.recommendationsTitle}>Recommended Next Steps</Text>
            <Ionicons name="trending-up" size={20} color={Colors.primary[500]} />
          </View>

          <View style={styles.recommendationsList}>
            {[
              'Schedule a posture correction session',
              'Follow our shoulder alignment workout program',
              'Track your progress with weekly photo updates',
            ].map((recommendation, index) => (
              <View key={index} style={styles.recommendationItem}>
                <View style={styles.recommendationDot} />
                <Text style={styles.recommendationText}>{recommendation}</Text>
              </View>
            ))}
          </View>

          <Button
            title="View Detailed Recommendations"
            onPress={() => {}}
            fullWidth
            rightIcon={<Ionicons name="arrow-forward" size={18} color={Colors.dark[950]} />}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="secondary"
          leftIcon={<Ionicons name="arrow-back" size={18} color={Colors.white} />}
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.dark[300],
    marginBottom: 24,
    lineHeight: 22,
  },
  scoreContainer: {
    backgroundColor: Colors.dark[900],
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.white,
    marginBottom: 4,
  },
  scoreSubtitle: {
    fontSize: 14,
    color: Colors.dark[400],
  },
  scoreCircle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  improvementsContainer: {
    marginBottom: 24,
  },
  improvementsTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.white,
    marginBottom: 12,
  },
  improvementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.dark[800],
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  improvementContent: {
    flex: 1,
  },
  improvementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
    marginBottom: 4,
  },
  improvementDescription: {
    fontSize: 14,
    color: Colors.dark[400],
    lineHeight: 18,
  },
  assessmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assessmentLabel: {
    fontSize: 14,
    color: Colors.dark[400],
  },
  assessmentValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary[500],
  },
  recommendationsContainer: {
    backgroundColor: Colors.primary[500] + '1A',
    borderWidth: 1,
    borderColor: Colors.primary[500] + '33',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primary[500],
  },
  recommendationsList: {
    marginBottom: 24,
    gap: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  recommendationDot: {
    width: 6,
    height: 6,
    backgroundColor: Colors.primary[500],
    borderRadius: 3,
    marginTop: 6,
  },
  recommendationText: {
    flex: 1,
    fontSize: 16,
    color: Colors.white,
    lineHeight: 22,
  },
  footer: {
    padding: 24,
    paddingTop: 16,
  },
});

export default ResultsScreen;