import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import { Colors } from '../constants/Colors';

type PhotoUploadScreenProps = {
  navigation: StackNavigationProp<any>;
};

const PhotoUploadScreen: React.FC<PhotoUploadScreenProps> = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'We need access to your photos to analyze your physique.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'We need access to your camera to take photos for analysis.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    navigation.navigate('Loading');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Take or Upload a Photo</Text>
        <Text style={styles.description}>
          For the most accurate analysis, please follow these guidelines.
        </Text>

        <View style={styles.guidelinesContainer}>
          <View style={styles.guidelineHeader}>
            <Ionicons name="information-circle" size={20} color={Colors.primary[500]} />
            <Text style={styles.guidelineTitle}>For best results:</Text>
          </View>
          <View style={styles.guidelinesList}>
            <Text style={styles.guideline}>• Stand straight with arms at your sides</Text>
            <Text style={styles.guideline}>• Wear form-fitting clothes (or minimal clothing)</Text>
            <Text style={styles.guideline}>• Use a neutral background</Text>
            <Text style={styles.guideline}>• Ensure good lighting</Text>
            <Text style={styles.guideline}>• Take both front and side photos if possible</Text>
          </View>
        </View>

        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.removeButtonText}>Remove Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadContainer}>
            <View style={styles.uploadCard}>
              <Ionicons name="cloud-upload" size={48} color={Colors.primary[500]} />
              <Text style={styles.uploadTitle}>Drag & drop your photo here</Text>
              <Text style={styles.uploadSubtitle}>or select a file from your device</Text>
              
              <View style={styles.uploadButtons}>
                <Button
                  title="Upload Photo"
                  onPress={pickImage}
                  leftIcon={<Ionicons name="image" size={18} color={Colors.dark[950]} />}
                  style={styles.uploadButton}
                />
                <Button
                  title="Take Photo"
                  onPress={takePhoto}
                  variant="secondary"
                  leftIcon={<Ionicons name="camera" size={18} color={Colors.white} />}
                  style={styles.uploadButton}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Back"
          onPress={handleBack}
          variant="secondary"
          leftIcon={<Ionicons name="arrow-back" size={18} color={Colors.white} />}
        />
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedImage}
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.dark[300],
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  guidelinesContainer: {
    backgroundColor: Colors.dark[900],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  guidelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  guidelineTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
  guidelinesList: {
    gap: 8,
  },
  guideline: {
    fontSize: 14,
    color: Colors.dark[300],
    lineHeight: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  selectedImage: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 16,
  },
  removeButton: {
    backgroundColor: Colors.dark[800],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  uploadContainer: {
    marginBottom: 24,
  },
  uploadCard: {
    borderWidth: 2,
    borderColor: Colors.dark[700],
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    minHeight: 300,
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.white,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  uploadSubtitle: {
    fontSize: 14,
    color: Colors.dark[400],
    marginBottom: 24,
    textAlign: 'center',
  },
  uploadButtons: {
    gap: 12,
    width: '100%',
  },
  uploadButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 16,
  },
});

export default PhotoUploadScreen;