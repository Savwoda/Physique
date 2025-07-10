import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const getSizes = () => {
    switch (size) {
      case 'sm':
        return { iconSize: 20, fontSize: 18 };
      case 'lg':
        return { iconSize: 40, fontSize: 32 };
      default:
        return { iconSize: 28, fontSize: 24 };
    }
  };

  const { iconSize, fontSize } = getSizes();

  return (
    <View style={styles.container}>
      <Ionicons name="fitness" size={iconSize} color={Colors.primary[500]} />
      <Text style={[styles.text, { fontSize }]}>
        Physique<Text style={styles.accent}>AI</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  accent: {
    color: Colors.primary[500],
  },
});

export default Logo;