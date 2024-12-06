import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext/useAppContext';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery('fetchMyHotels', apiClient.fetchMyHotels, {
    onError: (err: Error) => {
      showToast({ type: 'ERROR', message: err.message });
    },
  });

  if (!hotelData || hotelData.length === 0) return <span>Hotel Not Found!</span>;

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex items-center rounded-sm bg-blue-600 px-3 py-2 font-bold text-white hover:bg-blue-700"
        >
          +Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between gap-5 rounded-lg border border-slate-300 p-8"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BiMoney className="mr-1" />${hotel.pricePerNight}/Night
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BiHotel className="mr-1" />
                {hotel.adultCount} Adults,{hotel.childCount} Children
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex items-center rounded-sm bg-blue-600 px-3 py-2 font-bold text-white hover:bg-blue-700"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
