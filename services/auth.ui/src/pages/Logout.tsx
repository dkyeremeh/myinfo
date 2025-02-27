import React, { useEffect } from 'react';

const Logout: React.FC = () => {
  useEffect(() => {
    window.parent.postMessage({ action: 'LOGOUT_SUCCESSFUL' });
    location.assign('/login');
  }, []);
  return <div>Logging out</div>;
};

export default Logout;
