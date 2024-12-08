import { useQuery } from 'react-query';
import useSearchContext from '../contexts/SearchContext/useSearchContext';
import * as apiClient from '../api-client';
import { useState } from 'react';
import SearchResultsCard from '../components/SearchResultsCard';

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData } = useQuery(['searchHotels', searchParams], () =>
    apiClient.searchHotels(searchParams),
  );

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_1fr]">
      {/* filter side */}
      <div className="static sm:sticky top-10 h-fit rounded-lg border border-slate-300 p-5">
        <div className="space-y-5">
          <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
            Filter by:
          </h3>
          {/* TODO FILTERS */}
        </div>
      </div>

      {/* search side */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            {hotelData?.pagination?.total || 0} hotels found
            {search.destination ? ` in ${search.destination}` : ''}
          </span>
          {/* todo sort options */}
          <span>Sort options</span>
        </div>

        {hotelData?.data.map((hotel) => <SearchResultsCard hotel={hotel} />)}
      </div>
    </div>
  );
};

export default Search;
