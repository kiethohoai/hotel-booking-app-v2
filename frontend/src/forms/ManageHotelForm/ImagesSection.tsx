import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold">Images</h2>
      <div className="flex flex-col gap-4 rounded border p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal text-gray-700"
          {...register('imageFiles', {
            validate: (images) => {
              const totalLength = images.length;
              if (totalLength === 0) return 'At least 1 image should be added';
              else if (totalLength > 6)
                return 'Total number of images cannot be more than 6';
              else return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-sm font-bold text-red-500">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
