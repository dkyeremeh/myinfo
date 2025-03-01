import React, { useEffect, useState } from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../utils/api';
import { getIsLoggedIn, postAuthStatus } from '../utils/auth';

type LoginResponse = Partial<Awaited<ReturnType<typeof login>>>;
const Login: React.FC = () => {
  const [response, setResponse] = useState<LoginResponse>({});
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());

  const onSubmit = async (data: { email: string; password: string }) => {
    const response = await login(data);
    console.log(response);
    setResponse(response);

    if (response.success) setIsLoggedIn(true);
  };

  useEffect(postAuthStatus, []);

  return isLoggedIn ? (
    <div>
      <p>You are logged in!</p>
      <a href="/logout">Logout</a>
    </div>
  ) : (
    <AuthForm
      onSubmit={onSubmit}
      title="Login"
      bottomContent={
        <>
          <div>
            Don't have an account? <a href="/signup">Signup</a>
          </div>
          {
            <div style={response.success ? {} : { color: '#c33' }}>
              {response.msg}
            </div>
          }
        </>
      }
    ></AuthForm>
  );
};

export default Login;
