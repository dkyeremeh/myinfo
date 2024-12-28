import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import auth from '../api/auth';
import { TextField } from '@mui/material';

const Signup: React.FC = () => {
  const [repassword, setRepassword] = useState('');
  const handleSignup = async (data: { email: string; password: string }) => {
    try {
      const response = await auth.post('/signup', { ...data, repassword });
      console.log('Signup successful:', response.data);
      window.location.assign('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const bottomContent = (
    <div>
      Have an account? <a href="/login">Login</a>
    </div>
  );

  return (
    <AuthForm
      onSubmit={handleSignup}
      title="Signup"
      bottomContent={bottomContent}
    >
      <TextField
        label="Confirm Password"
        type="password"
        value={repassword}
        onChange={(e) => setRepassword(e.target.value)}
        required
      />
    </AuthForm>
  );
};

export default Signup;
