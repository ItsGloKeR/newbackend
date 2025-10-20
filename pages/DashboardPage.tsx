
import React, { useState, useEffect } from 'react';
import type { Anime } from '../types';
import { apiService } from '../services/apiService';
import AnimeCard from '../components/ui/AnimeCard';

const DashboardPage: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAnimeList();
        setAnimeList(data);
        setError(null);
      } catch (err) {
        setError('Failed to load anime list.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-text-primary">Trending Now</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {animeList.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
