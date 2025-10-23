
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

type MediaType = 'video' | 'audio' | null;

export default function UploadScreen() {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<MediaType>(null);
  const [mediaName, setMediaName] = useState<string>('');
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
      videoMaxDuration: 180, // 3 minutes max
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedMedia(result.assets[0].uri);
      setMediaType('video');
      setMediaName(result.assets[0].fileName || 'video.mp4');
      console.log('Video selected:', result.assets[0].uri);
    }
  };

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*'],
        copyToCacheDirectory: true,
      });

      console.log('Document picker result:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        setSelectedMedia(result.assets[0].uri);
        setMediaType('audio');
        setMediaName(result.assets[0].name || 'audio.mp3');
        console.log('Audio selected:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking audio:', error);
      Alert.alert('Error', 'Failed to pick audio file. Please try again.');
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
      videoMaxDuration: 180, // 3 minutes max
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedMedia(result.assets[0].uri);
      setMediaType('video');
      setMediaName(result.assets[0].fileName || 'video.mp4');
      console.log('Video recorded:', result.assets[0].uri);
    }
  };

  const handleUpload = () => {
    if (!selectedMedia) {
      Alert.alert('No Media Selected', 'Please select a video or audio file first.');
      return;
    }

    const mediaTypeText = mediaType === 'video' ? 'video' : 'audio';
    Alert.alert(
      'Upload Successful!',
      `Your ${mediaTypeText} has been uploaded successfully.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedMedia(null);
            setMediaType(null);
            setMediaName('');
            setDescription('');
          },
        },
      ]
    );
  };

  const getMediaIcon = () => {
    if (mediaType === 'video') {
      return 'play.circle.fill';
    } else if (mediaType === 'audio') {
      return 'waveform.circle.fill';
    }
    return 'play.circle.fill';
  };

  const getMediaTypeText = () => {
    if (mediaType === 'video') {
      return 'Video Selected';
    } else if (mediaType === 'audio') {
      return 'Audio Selected';
    }
    return 'Media Selected';
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Upload Media</Text>
        <Text style={styles.subtitle}>Share your videos or audio content</Text>

        {!selectedMedia ? (
          <View style={styles.uploadSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="video.fill" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Video</Text>
            </View>

            <Pressable style={styles.uploadButton} onPress={pickVideo}>
              <IconSymbol name="photo.on.rectangle" size={48} color={colors.primary} />
              <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
              <Text style={styles.uploadButtonSubtext}>Select a video file</Text>
            </Pressable>

            <Pressable style={[styles.uploadButton, styles.recordButton]} onPress={recordVideo}>
              <IconSymbol name="video.fill" size={48} color={colors.secondary} />
              <Text style={styles.uploadButtonText}>Record Video</Text>
              <Text style={styles.uploadButtonSubtext}>Record a new video</Text>
            </Pressable>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.sectionHeader}>
              <IconSymbol name="waveform" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Audio</Text>
            </View>

            <Pressable style={[styles.uploadButton, styles.audioButton]} onPress={pickAudio}>
              <IconSymbol name="music.note" size={48} color="#9333EA" />
              <Text style={styles.uploadButtonText}>Choose Audio File</Text>
              <Text style={styles.uploadButtonSubtext}>Select an audio file (MP3, WAV, etc.)</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.previewSection}>
            <View style={[
              styles.mediaPreview,
              mediaType === 'audio' && styles.audioPreview
            ]}>
              <IconSymbol 
                name={getMediaIcon()} 
                size={64} 
                color={mediaType === 'audio' ? '#9333EA' : colors.primary} 
              />
              <Text style={styles.mediaSelectedText}>{getMediaTypeText()}</Text>
              {mediaName && (
                <Text style={styles.mediaNameText} numberOfLines={1}>
                  {mediaName}
                </Text>
              )}
            </View>

            <Pressable 
              style={styles.changeButton} 
              onPress={mediaType === 'video' ? pickVideo : pickAudio}
            >
              <Text style={styles.changeButtonText}>Change {mediaType === 'video' ? 'Video' : 'Audio'}</Text>
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
              <IconSymbol name="arrow.up.circle.fill" size={24} color="#FFFFFF" />
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  uploadSection: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  uploadButton: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    boxShadow: '0px 4px 12px rgba(13, 92, 77, 0.15)',
    elevation: 4,
  },
  recordButton: {
    borderColor: colors.secondary,
    boxShadow: '0px 4px 12px rgba(212, 175, 55, 0.15)',
  },
  audioButton: {
    borderColor: '#9333EA',
    boxShadow: '0px 4px 12px rgba(147, 51, 234, 0.15)',
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  uploadButtonSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  previewSection: {
    gap: 16,
  },
  mediaPreview: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 48,
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    boxShadow: '0px 4px 12px rgba(13, 92, 77, 0.15)',
    elevation: 4,
  },
  audioPreview: {
    borderColor: '#9333EA',
    boxShadow: '0px 4px 12px rgba(147, 51, 234, 0.15)',
  },
  mediaSelectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  mediaNameText: {
    fontSize: 13,
    color: colors.textSecondary,
    maxWidth: '80%',
    textAlign: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
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
