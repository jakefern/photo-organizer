// models/Photo.js
const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  uploadedBy: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  takenDate: Date,
  location: {
    latitude: Number,
    longitude: Number,
  },
  camera: String,
  event: {
    type: String,
    required: false, // This stores the event name
  },
});

module.exports = mongoose.model('Photo', PhotoSchema);
