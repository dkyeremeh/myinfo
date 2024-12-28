import React from 'react';
import AuthForm from '../components/AuthForm';
import auth from '../api/auth';

const Login: React.FC = () => {
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await auth.post('/login', data);
      localStorage.setItem('token', response.data.token);
      location.assign('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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
