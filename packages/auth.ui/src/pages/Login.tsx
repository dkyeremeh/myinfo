import React, { useEffect, useState } from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../utils/api';
import { getIsLoggedIn, postAuthStatus } from '../utils/auth';

const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());
  const onLoginSuccess = () => setIsLoggedIn(true);

  useEffect(postAuthStatus, []);

  return isLoggedIn ? (
    <div>
      <p>You are logged in!</p>
      <a href="/logout">Logout</a>
    </div>
  ) : (
    <AuthForm
      onSubmit={(data) => login(data, onLoginSuccess)}
      title="Login"
      bottomContent={
        <div>
          Don't have an account? <a href="/signup">Signup</a>
        </div>
      }
    ></AuthForm>
  );
};

export default Login;
