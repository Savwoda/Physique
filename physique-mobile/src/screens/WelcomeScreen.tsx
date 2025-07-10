import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import { Colors } from '../constants/Colors';

type WelcomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Questionnaire');
  };

  const features = [
    { icon: 'flash', text: 'Accurate Analysis' },
    { icon: 'trophy', text: 'Expert Recommendations' },
    { icon: 'heart', text: 'Personalized Plan' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Logo />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            Let's help you build your{' '}
            <Text style={styles.accent}>best physique</Text>.
          </Text>

          <Text style={styles.description}>
            Our AI-powered analysis helps you understand your body and provides
            personalized recommendations to achieve your fitness goals.
          </Text>

          <View style={styles.heroContainer}>
            <View style={styles.heroCard}>
              <Text style={styles.heroEmoji}>💪</Text>
            </View>
          </View>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.feature}>
                <Ionicons
                  name={feature.icon as any}
                  size={24}
                  color={Colors.primary[500]}
                />
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>

          <Button
            title="Get Started"
            onPress={handleGetStarted}
            size="lg"
            fullWidth
            rightIcon={<Ionicons name="arrow-forward" size={20} color={Colors.dark[950]} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark[950],
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  accent: {
    color: Colors.primary[500],
  },
  description: {
    fontSize: 18,
    color: Colors.dark[300],
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  heroContainer: {
    marginBottom: 48,
  },
  heroCard: {
    width: 200,
    height: 200,
    backgroundColor: Colors.dark[800],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  heroEmoji: {
    fontSize: 64,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 48,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontSize: 12,
    color: Colors.dark[300],
    textAlign: 'center',
    marginTop: 8,
  },
});

export default WelcomeScreen;