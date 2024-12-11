type Props = {
  selectedStars: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b pb-5">
      <h4 className="text-lg font-semibold mb-2">Stars Rating</h4>
      {['5', '4', '3', '2', '1'].map((star, i) => (
        <label className="flex items-center space-x-2" key={`star-${i}`}>
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars?.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
