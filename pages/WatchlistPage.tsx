
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import type { Anime } from '../types';
import { useAuth } from '../hooks/useAuth';
import AnimeCard from '../components/ui/AnimeCard';

const WatchlistPage: React.FC = () => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWatchlist = async () => {
            if (!user) return;
            setLoading(true);
            const watchlistIds = await apiService.getWatchlist(user.id);
            const allAnime = await apiService.getAnimeList();
            const userWatchlist = allAnime.filter(anime => watchlistIds.includes(anime.id));
            setWatchlist(userWatchlist);
            setLoading(false);
        };
        fetchWatchlist();
    }, [user]);

    if (loading) return <div className="text-center">Loading your watchlist...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
            {watchlist.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {watchlist.map(anime => (
                        <AnimeCard key={anime.id} anime={anime} />
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary">Your watchlist is empty. Add some anime to get started!</p>
            )}
        </div>
    );
};

export default WatchlistPage;
