import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold">Guests</h2>

      <div className="grid grid-cols-2 gap-6 bg-gray-300 p-6">
        {/* Adult */}
        <label className="flex-1 text-sm font-bold text-gray-700">
          Adults
          <input
            type="number"
            min={1}
            // defaultValue={1}
            className="w-full rounded border px-2 py-1 font-normal"
            {...register('adultCount', { required: 'This field is required' })}
          />
          {errors.adultCount && (
            <span className="font-bold text-red-500">{errors.adultCount.message}</span>
          )}
        </label>

        {/* Child */}
        <label className="flex-1 text-sm font-bold text-gray-700">
          Children
          <input
            type="number"
            min={0}
            // defaultValue={0}
            className="w-full rounded border px-2 py-1 font-normal"
            {...register('childCount', { required: 'This field is required' })}
          />
          {errors.childCount && (
            <span className="font-bold text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
