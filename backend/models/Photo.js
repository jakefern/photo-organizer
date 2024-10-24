const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  uploadedBy: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Photo', PhotoSchema);
