import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { profileService } from '../api';
import '../styles/ProfileForm.css';

const GENRES = ['EDM', 'Techno', 'House', 'Industrial', 'Trance', 'Drum and Bass', 'Dubstep', 'Hip-Hop', 'Other'];

function ProfileForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    bio: '',
    genre: 'EDM',
    instagram: '',
    soundcloud: '',
    profileImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      loadProfile();
    }
  }, [isEdit, id]);

  const loadProfile = async () => {
    try {
      const response = await profileService.getProfileById(id);
      const profile = response.data;
      setFormData({
        name: profile.name,
        country: profile.country,
        bio: profile.bio || '',
        genre: profile.genre,
        instagram: profile.instagram || '',
        soundcloud: profile.soundcloud || '',
        profileImage: null
      });
      if (profile.profileImage) {
        setImagePreview(`http://localhost:5000/${profile.profileImage}`);
      }
    } catch (err) {
      setError('Error al cargar el perfil');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('country', formData.country);
      form.append('bio', formData.bio);
      form.append('genre', formData.genre);
      form.append('instagram', formData.instagram);
      form.append('soundcloud', formData.soundcloud);
      if (formData.profileImage) {
        form.append('profileImage', formData.profileImage);
      }

      if (isEdit && id) {
        await profileService.updateProfile(id, form);
      } else {
        await profileService.createProfile(form);
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el perfil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <h1>{isEdit ? 'Editar Perfil' : 'Crear Perfil'}</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label>Nombre de DJ</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label>País</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label>Género Musical</label>
          <select name="genre" value={formData.genre} onChange={handleChange} required>
            {GENRES.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label>Biografía</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            maxLength="500"
          ></textarea>
        </div>

        <div className="form-section">
          <label>Instagram</label>
          <input
            type="url"
            name="instagram"
            placeholder="https://instagram.com/tuusuario"
            value={formData.instagram}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <label>SoundCloud</label>
          <input
            type="url"
            name="soundcloud"
            placeholder="https://soundcloud.com/tuusuario"
            value={formData.soundcloud}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <label>Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Guardando...' : 'Guardar Perfil'}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="cancel-button">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
