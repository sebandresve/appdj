import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>🎵 DJ Profiles</h1>
      </div>
      
      <div className="navbar-menu">
        {token ? (
          <>
            <button onClick={() => navigate('/dashboard')} className="nav-button">
              Dashboard
            </button>
            <button onClick={() => navigate('/create-profile')} className="nav-button">
              Crear Perfil
            </button>
            <button onClick={() => navigate('/my-profile')} className="nav-button">
              Mi Perfil
            </button>
            <div className="user-info">
              <span>{user.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="nav-button">
              Iniciar Sesión
            </button>
            <button onClick={() => navigate('/register')} className="nav-button">
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
