import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ toggleDarkMode, darkMode }) {
  return (
    <nav className="navbar">
      <Link to="/"><h1>🎬 TMDB 영화</h1></Link>
      <div>
        <Link to="/favorites" className="nav-link">즐겨찾기</Link>
        <button onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
