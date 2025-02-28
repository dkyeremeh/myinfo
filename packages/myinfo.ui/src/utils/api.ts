'use strict';

import axios from 'axios';
import { getAuthHeader } from './auth';

//@ts-expect-error mumbo jumbo
const config = window.config;

const api = axios.create({
  baseURL: config.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

export default api;

export const fetchInfo = () =>
  api.get('/info', {
    headers: { Authorization: getAuthHeader() },
  });
