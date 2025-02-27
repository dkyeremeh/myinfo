import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { TextField } from '@mui/material';
import { signup } from '../utils/api';

type SignupResponse = Partial<Awaited<ReturnType<typeof signup>>>;
const Signup: React.FC = () => {
  const [response, setResponse] = useState<SignupResponse>({});
  const [repassword, setRepassword] = useState('');

  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await signup({ ...data, repassword });
    setResponse(res);
    // setMessage(msg)
  };

  const bottomContent = (
    <div>
      Have an account? <a href="/login">Login</a>
      <div>{response.msg}</div>
    </div>
  );

  return (
    <AuthForm onSubmit={onSubmit} title="Signup" bottomContent={bottomContent}>
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
