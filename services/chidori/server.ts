import express from 'express';
import path, { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: resolve('../../.env') });

const app = express();
const PORT = process.env.PORT ?? 5050;
const staticFilesPath = path.resolve('build.ui');

const config = {
  authApiUrl: process.env.AUTH_API_URL,
  reconApiUrl: process.env.RECON_API_URL,
};

app.use(express.static(staticFilesPath));

app.get('/config.json', (_, res) => {
  res.send(`window.config = ${JSON.stringify(config)}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(staticFilesPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
