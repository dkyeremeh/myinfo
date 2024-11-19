import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import api from '../utils/api';
import { TextField } from '@mui/material';

const Signup: React.FC = () => {
  const [repassword, setRepassword] = useState('');
  const handleSignup = async (data: { email: string; password: string }) => {
    try {
      const response = await api.post('/signup', { ...data, repassword });
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <AuthForm onSubmit={handleSignup} title="Signup">
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
