import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { vertifyToken } from '../middlewares/auth';

const router = express.Router();

// REGISTER
router.post(
  '/register',
  [
    check('firstName', 'Fist name is required').isString(),
    check('lastName', 'Last name is required').isString(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }

    try {
      // guard
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Create user
      user = new User(req.body);
      await user.save();

      // Create Token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1d',
      });

      // Send cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });

      // Send back resspone
      res.status(201).send({ message: 'User Register Successfully' });
    } catch (error) {
      console.error(`🚀error (/register):`, error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  },
);

/* GET CURRENT USER DETAIL api/users/me */
router.get('/me', vertifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(`🚀error (/api/users/me):`, error);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

export default router;
