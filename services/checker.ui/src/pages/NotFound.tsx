import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h1">404 Not found</Typography>
    </Box>
  );
};

export default NotFound;
