import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/user';

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

// Routes
app.use('/api/user', userRoute);

app.listen(7000, () => {
  console.log(`🚀Server running on localhost:7000`);
});
