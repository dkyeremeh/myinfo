import express from 'express';
import { faker } from '@faker-js/faker';
import { postJSON, INTERNAL_API_KEY_HEADER } from 'shared/build/http';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.send({ status: 'ok' });
});

app.post('/scan', (req, res) => {
  if (req.header(INTERNAL_API_KEY_HEADER) !== process.env.INTERNAL_API_KEY) {
    res.status(401).send({ error: 'Invalid internal API key' });
    return;
  }

  const user = req.body ?? {};
  if (!user.id) {
    res.status(400).send({ error: 'Missing user id' });
    return;
  }

  res.status(202).send({ msg: 'Scan started' });

  console.log('scanning for user', user);

  let count = 0;
  const runner = setInterval(() => {
    postJSON(`${process.env.MYINFO_API_INTERNAL_URL}/internal/scan-result`, {
      site: faker.internet.url(),
      data: faker.lorem.sentences(5),
      user: user.id,
    }).catch((err) => console.error('Failed to report scan result', err));

    if (count++ >= 5) clearInterval(runner);
  }, 5000);
});

const PORT = process.env.PORT ?? 5050;

app.listen(PORT, () => {
  console.log(`myinfo.scanner is running on http://localhost:${PORT}`);
});
