import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
        />
      </Link>
      <h3>{movie.title}</h3>
      <button onClick={() => onToggleFavorite(movie)}>
        {isFavorite ? '⭐ 즐겨찾기 취소' : '☆ 즐겨찾기'}
      </button>
    </div>
  );
}

export default MovieCard;
