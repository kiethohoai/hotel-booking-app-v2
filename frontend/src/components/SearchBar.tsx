import { FormEvent, useState } from 'react';
import useSearchContext from '../contexts/SearchContext/useSearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [hotelId, setHotelId] = useState<string>(search.hotelId || '');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      hotelId,
    );
    navigate('/search');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 grid grid-cols-2 items-center gap-4 rounded bg-orange-400 p-3 shadow-md
        lg:grid-cols-3 2xl:grid-cols-5"
    >
      <div className="flex flex-1 flex-row items-center rounded-sm bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="flex gap-2 rounded-sm bg-white px-3 py-2">
        <label className="flex flex-1 items-center">
          Adult:
          <input
            type="number"
            min={1}
            max={20}
            className="w-full text-center font-bold focus:outline-none"
            value={adultCount}
            onChange={(e) => setAdultCount(+e.target.value)}
          />
        </label>

        <label className="flex flex-1 items-center">
          Child:
          <input
            type="number"
            min={0}
            max={20}
            className="w-full text-center font-bold focus:outline-none"
            value={childCount}
            onChange={(e) => setChildCount(+e.target.value)}
          />
        </label>
      </div>

      <div>
        <DatePicker
          className="min-w-full rounded-sm p-2 focus:outline-none"
          dateFormat={'dd/MM/yyyy'}
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          wrapperClassName="min-w-full"
        />
      </div>

      <div>
        <DatePicker
          className="min-w-full rounded-sm p-2 focus:outline-none"
          dateFormat={'dd/MM/yyyy'}
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-1">
        <button
          className="h-full w-2/3 rounded-sm bg-blue-600 p-2 text-xl font-bold text-white
            hover:bg-blue-700"
        >
          Search
        </button>
        <button
          className="h-full w-1/3 rounded-sm bg-red-600 p-2 text-xl font-bold text-white
            hover:bg-red-700"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
