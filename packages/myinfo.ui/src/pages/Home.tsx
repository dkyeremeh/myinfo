import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoutes';
import { getIsLoggedIn } from '../utils/auth';
import { fetchInfo } from '../utils/api';

const NotFound: React.FC = () => {
  const isLoggedIn = getIsLoggedIn();
  const getInfo = async () => {
    const info = await fetchInfo();
    console.log(info);
  };

  useEffect(() => {
    if (isLoggedIn) getInfo();
  }, [isLoggedIn]);
  return (
    <ProtectedRoute>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h1">Home Page</Typography>
        <a href="/logout">Logout</a>
      </Box>
    </ProtectedRoute>
  );
};

export default NotFound;
