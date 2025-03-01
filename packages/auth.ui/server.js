import express from 'express';

const app = express();

app.use(express.static('build'));

const config = {
  parentHost: process.env.AUTH_PARENT_HOST,
  authApiUrl: process.env.AUTH_API_URL,
};

app.get('/config.js', (_, res) => {
  res.send(`window.config = ${JSON.stringify(config)}`);
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'build' });
});

const PORT = process.env.PORT ?? 5051;

app.listen(PORT, () => {
  console.log(`Auth UI is running on http://localhost:${PORT}`);
});
