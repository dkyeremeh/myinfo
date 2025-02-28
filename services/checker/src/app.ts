import cors from 'cors';
import express from 'express';
import { onMessage } from './pubSub';

const app = express();

onMessage('auth.signup', (message) =>
  console.log('user has signed up', message)
);

app.use(express.json(), cors());
app.get('/user-data', (req, res) => {});

const PORT = process.env.PORT ?? 5053;

app.listen(PORT, () => {
  console.log(`Auth API service is running on http://localhost:${PORT}`);
});
