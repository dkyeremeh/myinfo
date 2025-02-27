import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes';
import cors from 'cors';
import { join, resolve } from 'path';

const staticFilesPath = resolve('build.ui');

const app = express();

// Ui
app.use(express.static(staticFilesPath));
app.get('*', (_, res) => {
  res.sendFile(join(staticFilesPath, 'index.html'));
});

// Api
app.use(express.json());
app.use('/api', cors(), authRoutes);

const PORT = process.env.PORT ?? 5051;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
