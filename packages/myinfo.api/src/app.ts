import cors from 'cors';
import express from 'express';
import { AppRequest, authMiddleWare } from './utils';
import { db } from './db';
import './streams';

const app = express();
app.use(express.json(), cors());
app.use(authMiddleWare);

app.get('/api/info', (req: AppRequest, res) => {
  const user = req.auth!;
  const data = db('user_info').where({ user: user.id });
  res.send({ msg: 'Success', data });
});

const PORT = process.env.PORT ?? 5053;

app.listen(PORT, () => {
  console.log(`myinfo.api is running on http://localhost:${PORT}`);
});
