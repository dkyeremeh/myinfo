import cors from 'cors';
import express from 'express';
import { AppRequest, authMiddleWare } from './utils';
import { db } from './db';
import './streams';

const app = express();
app.use(express.json(), cors());
app.use(authMiddleWare);

app.get('/api/info', async (req: AppRequest, res) => {
  try {
    const user = req.auth!;
    const data = await db('user_info').where({ user: user.id });
    res.send({ msg: 'Success', data });
  } catch (err) {
    console.log(err);
    res.send({ error: 'Unexpected error' });
  }
});

const PORT = process.env.PORT ?? 5053;

app.listen(PORT, () => {
  console.log(`myinfo.api is running on http://localhost:${PORT}`);
});
