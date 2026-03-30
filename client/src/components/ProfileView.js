import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { profileService } from '../api';
import '../styles/ProfileView.css';

function ProfileView() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    try {
      const response = await profileService.getProfileById(id);
      setProfile(response.data);
      
      // Verificar si es el propietario
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.djProfile && user.djProfile._id === id) {
        setIsOwner(true);
      }
    } catch (err) {
      setError('Error al cargar el perfil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu perfil?')) {
      try {
        await profileService.deleteProfile(id);
        navigate('/dashboard');
      } catch (err) {
        alert('Error al eliminar el perfil');
      }
    }
  };

  if (loading) return <div className="profile-view"><p>Cargando...</p></div>;
  if (error) return <div className="profile-view"><p className="error">{error}</p></div>;
  if (!profile) return <div className="profile-view"><p>Perfil no encontrado</p></div>;

  return (
    <div className="profile-view">
      <button onClick={() => navigate(-1)} className="back-button">← Volver</button>
      
      <div className="profile-container">
        {profile.profileImage && (
          <div className="profile-image-large">
            <img src={`http://localhost:5000/${profile.profileImage}`} alt={profile.name} />
          </div>
        )}
        
        <div className="profile-details">
          <h1>{profile.name}</h1>
          <div className="info-section">
            <p><strong>País:</strong> {profile.country}</p>
            <p><strong>Género Musical:</strong> {profile.genre}</p>
            <p><strong>Biografía:</strong> {profile.bio || 'Sin biografía'}</p>
          </div>

          <div className="social-section">
            <h3>Redes Sociales</h3>
            {profile.instagram || profile.soundcloud ? (
              <div className="social-links">
                {profile.instagram && (
                  <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                    📷 Instagram
                  </a>
                )}
                {profile.soundcloud && (
                  <a href={profile.soundcloud} target="_blank" rel="noopener noreferrer">
                    🎵 SoundCloud
                  </a>
                )}
              </div>
            ) : (
              <p>Sin redes sociales</p>
            )}
          </div>

          {isOwner && (
            <div className="owner-actions">
              <button onClick={() => navigate(`/edit-profile/${id}`)} className="edit-button">
                Editar Perfil
              </button>
              <button onClick={handleDelete} className="delete-button">
                Eliminar Perfil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
