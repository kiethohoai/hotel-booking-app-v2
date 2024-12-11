import { useQuery } from 'react-query';
import useSearchContext from '../contexts/SearchContext/useSearchContext';
import * as apiClient from '../api-client';
import { useState } from 'react';
import SearchResultsCard from '../components/SearchResultsCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import FacilitiesFilter from '../components/FacilitiesFilter';
import PriceFilter from '../components/PriceFilter';

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>('');

  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = e.target.value;
    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating),
    );
  };

  const handleHotelTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = e.target.value;
    setSelectedHotelTypes((prevHotelTypes) =>
      e.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((type) => type !== hotelType),
    );
  };

  const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const facility = e.target.value;
    setSelectedFacilities((prevFacilities) =>
      e.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((type) => type !== facility),
    );
  };

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: sortOption,
  };

  const { data: hotelData } = useQuery(['searchHotels', searchParams], () =>
    apiClient.searchHotels(searchParams),
  );

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_1fr]">
      {/* FILTER LEFT SIDE */}
      <div className="md:sticky top-10 h-fit rounded-lg border border-slate-300 p-5">
        <div className="space-y-5">
          <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypesChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilitiesChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>

      {/* RESULT RIGHT SIDE */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            {hotelData?.pagination?.total || 0} hotels found
            {search.destination ? ` in ${search.destination}` : ''}
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-md font-bold"
          >
            <option value="">Sort by</option>
            <option value="starRating">starRating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (hight to low)
            </option>
          </select>
        </div>

        {hotelData?.data.map((hotel, index) => (
          <SearchResultsCard hotel={hotel} key={`hotelData-${index}`} />
        ))}

        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
