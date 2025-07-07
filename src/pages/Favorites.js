import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(data);
  }, []);

  const toggleFavorite = movie => {
    const updated = favorites.filter(f => f.id !== movie.id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h2>⭐ 즐겨찾기 목록</h2>
      <MovieList movies={favorites} favorites={favorites} onToggleFavorite={toggleFavorite} />
    </div>
  );
}

export default Favorites;
