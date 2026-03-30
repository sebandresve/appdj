import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api';
import '../styles/Auth.css';

const GENRES = ['EDM', 'Techno', 'House', 'Industrial', 'Trance', 'Drum and Bass', 'Dubstep', 'Hip-Hop', 'Other'];

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    country: '',
    genre: 'EDM'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.register(
        formData.email,
        formData.password,
        formData.name,
        formData.country,
        formData.genre
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Crear Cuenta</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre de DJ"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="País"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <select name="genre" value={formData.genre} onChange={handleChange} required>
            {GENRES.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
