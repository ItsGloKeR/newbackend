
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import type { Anime } from '../types';
import { apiService } from '../services/apiService';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

const AnimeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const animeId = Number(id);

  const fetchAnimeData = useCallback(async () => {
    if (!animeId || !user) return;
    try {
      setLoading(true);
      const [details, watchlist] = await Promise.all([
        apiService.getAnimeDetails(animeId),
        apiService.getWatchlist(user.id)
      ]);
      
      if (details) {
        setAnime(details);
        setIsInWatchlist(watchlist.includes(animeId));
      } else {
        setError('Anime not found.');
      }
    } catch (err) {
      setError('Failed to load anime details.');
    } finally {
      setLoading(false);
    }
  }, [animeId, user]);

  useEffect(() => {
    fetchAnimeData();
  }, [fetchAnimeData]);
  
  const handleToggleWatchlist = async () => {
    if (!user) return;
    if (isInWatchlist) {
      await apiService.removeFromWatchlist(user.id, animeId);
    } else {
      await apiService.addToWatchlist(user.id, animeId);
    }
    setIsInWatchlist(!isInWatchlist);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!anime) return <div className="text-center">Anime not found.</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={anime.coverImage.extraLarge} alt={anime.title.romaji} className="w-full md:w-1/3 rounded-lg shadow-lg"/>
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{anime.title.english || anime.title.romaji}</h1>
          <div className="flex gap-4 items-center">
             <Button onClick={handleToggleWatchlist}>
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Button>
            <Button variant="secondary">Favorite</Button>
          </div>
          <p className="text-text-secondary" dangerouslySetInnerHTML={{ __html: anime.description }}></p>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage;