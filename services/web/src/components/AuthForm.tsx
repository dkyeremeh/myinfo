import React, { ReactNode, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface AuthFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  title: string;
  children?: ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, title, children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 300,
          mx: 'auto',
          mt: 4,
        }}
      >
        <Typography variant="h5" align="center">
          {title}
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {children}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default AuthForm;
