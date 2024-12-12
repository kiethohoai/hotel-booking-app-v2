export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  totalCost: number;
};

export type HotelSearchRespone = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

// UserType
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type PaymentIntentRespone = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
