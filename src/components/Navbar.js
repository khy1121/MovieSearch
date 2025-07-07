import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ toggleDarkMode, darkMode }) {
  return (
    <nav className="navbar">
      <Link to="/"><h1>🎬 영화 검색기</h1></Link>
      <div>
        <Link to="/favorites">즐겨찾기</Link>
        <button onClick={toggleDarkMode}>
          {darkMode ? '라이트모드' : '다크모드'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
