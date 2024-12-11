import { hotelTypes } from '../config/hotel-options-config';

type Props = {
  selectedHotelTypes: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b pb-5">
      <h4 className="text-lg font-semibold mb-2">Hotel Types</h4>
      {hotelTypes.map((hotelType, i) => (
        <label className="flex items-center space-x-2" key={`star-${i}`}>
          <input
            type="checkbox"
            className="rounded"
            value={hotelType}
            checked={selectedHotelTypes?.includes(hotelType)}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
