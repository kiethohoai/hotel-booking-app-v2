import express, { Request, Response } from 'express';
import Hotel from '../models/hotel';
import { HotelSearchRespone } from '../shared/types';
const router = express.Router();

/* /api/hotels/search */
router.get('/search', async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case 'starRating':
        sortOptions = { starRating: -1 };
        break;
      case 'pricePerNightAsc':
        sortOptions = { pricePerNight: 1 };
        break;
      case 'pricePerNightDesc':
        sortOptions = { pricePerNight: -1 };
        break;
      default:
        sortOptions = { lastUpdated: -1 };
    }

    // Pagination Config
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
    const skip = (pageNumber - 1) * pageSize;

    // Paginate Query
    const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments(query);

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

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, 'i') },
      { country: new RegExp(queryParams.destination, 'i') },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
    // constructedQuery.starRating = { $eq: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;
