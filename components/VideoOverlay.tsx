
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { VideoData } from '@/data/mockVideos';

interface VideoOverlayProps {
  video: VideoData;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  isLiked: boolean;
}

export default function VideoOverlay({ 
  video, 
  onLike, 
  onComment, 
  onShare,
  isLiked 
}: VideoOverlayProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomSection}>
        <View style={styles.userInfo}>
          <Image source={{ uri: video.userAvatar }} style={styles.avatar} />
          <Text style={styles.username}>{video.username}</Text>
        </View>
        <Text style={styles.description}>{video.description}</Text>
      </View>

      <View style={styles.rightSection}>
        <Pressable style={styles.actionButton} onPress={onLike}>
          <IconSymbol 
            name={isLiked ? "heart.fill" : "heart"} 
            size={32} 
            color={isLiked ? colors.primary : '#FFFFFF'} 
          />
          <Text style={styles.actionText}>{formatNumber(video.likes)}</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={onComment}>
          <IconSymbol name="bubble.left.fill" size={32} color="#FFFFFF" />
          <Text style={styles.actionText}>{formatNumber(video.comments)}</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={onShare}>
          <IconSymbol name="arrowshape.turn.up.right.fill" size={32} color="#FFFFFF" />
          <Text style={styles.actionText}>{formatNumber(video.shares)}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    maxWidth: '75%',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 12,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  rightSection: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    gap: 24,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
