import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedBy, setUploadedBy] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

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

  return (
    <div className="App">
      <h1>Photo Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Uploaded By"
        value={uploadedBy}
        onChange={handleUploadedByChange}
      />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>

      <h2>Photo Gallery</h2>
      <div className="gallery">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-card">
            <img
              src={`http://localhost:3001/${photo.filepath}`}
              alt={photo.filename}
              style={{ width: '200px', height: 'auto' }}
            />
            <p>Uploaded By: {photo.uploadedBy}</p>
            <p>Upload Date: {new Date(photo.uploadDate).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
