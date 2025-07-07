import React, { useEffect, useState, useCallback } from 'react';
import MovieList from '../components/MovieList';
import Spinner from '../components/Spinner';
import { Helmet } from 'react-helmet';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;;

function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`);
      const data = await res.json();
      setGenres(data.genres);
    }
    fetchGenres();
  }, []);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let url = '';
      if (query.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&page=${page}&query=${encodeURIComponent(query)}`;
      } else if (selectedGenre) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&page=${page}&with_genres=${selectedGenre}`;
      } else {
        setLoading(false);
        return;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.status_code === 25) {
        setError('API 호출이 너무 많습니다. 잠시 후 다시 시도하세요.');
      } else if (data.results) {
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        setHasMore(data.page < data.total_pages);
      } else {
        setError('검색 결과가 없습니다.');
      }
    } catch (err) {
      console.error(err);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [query, page, selectedGenre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMore && !loading) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  const handleSearch = e => {
    e.preventDefault();
    if (!query.trim()) return;
    setPage(1);
    fetchMovies();
    if (!history.includes(query)) {
      const updatedHistory = [query, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('history', JSON.stringify(updatedHistory));
    }
  };

  const toggleFavorite = movie => {
    const exists = favorites.find(f => f.id === movie.id);
    let updated;
    if (exists) {
      updated = favorites.filter(f => f.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleHistoryClick = (q) => {
    setQuery(q);
    setPage(1);
    fetchMovies();
  };

  return (
    <div className="container">
      <Helmet>
        <title>TMDB 영화 검색기</title>
        <meta name="description" content="TMDB API 기반 영화 검색 서비스" />
      </Helmet>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="영화를 검색하세요"
        />
        <button type="submit">검색</button>
        <select value={selectedGenre} onChange={e => { setSelectedGenre(e.target.value); setPage(1); }}>
          <option value="">장르 선택</option>
          {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </form>

      <div className="history">
        {history.map((q, idx) => (
          <button key={idx} onClick={() => handleHistoryClick(q)}>{q}</button>
        ))}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <MovieList movies={movies} favorites={favorites} onToggleFavorite={toggleFavorite} />

      {loading && <Spinner />}
    </div>
  );
}

export default Home;
