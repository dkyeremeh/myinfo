import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
const AuthForm = ({ onSubmit, title, children, bottomContent, }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };
    return (<div>
      <Box component="form" onSubmit={handleSubmit} sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 300,
            mx: 'auto',
            mt: 4,
        }}>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        {children}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        {bottomContent}
      </Box>
    </div>);
};
export default AuthForm;
