import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'ac73a444cb8fc6bd14c048bc108672bd'; // 실제 Key로 교체

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.results.length > 0) {
        setMovies(data.results);
      } else {
        setError('검색 결과가 없습니다.');
        setMovies([]);
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🎬 TMDB 영화 검색기</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="영화 제목을 입력하세요 (한글 가능)"
          style={{ width: '300px', padding: '0.5rem' }}
        />
        <button onClick={searchMovies} style={{ padding: '0.5rem 1rem' }}>검색</button>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>⏳ 검색 중...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}>
        {movies.map(movie => (
          <div key={movie.id} style={{ textAlign: 'center' }}>
            <img
              src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/150x225?text=No+Image'}
              alt={movie.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p style={{ fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{movie.title}</p>
            <p style={{ margin: 0 }}>{movie.release_date ? movie.release_date.split('-')[0] : '개봉년도 없음'}</p>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
        <p>
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
        <img 
          src="https://www.themoviedb.org/assets/2/v4/logos/stacked-blue-e3b9b4aa3c06cdd0b2defac1cac73e0d89cf4034c88099791323a6c9f7d6b7f1.svg" 
          alt="TMDb logo" 
          width="80" 
          style={{ margin: '0.5rem auto' }}
        />
        <p>
          All movie data, including images, are provided by TMDb and are the property of their respective copyright holders.
        </p>
      </footer>
    </div>
  );
}

export default App;
