import axios from 'axios';

//@ts-expect-error mumbo jumbo
const config = window.config;

const api = axios.create({
  baseURL: config.authApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
