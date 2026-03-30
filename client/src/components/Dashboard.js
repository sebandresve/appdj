import React, { useEffect, useState } from 'react';
import { profileService } from '../api';
import ProfileCard from './ProfileCard';
import '../styles/Dashboard.css';

function Dashboard() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const response = await profileService.getAllProfiles();
      setProfiles(response.data);
    } catch (err) {
      setError('Error al cargar los perfiles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard"><p>Cargando...</p></div>;
  if (error) return <div className="dashboard"><p className="error">{error}</p></div>;

  return (
    <div className="dashboard">
      <h1>Perfiles de DJs</h1>
      <div className="profiles-grid">
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileCard key={profile._id} profile={profile} />
          ))
        ) : (
          <p>No hay perfiles disponibles</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
