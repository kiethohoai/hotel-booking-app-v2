import express, { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Hotel from '../models/hotel';
import { vertifyToken } from '../middlewares/auth';
import { body } from 'express-validator';
import { HotelType } from '../shared/types';

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
      const imageUrls = await uploadImages(imageFiles);

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

// GET HOTELS
router.get('/', vertifyToken, async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.find({ userId: req.userId });
    res.status(200).json(hotel);
  } catch (error) {
    console.log(`🚀error:`, error);
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

// GET HOTEL BY ID (/api/my-hotels/id)
router.get('/:id', vertifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Hotel' });
  }
});

// UPDATE EXISTINGS IMAGE WITH HOTELID
router.put(
  '/:hotelId',
  vertifyToken,
  upload.array('imageFiles'),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true },
      );

      if (!hotel) {
        res.status(404).json({ message: 'Hotel not found' });
        return;
      }

      const files = req.files as Express.Multer.File[];
      const updateImageUrls = await uploadImages(files);
      hotel.imageUrls = [...updateImageUrls, ...(updatedHotel.imageUrls || [])];
      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    let dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
