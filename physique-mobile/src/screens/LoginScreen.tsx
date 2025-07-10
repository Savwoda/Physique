import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Colors } from '../constants/Colors';

type LoginScreenProps = {
  navigation: StackNavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Welcome');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Logo size="lg" />
            <Text style={styles.title}>Sign in to your account</Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Ionicons name="mail" size={18} color={Colors.dark[400]} />}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Ionicons name="lock-closed" size={18} color={Colors.dark[400]} />}
              containerStyle={styles.passwordInput}
            />

            <Text style={styles.forgotPassword}>Forgot password?</Text>

            <Button
              title="Sign in"
              onPress={handleLogin}
              isLoading={isLoading}
              fullWidth
              rightIcon={<Ionicons name="arrow-forward" size={18} color={Colors.dark[950]} />}
              style={styles.signInButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <Button
                title="Google"
                onPress={() => {}}
                variant="outline"
                leftIcon={<Ionicons name="logo-google" size={18} color={Colors.primary[500]} />}
                style={styles.socialButton}
              />
              <Button
                title="Apple"
                onPress={() => {}}
                variant="outline"
                leftIcon={<Ionicons name="logo-apple" size={18} color={Colors.primary[500]} />}
                style={styles.socialButton}
              />
            </View>
          </View>

          <Text style={styles.signUpText}>
            Not a member?{' '}
            <Text style={styles.signUpLink}>Start your free trial</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark[950],
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 32,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: Colors.dark[900],
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPassword: {
    color: Colors.primary[500],
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 24,
  },
  signInButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark[700],
  },
  dividerText: {
    color: Colors.dark[400],
    fontSize: 14,
    paddingHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
  },
  signUpText: {
    color: Colors.dark[400],
    fontSize: 14,
    textAlign: 'center',
  },
  signUpLink: {
    color: Colors.primary[500],
    fontWeight: '500',
  },
});

export default LoginScreen;