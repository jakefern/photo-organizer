import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedBy, setUploadedBy] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

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
    </div>
  );
}

export default App;
