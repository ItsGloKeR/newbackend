// This is a MOCK service that simulates a backend.
// In a real application, this would make HTTP requests to your Node.js server.
import type { User, Anime, Override, Report, WatchProgress } from '../types';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- Mock Database ---
const MOCK_USERS: User[] = [
  { id: '1', email: 'user@example.com', role: 'user' },
  { id: '2', email: 'admin@example.com', role: 'admin' },
];
const MOCK_PASSWORDS = { 'user@example.com': 'password123', 'admin@example.com': 'admin123' };
const MOCK_ANIME: Anime[] = [
    { id: 21, title: { romaji: 'One Piece', english: 'One Piece' }, coverImage: { extraLarge: 'https://picsum.photos/400/600?random=1', color: '#e89f43' }, description: 'Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line...', episodes: 1000 },
    { id: 16498, title: { romaji: 'Shingeki no Kyojin', english: 'Attack on Titan' }, coverImage: { extraLarge: 'https://picsum.photos/400/600?random=2', color: '#a05f56' }, description: 'Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans...', episodes: 87 },
    { id: 113415, title: { romaji: 'Jujutsu Kaisen', english: 'Jujutsu Kaisen' }, coverImage: { extraLarge: 'https://picsum.photos/400/600?random=3', color: '#1a1f28' }, description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself...', episodes: 47 },
    { id: 1, title: { romaji: 'Cowboy Bebop', english: 'Cowboy Bebop' }, coverImage: { extraLarge: 'https://picsum.photos/400/600?random=4', color: '#c4454f' }, description: 'In the year 2071, humanity has colonized several of the planets and moons of the solar system...', episodes: 26 },
    { id: 12438, title: { romaji: 'Steins;Gate', english: 'Steins;Gate' }, coverImage: { extraLarge: 'https://picsum.photos/400/600?random=5', color: '#556a73' }, description: 'The self-proclaimed mad scientist Rintarou Okabe rents out a room in a rickety old building in Akihabara...', episodes: 24 },
];
let MOCK_WATCHLIST = [{ userId: '1', anilistId: 21 }, { userId: '1', anilistId: 113415 }];
let MOCK_FAVORITES = [{ userId: '1', anilistId: 16498 }];
let MOCK_PROGRESS: WatchProgress[] = [{ userId: '1', anilistId: 21, episodeNumber: 5, watchedSeconds: 600, durationSeconds: 1440 }];
let MOCK_OVERRIDES: Override[] = [
  { id: '1', type: 'global', source: 'gogoanime', urlTemplate: 'https://gogoanime.com/{title}/{episode}' },
  { id: '2', type: 'anime', anilistId: 21, source: 'crunchyroll', urlTemplate: 'https://crunchyroll.com/one-piece/{episode}' },
];
let MOCK_REPORTS: Report[] = [
  { id: '1', userId: '1', animeId: 16498, episodeNumber: 3, issueType: 'Broken Video', description: 'Video does not load.', status: 'open', createdAt: new Date().toISOString() },
];

export const apiService = {
  // --- Auth ---
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    await delay(500);
    const user = MOCK_USERS.find(u => u.email === email);
    if (user && MOCK_PASSWORDS[email] === password) {
      const token = `mock-jwt-for-${user.id}-${Math.random()}`;
      return { token, user };
    }
    throw new Error('Invalid credentials');
  },

  register: async (email: string, password: string): Promise<User> => {
    await delay(500);
    if(MOCK_USERS.find(u => u.email === email)) {
        throw new Error('User already exists');
    }
    const newUser: User = { id: String(MOCK_USERS.length + 1), email, role: 'user' };
    MOCK_USERS.push(newUser);
    MOCK_PASSWORDS[email] = password;
    return newUser;
  },

  verifyToken: async (token: string): Promise<User> => {
    await delay(200);
    const userId = token.split('-')[3];
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) return user;
    throw new Error('Invalid token');
  },

  // --- AniList Proxy ---
  getAnimeList: async(): Promise<Anime[]> => {
    await delay(800);
    return [...MOCK_ANIME];
  },
  
  getAnimeDetails: async(id: number): Promise<Anime | undefined> => {
    await delay(600);
    return MOCK_ANIME.find(a => a.id === id);
  },

  // --- User Data ---
  getWatchlist: async (userId: string): Promise<number[]> => {
    await delay(400);
    return MOCK_WATCHLIST.filter(w => w.userId === userId).map(w => w.anilistId);
  },
  
  addToWatchlist: async (userId: string, anilistId: number): Promise<void> => {
    await delay(300);
    if (!MOCK_WATCHLIST.some(w => w.userId === userId && w.anilistId === anilistId)) {
      MOCK_WATCHLIST.push({ userId, anilistId });
    }
  },

  removeFromWatchlist: async (userId: string, anilistId: number): Promise<void> => {
    await delay(300);
    MOCK_WATCHLIST = MOCK_WATCHLIST.filter(w => !(w.userId === userId && w.anilistId === anilistId));
  },
  
  getFavorites: async (userId: string): Promise<number[]> => {
    await delay(400);
    return MOCK_FAVORITES.filter(f => f.userId === userId).map(f => f.anilistId);
  },

  // --- Admin ---
  getOverrides: async(): Promise<Override[]> => {
    await delay(500);
    return [...MOCK_OVERRIDES];
  },

  addOverride: async(override: Omit<Override, 'id'>): Promise<Override> => {
    await delay(300);
    const newOverride: Override = { ...override, id: String(Date.now()) };
    MOCK_OVERRIDES.push(newOverride);
    return newOverride;
  },

  updateOverride: async(updatedOverride: Override): Promise<Override> => {
    await delay(300);
    const index = MOCK_OVERRIDES.findIndex(o => o.id === updatedOverride.id);
    if (index !== -1) {
      MOCK_OVERRIDES[index] = updatedOverride;
      return updatedOverride;
    }
    throw new Error("Override not found");
  },

  deleteOverride: async(id: string): Promise<void> => {
    await delay(300);
    MOCK_OVERRIDES = MOCK_OVERRIDES.filter(o => o.id !== id);
  },

  getReports: async(): Promise<Report[]> => {
    await delay(500);
    return [...MOCK_REPORTS];
  },
  
  updateReportStatus: async(id: string, status: 'open' | 'closed'): Promise<Report> => {
    await delay(300);
    const report = MOCK_REPORTS.find(r => r.id === id);
    if(report) {
        report.status = status;
        return report;
    }
    throw new Error("Report not found");
  }
};