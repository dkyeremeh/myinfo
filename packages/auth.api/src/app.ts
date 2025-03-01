import cors from 'cors';
import express from 'express';
import authRoutes from './routes';

const app = express();

app.use(express.json());
app.use('/api', cors(), authRoutes);

const PORT = process.env.PORT ?? 5050;

app.listen(PORT, () => {
  console.log(`Auth API service is running on http://localhost:${PORT}`);
});
