import cors from 'cors';
import { faker } from '@faker-js/faker';
import express from 'express';
import { consumeMessages, sendMessage } from 'shared/build/streams';

const app = express();

consumeMessages('user.scan', (user) => {
  let count = 0;

  const runner = setInterval(() => {
    sendMessage('user.scan.result', {
      site: faker.internet.url(), // Generates a fake website URL
      data: faker.lorem.sentences(5), // Generates a fake sentence
      user: user.id,
    });

    if (count >= 10) clearInterval(runner);
  }, 5000);
});

app.use(express.json(), cors());
app.get('/user-data', (req, res) => {});

const PORT = process.env.PORT ?? 5053;

app.listen(PORT, () => {
  console.log(`Auth API service is running on http://localhost:${PORT}`);
});
