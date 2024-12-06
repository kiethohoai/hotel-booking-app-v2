import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const ImagesSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const existsImageUrls = watch('imageUrls');

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, imageUrl: string) => {
    event.preventDefault();
    setValue(
      'imageUrls',
      existsImageUrls.filter((url) => url !== imageUrl),
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Images</h2>
      <div className="flex flex-col gap-4 rounded border p-4">
        {existsImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existsImageUrls.map((url, i) => (
              <div className="group relative" key={`image-url-${i}`}>
                <img
                  src={url}
                  alt={`image-${i}`}
                  key={`image-url-${i}}`}
                  className="min-h-full object-cover"
                />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal text-gray-700"
          {...register('imageFiles', {
            validate: (images) => {
              const totalLength = images.length + (existsImageUrls?.length || 0);
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
