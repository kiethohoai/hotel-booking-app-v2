import express, { Request, Response } from 'express';
import Hotel from '../models/hotel';
import Stripe from 'stripe';
import { BookingType, HotelSearchRespone, HotelType } from '../shared/types';
import { param, validationResult } from 'express-validator';
import { vertifyToken } from '../middlewares/auth';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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

/* api/hotels/id */
router.get(
  '/:id',
  [param('id').notEmpty().withMessage('Hotel ID is required')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = req.params.id.toString();
      const hotel = await Hotel.findById(id);
      res.status(200).json(hotel);
    } catch (error) {
      console.log(`🚀error (api/hotels/id):`, error);
      res.status(500).json({ message: 'Error fetching hotel' });
    }
  },
);

/* CREATE PAYMENT INTENT */
router.post(
  '/:hotelId/bookings/payment-intent',
  vertifyToken,
  async (req: Request, res: Response) => {
    // Prepare data
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      res.status(400).json({ message: 'Hotel Not Found' });
      return;
    }
    const totalCost = hotel.pricePerNight * numberOfNights;

    // create payment-intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost,
      currency: 'usd', //gbp
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    // Guard
    if (!paymentIntent.client_secret) {
      res.status(500).json({ message: 'Error creating payment intent' });
      return;
    }

    // Prepare respone data to FE
    const respone = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(respone);
  },
);

/* CREATE HOTEL BOOKING API */
router.post('/:hotelId/bookings', vertifyToken, async (req: Request, res: Response) => {
  try {
    const paymentIntentId = req.body.paymentIntentid;

    // Guard #1
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);
    if (!paymentIntent) {
      res.status(400).json({ message: 'Payment Intent Not Found' });
      return;
    }

    // Guard #2
    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      res.status(400).json({ message: 'Payment Intent Mismatch' });
      return;
    }

    // Guard #3
    if (paymentIntent.status !== 'succeeded') {
      res.status(400).json({
        message: `Payment Intent Not Succeeded. Status: ${paymentIntent.status}`,
      });
      return;
    }

    // Create bookings
    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      {
        $push: { bookings: newBooking },
      },
    );

    // Guard
    if (!hotel) {
      res.status(404).json({ message: 'Hotel Not Found' });
      return;
    }

    // Final
    await hotel.save();
    res.status(201).send({ message: 'Create Booking Successfully' });
  } catch (error) {
    console.log(`🚀error (/:hotelId/bookings):`, error);
    res.status(500).json({ message: 'Something went wrong' });
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
