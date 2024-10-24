const express = require('express');
const multer = require('multer');
const router = express.Router();
const Photo = require('../models/Photo');

// Set up storage with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/upload', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Save metadata to MongoDB
    const newPhoto = new Photo({
      filename: req.file.filename,
      filepath: req.file.path,
      uploadedBy: req.body.uploadedBy || 'Anonymous', // Optional field for uploadedBy
    });

    await newPhoto.save();

    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: req.file.path,
    });
  } catch (error) {
    console.error('Error saving metadata:', error);
    res.status(500).json({ error: 'Failed to save metadata' });
  }
});

router.get('/photos', async (req, res) => {
    try {
      const photos = await Photo.find();
      res.status(200).json(photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).json({ error: 'Failed to fetch photos' });
    }
  });
  

module.exports = router;
