import { useFormContext } from 'react-hook-form';
import { hotelFacilities } from '../../config/hotel-options-config';
import { HotelFormData } from './ManageHotelForm';

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold">Facilities</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => {
          return (
            <label
              htmlFor={facility}
              key={`facility-${facility}`}
              className="flex items-center gap-1 text-sm text-gray-700"
            >
              <input
                id={facility}
                type="checkbox"
                value={facility}
                {...register('facilities', {
                  validate: (facilities) => {
                    if (facilities && facilities.length > 0) return true;
                    else return 'At least 1 facility is required';
                  },
                })}
              />
              <span>{facility}</span>
            </label>
          );
        })}
      </div>
      {errors.facilities && (
        <span className="text-sm font-bold text-red-500">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
