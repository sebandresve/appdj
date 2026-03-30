const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const DJProfile = require('../models/DJProfile');
const fs = require('fs');

const router = express.Router();

// Configurar multer para upload de fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no soportado'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// GET: Obtener todos los perfiles
router.get('/', async (req, res) => {
  try {
    const profiles = await DJProfile.find().populate('userId', 'email');
    res.json(profiles);
  } catch (error) {
    console.error('Error obteniendo perfiles:', error);
    res.status(500).json({ message: 'Error al obtener perfiles', error: error.message });
  }
});

// GET: Obtener un perfil por ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await DJProfile.findById(req.params.id).populate('userId', 'email');
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
  }
});

// POST: Crear un nuevo perfil (authenticado)
router.post(
  '/',
  authMiddleware,
  upload.single('profileImage'),
  [
    body('name').trim().notEmpty(),
    body('country').trim().notEmpty(),
    body('genre').isIn(['EDM', 'Techno', 'House', 'Industrial', 'Trance', 'Drum and Bass', 'Dubstep', 'Hip-Hop', 'Other']),
    body('bio').optional().trim(),
    body('instagram').optional().trim().isURL({ require_protocol: false }),
    body('soundcloud').optional().trim().isURL({ require_protocol: false })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Eliminar imagen si hay errores de validación
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ errors: errors.array() });
      }

      // Verificar si el usuario ya tiene un perfil
      const existingProfile = await DJProfile.findOne({ userId: req.userId });
      if (existingProfile) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Ya tienes un perfil creado' });
      }

      const { name, country, genre, bio, instagram, soundcloud } = req.body;

      const newProfile = new DJProfile({
        userId: req.userId,
        name,
        country,
        genre,
        bio: bio || '',
        instagram: instagram || '',
        soundcloud: soundcloud || '',
        profileImage: req.file ? req.file.path : null
      });

      await newProfile.save();

      res.status(201).json({
        message: 'Perfil creado exitosamente',
        profile: newProfile
      });
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.error('Error creando perfil:', error);
      res.status(500).json({ message: 'Error al crear el perfil', error: error.message });
    }
  }
);

// PUT: Actualizar un perfil (solo el propietario)
router.put(
  '/:id',
  authMiddleware,
  upload.single('profileImage'),
  [
    body('name').optional().trim().notEmpty(),
    body('country').optional().trim().notEmpty(),
    body('genre').optional().isIn(['EDM', 'Techno', 'House', 'Industrial', 'Trance', 'Drum and Bass', 'Dubstep', 'Hip-Hop', 'Other']),
    body('bio').optional().trim(),
    body('instagram').optional().trim().isURL({ require_protocol: false }),
    body('soundcloud').optional().trim().isURL({ require_protocol: false })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({ errors: errors.array() });
      }

      const profile = await DJProfile.findById(req.params.id);
      if (!profile) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(404).json({ message: 'Perfil no encontrado' });
      }

      // Verificar que el usuario propietario actualiza su propio perfil
      if (profile.userId.toString() !== req.userId) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(403).json({ message: 'No autorizado para actualizar este perfil' });
      }

      // Actualizar campos
      if (req.body.name) profile.name = req.body.name;
      if (req.body.country) profile.country = req.body.country;
      if (req.body.genre) profile.genre = req.body.genre;
      if (req.body.bio) profile.bio = req.body.bio;
      if (req.body.instagram) profile.instagram = req.body.instagram;
      if (req.body.soundcloud) profile.soundcloud = req.body.soundcloud;

      // Actualizar imagen si se proporciona una nueva
      if (req.file) {
        // Eliminar imagen anterior si existe
        if (profile.profileImage && fs.existsSync(profile.profileImage)) {
          fs.unlinkSync(profile.profileImage);
        }
        profile.profileImage = req.file.path;
      }

      await profile.save();

      res.json({
        message: 'Perfil actualizado exitosamente',
        profile
      });
    } catch (error) {
      if (req.file) fs.unlinkSync(req.file.path);
      console.error('Error actualizando perfil:', error);
      res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
    }
  }
);

// DELETE: Eliminar un perfil (solo el propietario)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const profile = await DJProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    // Verificar que el usuario propietario elimina su propio perfil
    if (profile.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'No autorizado para eliminar este perfil' });
    }

    // Eliminar imagen si existe
    if (profile.profileImage && fs.existsSync(profile.profileImage)) {
      fs.unlinkSync(profile.profileImage);
    }

    await DJProfile.findByIdAndDelete(req.params.id);

    res.json({ message: 'Perfil eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando perfil:', error);
    res.status(500).json({ message: 'Error al eliminar el perfil', error: error.message });
  }
});

// GET: Obtener perfil del usuario autenticado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const profile = await DJProfile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Tu perfil no existe' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ message: 'Error al obtener tu perfil', error: error.message });
  }
});

module.exports = router;
