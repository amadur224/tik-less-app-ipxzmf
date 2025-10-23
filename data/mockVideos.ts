
export interface VideoData {
  id: string;
  uri: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  userAvatar: string;
}

export const mockVideos: VideoData[] = [
  {
    id: '1',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    username: '@nature_lover',
    description: 'Beautiful nature scenes 🌿 #nature #peaceful',
    likes: 12500,
    comments: 342,
    shares: 89,
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    username: '@creative_mind',
    description: 'Amazing animation work! 🎨 #art #animation',
    likes: 8900,
    comments: 234,
    shares: 56,
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    username: '@adventure_seeker',
    description: 'Epic moments captured 🔥 #adventure #epic',
    likes: 15600,
    comments: 456,
    shares: 123,
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    username: '@travel_diary',
    description: 'Escape to paradise 🏝️ #travel #vacation',
    likes: 20100,
    comments: 678,
    shares: 234,
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
  },
  {
    id: '5',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    username: '@fun_times',
    description: 'Having the best time! 🎉 #fun #party',
    likes: 9800,
    comments: 289,
    shares: 67,
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];
