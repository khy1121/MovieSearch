
import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, favorites, onToggleFavorite }) {
  return (
    <div className="grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.find(f => f.id === movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieList;
