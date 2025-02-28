import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { TextField } from '@mui/material';
import { signup } from '../utils/api';

type SignupResponse = Partial<Awaited<ReturnType<typeof signup>>>;
const Signup: React.FC = () => {
  const [response, setResponse] = useState<SignupResponse>({});
  const [repassword, setRepassword] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await signup({ ...data, repassword, name });
    setResponse(res);
    // setMessage(msg)

    location.assign('/login');
  };

  const bottomContent = (
    <div>
      Have an account? <a href="/login">Login</a>
      {!response.success && (
        <div style={{ marginTop: '1em', color: '#c22' }}>{response.msg}</div>
      )}
    </div>
  );

  const topContent = (
    <TextField
      label="Name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  );

  return (
    <AuthForm
      onSubmit={onSubmit}
      title="Signup"
      bottomContent={bottomContent}
      topContent={topContent}
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
