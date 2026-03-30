const mongoose = require('mongoose');

const djProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500
    },
    genre: {
      type: String,
      enum: ['EDM', 'Techno', 'House', 'Industrial', 'Trance', 'Drum and Bass', 'Dubstep', 'Hip-Hop', 'Other'],
      required: true
    },
    instagram: {
      type: String,
      trim: true
    },
    soundcloud: {
      type: String,
      trim: true
    },
    profileImage: {
      type: String, // ruta del archivo guardado localmente
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('DJProfile', djProfileSchema);
