import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.ACCOUNT_API_URL ?? "http://localhost:5001/auth",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
