import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import useSearchContext from '../../contexts/SearchContext/useSearchContext';
import { useAppContext } from '../../contexts/AppContext/useAppContext';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );

    navigate('/sign-in', { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );

    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-xl font-bold">${pricePerNight}</h3>
      <form
        className="grid grid-cols-1 gap-4 items-center"
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div>
          <DatePicker
            className="min-w-full rounded-sm p-2 focus:outline-none"
            dateFormat={'dd/MM/yyyy'}
            selected={checkIn}
            onChange={(date) => setValue('checkIn', date as Date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            wrapperClassName="min-w-full"
            required
          />
        </div>
        <div>
          <DatePicker
            className="min-w-full rounded-sm p-2 focus:outline-none"
            dateFormat={'dd/MM/yyyy'}
            selected={checkOut}
            onChange={(date) => setValue('checkOut', date as Date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            wrapperClassName="min-w-full"
            required
          />
        </div>

        <div className="flex gap-2 rounded-sm bg-white px-3 py-2 text-center">
          <label className="flex flex-1 items-center">
            Adult:
            <input
              className="text-center"
              type="number"
              min={1}
              max={20}
              {...register('adultCount', {
                required: 'This field is required',
                min: {
                  value: 1,
                  message: 'There must be at least 1 adult',
                },
                valueAsNumber: true,
              })}
            />
          </label>
          {errors.adultCount && (
            <span className="font-bold text-red-500 text-sm">
              {errors.adultCount.message}
            </span>
          )}

          <label className="flex flex-1 items-center">
            Child:
            <input
              type="number"
              min={0}
              max={20}
              className="w-full text-center font-bold focus:outline-none"
              {...register('childCount', {
                valueAsNumber: true,
              })}
            />
          </label>
        </div>

        {isLoggedIn ? (
          <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-700 text-xl">
            Book Now
          </button>
        ) : (
          <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-700 text-xl">
            Sign in to Book
          </button>
        )}
      </form>
    </div>
  );
};

export default GuestInfoForm;
