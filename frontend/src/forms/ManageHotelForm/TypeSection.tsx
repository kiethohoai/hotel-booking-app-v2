import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../../config/hotel-options-config';
import { HotelFormData } from './ManageHotelForm';

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch('type');

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            htmlFor={type}
            key={`type-${type}`}
            className={
              typeWatch === type
                ? 'cursor-pointer rounded-full bg-blue-300 px-4 py-2 text-sm font-semibold'
                : 'cursor-pointer rounded-full bg-gray-300/90 px-4 py-2 text-sm font-semibold'
            }
          >
            <input
              id={type}
              type="radio"
              value={type}
              className="hidden"
              {...register('type', { required: 'This field is required' })}
            />
            <span> {type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="font-bold text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
