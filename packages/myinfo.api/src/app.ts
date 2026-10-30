import cors from 'cors';
import express from 'express';
import { AppRequest, authMiddleWare, requireInternalKey } from './utils';
import { db } from './db';
import { requestScan } from './scanner';

const app = express();
app.use(express.json(), cors());

app.get('/health', (_req, res) => {
  res.send({ status: 'ok' });
});

app.use('/internal', requireInternalKey);

app.post('/internal/scan', async (req, res) => {
  const { isNewUser, ...user } = req.body ?? {};
  if (!user.id) {
    res.status(400).send({ error: 'Missing user id' });
    return;
  }

  try {
    if (isNewUser) await db('users').insert(user);
  } catch (err) {
    console.error('Error saving user', err);
  }

  requestScan(user);
  res.status(202).send({ msg: 'Scan requested' });
});

app.post('/internal/scan-result', async (req, res) => {
  const info = req.body ?? {};
  if (!info.user) {
    res.status(400).send({ error: 'Missing user' });
    return;
  }

  try {
    await db('user_info').insert(info);
    res.status(201).send({ msg: 'Saved' });
  } catch (err) {
    console.error('Error saving scan result', err);
    res.status(500).send({ error: 'Unexpected error' });
  }
});

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

const PORT = process.env.PORT ?? 5050;

app.listen(PORT, () => {
  console.log(`myinfo.api is running on http://localhost:${PORT}`);
});
