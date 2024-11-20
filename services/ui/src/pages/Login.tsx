import React from 'react';
import AuthForm from '../components/AuthForm';
import auth from '../api/auth'

const Login: React.FC = () => {
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await auth.post('/login', data);
      console.log('Login successful:', response.data);
      localStorage.set('token', response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <AuthForm onSubmit={handleLogin} title="Login" />;
};

export default Login;
