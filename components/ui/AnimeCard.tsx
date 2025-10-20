
import React from 'react';
import type { Anime } from '../../types';
import { Link } from 'react-router-dom';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.id}`} className="group relative block overflow-hidden rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30">
        <img
            src={anime.coverImage.extraLarge}
            alt={anime.title.romaji}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white truncate group-hover:text-primary transition-colors">
                {anime.title.english || anime.title.romaji}
            </h3>
        </div>
    </Link>
  );
};

export default AnimeCard;
