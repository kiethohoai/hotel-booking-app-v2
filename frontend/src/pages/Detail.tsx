import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { AiFillStar } from 'react-icons/ai';
import GuestInfo from '../components/GuestInfo';

const Detail = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    'fetchHotelById',
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    },
  );

  if (!hotel) return <></>;

  return (
    <div className="space-y-6">
      {/* stars & name */}
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <AiFillStar className="fill-yellow-500" key={`full-star-${i}`} />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      {/* image */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((url, i) => (
          <img
            src={url}
            alt={hotel.name}
            key={`image-key-${i}`}
            className="rounded-md w-full h-full object-cover object-center"
          />
        ))}
      </div>

      {/* facilities */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4">
        {hotel.facilities.map((facility) => (
          <div className="border bg-slate-100 rounded-sm p-3">{facility}</div>
        ))}
      </div>

      {/* desc & guest form */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-break-spaces">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfo />
        </div>
      </div>
    </div>
  );
};

export default Detail;
