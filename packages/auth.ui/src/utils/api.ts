import axios from 'axios';
import { postAuthStatus, saveToken } from './auth';

//@ts-expect-error mumbo jumbo
const config = window.config;

const api = axios.create({
  baseURL: config.authApiUrl,
  headers: { 'Content-Type': 'application/json' },
});

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/login', data);

    saveToken(response.data.token);
    postAuthStatus('LOGIN_SUCCESS');

    console.log('Login successful:', response.data);
    return { success: true, msg: 'Login successful' };
  } catch (error) {
    // @ts-ignore
    const msg: string = error.response?.data?.error || error.message;
    window.parent.postMessage(
      { action: 'LOGIN_FAILED', error: msg }, // @ts-ignore
      window.config.parentHost
    );
    console.error('Login failed:', error);

    return { success: false, msg };
  }
};

export const signup = async (data: {
  email: string;
  password: string;
  repassword: string;
  name: string;
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
