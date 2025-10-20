
export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Anime {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  coverImage: {
    extraLarge: string;
    color: string;
  };
  description: string;
  episodes: number;
}

export interface WatchProgress {
  userId: string;
  anilistId: number;
  episodeNumber: number;
  watchedSeconds: number;
  durationSeconds: number;
}

export interface Override {
  id: string;
  type: 'global' | 'anime';
  anilistId?: number;
  source: string;
  urlTemplate: string;
}

export interface Report {
  id: string;
  userId?: string;
  animeId: number;
  episodeNumber: number;
  issueType: string;
  description: string;
  status: 'open' | 'closed';
  createdAt: string;
}
