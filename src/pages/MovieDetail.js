import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`);
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="detail">
      <button onClick={() => navigate(-1)}>← 뒤로 가기</button>
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>평점: {movie.vote_average}</p>
      <p>개봉일: {movie.release_date}</p>
    </div>
  );
}

export default MovieDetail;
