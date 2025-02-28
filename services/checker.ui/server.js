import express from 'express';

const app = express();

app.use(express.static('build'));

const config = {
  authUrl: process.env.AUTH_UI_URL,
  apiUrl: process.env.CHECKER_API_URL,
};

app.get('/config.js', (_, res) => {
  res.send(`window.config = ${JSON.stringify(config)}`);
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'build' });
});

const PORT = process.env.PORT ?? 5050;

app.listen(PORT, () => {
  console.log(`Checker UI is running on http://localhost:${PORT}`);
});
