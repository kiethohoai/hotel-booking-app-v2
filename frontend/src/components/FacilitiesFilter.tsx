import { hotelFacilities } from '../config/hotel-options-config';

type Props = {
  selectedFacilities: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b pb-5">
      <h4 className="text-lg font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility, i) => (
        <label className="flex items-center space-x-2" key={`star-${i}`}>
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities?.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
