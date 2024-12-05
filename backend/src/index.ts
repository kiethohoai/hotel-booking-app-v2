import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import userRoute from './routes/user';
import authRoute from './routes/auth';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

/* Allow BE access to FE static */
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(7000, () => {
  console.log(`🚀Server running on localhost:7000`);
});
