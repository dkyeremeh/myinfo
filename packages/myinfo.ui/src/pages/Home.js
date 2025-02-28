import React from 'react';
import { Box, Typography } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoutes';
const NotFound = () => {
    return (<ProtectedRoute>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h1">Home Page</Typography>
        <a href="/logout">Logout</a>
      </Box>
    </ProtectedRoute>);
};
export default NotFound;
