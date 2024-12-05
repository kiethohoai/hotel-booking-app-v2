import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import userRoute from './routes/user';
import authRoute from './routes/auth';

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
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FONTEND_URL,
    credentials: true,
  }),
);

// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(7000, () => {
  console.log(`🚀Server running on localhost:7000`);
});
