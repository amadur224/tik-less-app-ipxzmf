
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import * as ImagePicker from 'expo-image-picker';

export default function UploadScreen() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera roll permissions to upload videos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 60,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedVideo(result.assets[0].uri);
    }
  };

  const recordVideo = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera permissions to record videos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 60,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedVideo(result.assets[0].uri);
    }
  };

  const handleUpload = () => {
    if (!selectedVideo) {
      Alert.alert('No Video Selected', 'Please select or record a video first.');
      return;
    }

    Alert.alert(
      'Upload Successful!',
      'Your video has been uploaded successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedVideo(null);
            setDescription('');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Upload Video</Text>

        {!selectedVideo ? (
          <View style={styles.uploadSection}>
            <Pressable style={styles.uploadButton} onPress={pickVideo}>
              <IconSymbol name="photo.on.rectangle" size={48} color={colors.primary} />
              <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
            </Pressable>

            <Pressable style={[styles.uploadButton, styles.recordButton]} onPress={recordVideo}>
              <IconSymbol name="video.fill" size={48} color={colors.secondary} />
              <Text style={styles.uploadButtonText}>Record Video</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.previewSection}>
            <View style={styles.videoPreview}>
              <IconSymbol name="play.circle.fill" size={64} color={colors.primary} />
              <Text style={styles.videoSelectedText}>Video Selected</Text>
            </View>

            <Pressable style={styles.changeButton} onPress={pickVideo}>
              <Text style={styles.changeButtonText}>Change Video</Text>
            </Pressable>

            <View style={styles.inputSection}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Add a description..."
                placeholderTextColor={colors.textSecondary}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                maxLength={150}
              />
              <Text style={styles.characterCount}>{description.length}/150</Text>
            </View>

            <Pressable style={styles.publishButton} onPress={handleUpload}>
              <Text style={styles.publishButtonText}>Publish</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  uploadSection: {
    gap: 16,
    marginTop: 40,
  },
  uploadButton: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    boxShadow: '0px 4px 12px rgba(13, 92, 77, 0.15)',
    elevation: 4,
  },
  recordButton: {
    borderColor: colors.secondary,
    boxShadow: '0px 4px 12px rgba(212, 175, 55, 0.15)',
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  previewSection: {
    gap: 16,
  },
  videoPreview: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 48,
    alignItems: 'center',
    gap: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    boxShadow: '0px 4px 12px rgba(13, 92, 77, 0.15)',
    elevation: 4,
  },
  videoSelectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  changeButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  changeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inputSection: {
    gap: 8,
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  characterCount: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  publishButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    boxShadow: '0px 4px 12px rgba(13, 92, 77, 0.3)',
    elevation: 4,
  },
  publishButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
