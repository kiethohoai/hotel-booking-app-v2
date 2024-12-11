type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Max Price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 400, 500].map((price, i) => (
          <option value={price} key={`max-price-${i}`}>
            ${price} / Night
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
