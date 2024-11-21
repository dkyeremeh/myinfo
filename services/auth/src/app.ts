import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth',cors(), authRoutes);

const PORT = process.env.PORT ?? 5051;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
