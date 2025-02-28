var _a;
import cors from 'cors';
import express from 'express';
const app = express();
app.use(express.json(), cors());
app.get('/info', (req, res) => { });
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5053;
app.listen(PORT, () => {
    console.log(`Auth API service is running on http://localhost:${PORT}`);
});
