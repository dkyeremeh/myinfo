import React, { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import auth from '../api/auth';

const handleLogin = async (data: { email: string; password: string }) => {
  try {
    const response = await auth.post('/login', data);
    localStorage.token = response.data.token;
    window.parent.postMessage({
      action: 'LOGIN_SUCCESSFUL',
      token: response.data.token,
    });
  } catch (error) {
    window.parent.postMessage({
      action: 'LOGIN_FAILED',
      error,
    });

    console.error('Login failed:', error);
  }
};

const Login: React.FC = () => {
  useEffect(() => {
    if (localStorage.token)
      window.parent.postMessage({
        action: 'LOGIN_SUCCESSFUL',
        token: localStorage.token,
      });
  }, []);

  const bottomContent = (
    <div>
      Don't have an account? <a href="/signup">Signup</a>
    </div>
  );

  return (
    <AuthForm
      onSubmit={handleLogin}
      title="Login"
      bottomContent={bottomContent}
    ></AuthForm>
  );
};

export default Login;
