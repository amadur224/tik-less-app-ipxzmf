
import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ViewToken, Alert } from 'react-native';
import { Stack } from 'expo-router';
import VideoPlayer from '@/components/VideoPlayer';
import VideoOverlay from '@/components/VideoOverlay';
import { mockVideos, VideoData } from '@/data/mockVideos';
import { colors } from '@/styles/commonStyles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (index !== null) {
        setActiveVideoIndex(index);
      }
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleLike = (videoId: string) => {
    setLikedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const handleComment = () => {
    Alert.alert('Comments', 'Comments feature coming soon!');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share feature coming soon!');
  };

  const renderItem = ({ item, index }: { item: VideoData; index: number }) => {
    const isActive = index === activeVideoIndex;
    const isLiked = likedVideos.has(item.id);

    return (
      <View style={styles.videoContainer}>
        <VideoPlayer uri={item.uri} isActive={isActive} />
        <VideoOverlay
          video={item}
          onLike={() => handleLike(item.id)}
          onComment={handleComment}
          onShare={handleShare}
          isLiked={isLiked}
        />
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={mockVideos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          snapToInterval={SCREEN_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          removeClippedSubviews
          maxToRenderPerBatch={2}
          windowSize={3}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
  },
});
