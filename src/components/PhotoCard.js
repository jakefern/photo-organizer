import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const PhotoCard = ({ photo, onDelete, onView }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:3001/uploads/${photo.filename}`}
        alt={photo.filename}
        style={{ cursor: 'pointer' }}
        onClick={() => onView(photo)}
      />
      <CardContent>
        <Typography variant="body1">
          Uploaded By: {photo.uploadedBy}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Upload Date: {new Date(photo.uploadDate).toLocaleString()}
        </Typography>
        <IconButton
          color="secondary"
          onClick={() => onDelete(photo._id)}
          aria-label="delete"
        >
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
