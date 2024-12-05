import { check, validationResult } from 'express-validator';
import express, { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { vertifyToken } from '../middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password require 6 or more characters').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array() });
      return;
    }

    // Get data
    const { email, password } = req.body;

    try {
      // Find user in DB
      const user = await User.findOne({ email });

      // Check exists user
      if (!user) {
        res.status(400).json({ message: 'Invalid Credentials' });
        return;
      }

      // Check password correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid Credentials' });
        return;
      }

      // Create Token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1d',
      });

      // Send cookies & respone
      res.cookie('auth_token', token, {
        httpOnly: true,
        maxAge: 86400000,
        secure: process.env.NODE_ENV === 'production',
      });

      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.error(`🚀Error (/login):`, error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

/* Check User Login By A Middleware */
router.get('/validate-token', vertifyToken, async (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

export default router;
