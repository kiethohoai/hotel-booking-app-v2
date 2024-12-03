import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { log } from 'console';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/test', async (req: Request, res: Response) => {
  res.json({ message: 'Hello from Endpoint' });
});

app.listen(7000, () => {
  console.log(`🚀Server running on localhost:7000`);
});
