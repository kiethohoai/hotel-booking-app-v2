import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => {
    console.log(`🚀DB Connected`);
    console.log(`🚀ENV: `, process.env.NODE_ENV);
  })
  .catch((error) => {
    console.error(`🚀Error connect to DB:`, error);
  });

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
