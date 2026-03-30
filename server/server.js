const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (fotos de perfil)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Importar rutas
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profiles');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Perfiles de DJs' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
