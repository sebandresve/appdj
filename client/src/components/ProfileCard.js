import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileCard.css';

function ProfileCard({ profile }) {
  return (
    <div className="profile-card">
      {profile.profileImage && (
        <div className="profile-image">
          <img src={`http://localhost:5000/${profile.profileImage}`} alt={profile.name} />
        </div>
      )}
      <div className="profile-info">
        <h2>{profile.name}</h2>
        <p className="country">🌍 {profile.country}</p>
        <p className="genre">🎵 {profile.genre}</p>
        <p className="bio">{profile.bio}</p>
        <div className="social-links">
          {profile.instagram && (
            <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}
          {profile.soundcloud && (
            <a href={profile.soundcloud} target="_blank" rel="noopener noreferrer">
              SoundCloud
            </a>
          )}
        </div>
        <Link to={`/profile/${profile._id}`} className="view-button">
          Ver Perfil Completo
        </Link>
      </div>
    </div>
  );
}

export default ProfileCard;
