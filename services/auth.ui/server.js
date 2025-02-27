import { resolve } from 'path';
import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config({ path: resolve('../../.env') });

app.use(express.static('build'));

const config = { authApiUrl: process.env.AUTH_API_URL };

app.get('/config.js', (_, res) => {
  res.send(`window.config = ${JSON.stringify(config)}`);
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'build' });
});

const PORT = process.env.PORT ?? 5051;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
