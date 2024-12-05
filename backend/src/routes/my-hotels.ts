import express, { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import { vertifyToken } from '../middlewares/auth';
import { body } from 'express-validator';

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

// CREATE/ADD HOTEL
router.post(
  '/',
  vertifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Type is required'),

    body('adultCount')
      .notEmpty()
      .isNumeric()
      .withMessage('Adult Count is required and must be a number'),
    body('childCount')
      .notEmpty()
      .isNumeric()
      .withMessage('Child Count is required and must be a number'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage('Price per night is required and must be a number'),
    body('starRating')
      .notEmpty()
      .isNumeric()
      .withMessage('Star Rating is required and must be a number'),

    body('facilities').notEmpty().isArray().withMessage('Facilities are required'),
  ],
  upload.array('imageFiles', 6),
  // upload.any(),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // upload images to cloundinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = `data:${image.mimetype};base64,${b64}`;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
      });
      const imageUrls = await Promise.all(uploadPromises);

      // if upload was successful, add the URLs to the newHotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // save the newHotel to DB
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // send back res
      res.status(201).send(hotel);
    } catch (error) {
      console.error(`🚀Error:`, error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

export default router;
