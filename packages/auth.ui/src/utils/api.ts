import axios from 'axios';
import { postAuthStatus, saveToken } from './auth';

//@ts-expect-error mumbo jumbo
const config = window.config;

type OnLoginSuccess = (_token: string) => void;

const api = axios.create({
  baseURL: config.authApiUrl,
  headers: { 'Content-Type': 'application/json' },
});

export const login = async (
  data: { email: string; password: string },
  onSuccess: OnLoginSuccess
) => {
  try {
    const response = await api.post('/login', data);

    saveToken(response.data.token);
    postAuthStatus('LOGIN_SUCCESS');

    onSuccess?.(response.data.token);
  } catch (error) {
    window.parent.postMessage(
      {
        action: 'LOGIN_FAILED',
        error,
      },
      // @ts-ignore
      window.config.parentHost
    );

    console.error('Login failed:', error);
  }
};

export const signup = async (data: {
  email: string;
  password: string;
  repassword: string;
}) => {
  try {
    const response = await api.post('/signup', data);
    console.log('Signup successful:', response.data);

    return { success: true, msg: 'Signup successful' };
  } catch (error) {
    console.error('Signup failed:', error); // @ts-ignore

    const msg: string = error.response?.data?.error || error.message;
    return { success: false, msg };
  }
};

export default api;
