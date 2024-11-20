import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import auth from '../api/auth';
import ProtectedRoute from '../components/ProtectedRoutes';

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await auth.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <ProtectedRoute>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5">Upload Image</Typography>
        <input type="file" onChange={handleFileChange} />
        <Button
          onClick={handleUpload}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={!file}
        >
          Upload
        </Button>
      </Box>
    </ProtectedRoute>
  );
};

export default Upload;
