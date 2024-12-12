import mongoose from 'mongoose';
import { BookingType, HotelType } from '../shared/types';

const bookinglSchema = new mongoose.Schema<BookingType>({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  totalCost: { type: Number, required: true },
});

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  pricePerNight: { type: Number, required: true, min: 1 },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  facilities: [{ type: String, required: true }],
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [bookinglSchema],
});

const Hotel = mongoose.model<HotelType>('Hotel', hotelSchema);
export default Hotel;
