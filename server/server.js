const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();
let mongoServer;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (fotos de perfil)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initializar MongoDB en memoria
const initializeDB = async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ Conectado a MongoDB en memoria');
  } catch (err) {
    console.error('Error inicializando MongoDB:', err);
  }
};

// Conectar a MongoDB
initializeDB();

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
