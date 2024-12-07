import express, { Request, Response } from 'express';
import Hotel from '../models/hotel';
import { HotelSearchRespone } from '../shared/types';
const router = express.Router();

/* /api/hotels/search */
router.get('/search', async (req: Request, res: Response) => {
  try {
    // Pagination Config
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
    const skip = (pageNumber - 1) * pageSize;

    // Paginate Query
    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments();

    // Prepare & send respone back
    const respone: HotelSearchRespone = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.status(200).json({ respone });
  } catch (error) {
    console.log(`🚀error (/search):`, error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

export default router;
