import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProfileView from './components/ProfileView';
import ProfileForm from './components/ProfileForm';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile/:id" element={<ProfileView />} />
          <Route path="/create-profile" element={<PrivateRoute><ProfileForm /></PrivateRoute>} />
          <Route path="/edit-profile/:id" element={<PrivateRoute><ProfileForm isEdit={true} /></PrivateRoute>} />
          <Route path="/my-profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </Router>
  );
}

// Componente para ver el perfil del usuario autenticado
function MyProfile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.djProfile) {
    return <ProfileView key={user.djProfile._id} />;
  }
  return <div className="error">No tienes un perfil creado</div>;
}

export default App;
