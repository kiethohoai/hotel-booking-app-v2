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
};

export type HotelSearchRespone = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
