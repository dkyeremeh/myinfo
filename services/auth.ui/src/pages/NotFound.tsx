import React from 'react';
import { Box, Typography } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoutes';

const NotFound: React.FC = () => {
  return (
    <ProtectedRoute>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h1">404 Not found</Typography>
      </Box>
    </ProtectedRoute>
  );
};

export default NotFound;
