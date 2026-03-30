const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const DJProfile = require('../models/DJProfile');

const router = express.Router();

// REGISTRO: Crear cuenta de usuario y perfil inicial DJ
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().notEmpty(),
    body('country').trim().notEmpty(),
    body('genre').isIn(['EDM', 'Techno', 'House', 'Industrial', 'Trance', 'Drum and Bass', 'Dubstep', 'Hip-Hop', 'Other'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name, country, genre } = req.body;

      // Verificar si el usuario ya existe
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Crear usuario
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        email,
        password: hashedPassword,
        role: 'dj'
      });
      await user.save();

      // Crear perfil DJ inicial
      const djProfile = new DJProfile({
        userId: user._id,
        name,
        country,
        genre
      });
      await djProfile.save();

      // Generar token JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        token,
        user: {
          id: user._id,
          email: user.email,
          djProfile
        }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  }
);

// LOGIN: Autenticar usuario
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Buscar usuario
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      // Validar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      // Obtener perfil DJ
      const djProfile = await DJProfile.findOne({ userId: user._id });

      // Generar token JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: user._id,
          email: user.email,
          djProfile
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  }
);

module.exports = router;
