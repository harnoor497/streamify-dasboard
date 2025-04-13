import { faker } from '@faker-js/faker';

// Define real artists and their songs
const artistsData = {
  'Taylor Swift': {
    genre: 'Pop',
    songs: [
      'Anti-Hero',
      'Cruel Summer',
      'Love Story',
      'Shake It Off',
      'Blank Space',
      'Cardigan',
      'Wildest Dreams'
    ]
  },
  'Diljit Dosanjh': {
    genre: 'Punjabi',
    songs: [
      'Lover',
      'Proper Patola',
      'Born To Shine',
      'G.O.A.T.',
      'Vibe',
      'Kinni Kinni'
    ]
  },
  'Ed Sheeran': {
    genre: 'Pop',
    songs: [
      'Shape of You',
      'Perfect',
      'Thinking Out Loud',
      'Bad Habits',
      'Castle on the Hill'
    ]
  },
  'Drake': {
    genre: 'Hip Hop',
    songs: [
      'God\'s Plan',
      'Hotline Bling',
      'One Dance',
      'In My Feelings',
      'Started From the Bottom'
    ]
  },
  'BTS': {
    genre: 'K-Pop',
    songs: [
      'Dynamite',
      'Butter',
      'Boy With Luv',
      'DNA',
      'Fake Love'
    ]
  },
  'The Weeknd': {
    genre: 'Pop/R&B',
    songs: [
      'Blinding Lights',
      'Starboy',
      'Save Your Tears',
      'Die For You',
      'Call Out My Name'
    ]
  }
};

interface User {
  id: string;
  name: string;
  email: string;
  subscriptionType: 'Free' | 'Premium' | 'Family';
  joinDate: Date;
  lastActive: Date;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  album: string;
  duration: number;
  releaseDate: Date;
}

interface Stream {
  id: string;
  userId: string;
  songId: string;
  timestamp: Date;
  device: 'Mobile' | 'Desktop' | 'Tablet' | 'Smart Speaker';
  country: string;
}

// Generate mock user data
const generateUsers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `user${i + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    subscriptionType: faker.helpers.arrayElement(['Free', 'Premium', 'Family']),
    joinDate: faker.date.past({ years: 2 }),
    lastActive: faker.date.recent({ days: 30 }),
  }));
};

// Generate mock song data
const generateSongs = () => {
  return Object.entries(artistsData).flatMap(([artist, data]) => 
    data.songs.map(songTitle => ({
      id: faker.string.uuid(),
      title: songTitle,
      artist: artist,
      genre: data.genre,
      album: songTitle, // We could add real album names if needed
      duration: faker.number.int({ min: 180, max: 300 }),
      releaseDate: faker.date.past({ years: 3 }),
    }))
  );
};

// Generate mock stream data
const generateStreams = (count: number, users: Array<{ id: string }>, songs: Array<{ id: string }>) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `stream${i + 1}`,
    userId: faker.helpers.arrayElement(users).id,
    songId: faker.helpers.arrayElement(songs).id,
    timestamp: faker.date.recent({ days: 30 }),
    device: faker.helpers.arrayElement(['Mobile', 'Desktop', 'Tablet', 'Smart Speaker']),
    country: faker.helpers.arrayElement([
      'United States', 'India', 'United Kingdom', 'Canada', 
      'Australia', 'South Korea', 'Japan', 'Germany'
    ]),
  }));
};

// Generate monthly metrics
const generateMonthlyMetrics = () => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date;
  }).reverse();

  return months.map((date, index) => ({
    month: date.toLocaleString('default', { month: 'short' }),
    totalUsers: Math.floor(1000000 * (1 + index * 0.1)),
    activeUsers: Math.floor(650000 * (1 + index * 0.08)),
    totalStreams: Math.floor(45000000 * (1 + index * 0.12)),
    revenue: Math.floor(12500000 * (1 + index * 0.15)),
  }));
};

// Generate revenue distribution
const generateRevenueDistribution = () => {
  return [
    { name: 'Subscriptions', value: 8000000 },
    { name: 'Ads', value: 3000000 },
    { name: 'Merchandise', value: 1000000 },
    { name: 'Events', value: 500000 },
  ];
};

// Generate top songs with proper typing
const generateTopSongs = (songs: Song[], streams: Stream[]) => {
  const songStreams = streams.reduce<Record<string, number>>((acc, stream) => {
    acc[stream.songId] = (acc[stream.songId] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(songStreams)
    .map(([songId, count]) => {
      const song = songs.find(s => s.id === songId);
      return {
        id: songId,
        title: song?.title,
        artist: song?.artist,
        streams: count,
      };
    })
    .sort((a, b) => b.streams - a.streams)
    .slice(0, 5);
};

// Generate all mock data
export const generateMockData = () => {
  const users = generateUsers(1000);
  const songs = generateSongs();
  const streams = generateStreams(10000, users, songs);
  const monthlyMetrics = generateMonthlyMetrics();
  const revenueDistribution = generateRevenueDistribution();
  const topSongs = generateTopSongs(songs, streams);

  return {
    users,
    songs,
    streams,
    monthlyMetrics,
    revenueDistribution,
    topSongs,
    currentMetrics: {
      totalUsers: users.length,
      activeUsers: users.filter(u => 
        new Date(u.lastActive).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
      ).length,
      totalStreams: streams.length,
      revenue: revenueDistribution.reduce((sum, item) => sum + item.value, 0),
      topArtist: songs.reduce((acc: any, song) => {
        acc[song.artist] = (acc[song.artist] || 0) + 1;
        return acc;
      }, {})[0]?.artist || 'Unknown',
    },
  };
};

// Export a singleton instance of the mock data
export const mockData = generateMockData(); 