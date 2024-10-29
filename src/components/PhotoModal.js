import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PhotoModal = ({ open, selectedPhoto, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>
        {selectedPhoto?.filename}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {selectedPhoto && (
          <img
            src={`http://localhost:3001/uploads/${selectedPhoto.filename}`}
            alt={selectedPhoto.filename}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhotoModal;
