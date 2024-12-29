import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes';
import cors from 'cors';
import { join, resolve } from 'path';

dotenv.config({ path: resolve('../../.env') });
const staticFilesPath = resolve('build.ui');

const app = express();

app.get('*', (req, res) => {
  res.sendFile(join(staticFilesPath, 'index.html'));
});

app.use(express.json());
app.use('/api', cors(), authRoutes);

const PORT = process.env.PORT ?? 5051;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
