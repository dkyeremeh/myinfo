import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoutes';
import { getIsLoggedIn } from '../utils/auth';
import { fetchInfo } from '../utils/api';

type SiteData = {
  id: number;
  data: string;
  site: string;
  user: number;
};

const NotFound: React.FC = () => {
  const [info, setInfo] = useState<SiteData[]>([]);

  const isLoggedIn = getIsLoggedIn();
  const getInfo = async () => {
    const res = await fetchInfo();
    setInfo(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getInfo();
      setInterval(getInfo, 5e3);
    }
  }, [isLoggedIn]);
  return (
    <ProtectedRoute>
      <a href="/logout">Logout</a>
      <Typography variant="h2">Data Found</Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        {info.map((i) => (
          <div key={i.id}>
            <h4>{i.site}</h4>
            <p>{i.data}</p>
          </div>
        ))}
        <a href="/logout">Logout</a>
      </Box>
    </ProtectedRoute>
  );
};

export default NotFound;
