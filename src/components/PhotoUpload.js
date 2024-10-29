import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const PhotoUpload = ({ handleFileChange, handleUploadedByChange, handleUpload, uploadedBy, uploadStatus }) => {
  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}
      noValidate
      autoComplete="off"
    >
      <TextField
        type="file"
        slotProps={{ input: { accept: 'image/*' } }}
        onChange={handleFileChange}
        label="Select Photo"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Uploaded By"
        variant="outlined"
        value={uploadedBy}
        onChange={handleUploadedByChange}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<PhotoCamera />}
        onClick={handleUpload}
      >
        Upload
      </Button>
      {uploadStatus && (
        <Typography variant="subtitle1" color="textSecondary">
          {uploadStatus}
        </Typography>
      )}
    </Box>
  );
};

export default PhotoUpload;
