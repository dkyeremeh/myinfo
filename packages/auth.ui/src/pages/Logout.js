import React, { useEffect } from 'react';
import { logout, postAuthStatus } from '../utils/auth';
const Logout = () => {
    useEffect(() => {
        logout();
        postAuthStatus('LOGGED_OUT');
        location.replace('/login');
    }, []);
    return <div>Logging out</div>;
};
export default Logout;
