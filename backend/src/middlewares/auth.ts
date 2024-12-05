import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

/* Extend userId to Request */
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

/* vertifyToken */
const vertifyToken = (req: Request, res: Response, next: NextFunction) => {
  // get & check if token exists
  const token = req.cookies['auth_token'];
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    // vertify token with secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.error(`🚀error (vertifyToken):`, error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export { vertifyToken };
