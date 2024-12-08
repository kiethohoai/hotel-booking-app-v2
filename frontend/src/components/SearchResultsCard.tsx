import { AiFillStar } from 'react-icons/ai';
import { HotelType } from '../../../backend/src/shared/types';
import { Link } from 'react-router-dom';

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div
      className="grid grid-cols-1 gap-8 rounded-lg border border-slate-300 p-8
        xl:grid-cols-[2fr_3fr]"
    >
      <div className="h-[300px] w-full">
        <img
          src={hotel.imageUrls[0]}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          {/* todo fetch data */}
          <Link
            to={`/detail/${hotel._id}`}
            className="cursor-pointer text-2xl font-bold"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-5">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex items-center gap-2">
            {hotel.facilities.slice(0, 3).map((fa) => (
              <span className="whitespace-nowrap rounded-lg bg-slate-300/80 p-2 text-xs font-bold">
                {fa}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="ml-auto flex flex-col items-end justify-center gap-1">
            <span className="font-medium">${hotel.pricePerNight}/Night</span>
            {/* todo fetch data */}
            <Link
              to={`/detail/${hotel._id}`}
              className="hover:bg-blue-700 rounded-sm bg-blue-600 px-2.5 py-1.5 text-sm font-semibold
                text-white"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
