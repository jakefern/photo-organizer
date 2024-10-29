import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid2 } from '@mui/material';
import PhotoUpload from './components/PhotoUpload';
import PhotoCard from './components/PhotoCard';
import PhotoModal from './components/PhotoModal';

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedBy, setUploadedBy] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Fetch photos from the backend
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/photos');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadedByChange = (event) => {
    setUploadedBy(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('photo', selectedFile);
    formData.append('uploadedBy', uploadedBy);

    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus(response.data.message);
      // Re-fetch photos after successful upload
      const updatedPhotos = await axios.get('http://localhost:3001/api/photos');
      setPhotos(updatedPhotos.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Failed to upload file');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/photos/${id}`);
      setPhotos(photos.filter((photo) => photo._id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleClickOpen = (photo) => {
    setSelectedPhoto(photo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Photo Upload
      </Typography>

      <PhotoUpload
        handleFileChange={handleFileChange}
        handleUploadedByChange={handleUploadedByChange}
        handleUpload={handleUpload}
        uploadedBy={uploadedBy}
        uploadStatus={uploadStatus}
      />

      <Typography variant="h5" component="h2" gutterBottom>
        Photo Gallery
      </Typography>

      <Grid2 container spacing={3}>
        {photos.map((photo) => (
          <Grid2 item xs={12} sm={6} md={4} key={photo._id}>
            <PhotoCard photo={photo} onDelete={handleDelete} onView={handleClickOpen} />
          </Grid2>
        ))}
      </Grid2>

      <PhotoModal open={open} selectedPhoto={selectedPhoto} handleClose={handleClose} />
    </Box>
  );
}

export default App;
