import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface SelectionCardProps {
  id: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  multiSelect?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const SelectionCard: React.FC<SelectionCardProps> = ({
  label,
  isSelected,
  onPress,
  icon,
  multiSelect = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.label}>{label}</Text>
        {isSelected && (
          <View style={styles.checkContainer}>
            {multiSelect ? (
              <View style={styles.checkbox}>
                <Ionicons name="checkmark" size={16} color={Colors.dark[950]} />
              </View>
            ) : (
              <Ionicons name="checkmark" size={20} color={Colors.primary[500]} />
            )}
          </View>
        )}
      </View>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark[900],
    borderWidth: 1,
    borderColor: Colors.dark[700],
    borderRadius: 8,
    padding: 16,
  },
  selectedContainer: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.dark[800],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    color: Colors.primary[500],
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  checkContainer: {
    marginLeft: 'auto',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectionCard;