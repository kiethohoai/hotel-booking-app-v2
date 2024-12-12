import { HotelType } from '../../../backend/src/shared/types';

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border p-5 h-fit">
      <h2 className="text-3xl font-bold tracking-tight">
        Your Booking Details
      </h2>

      {/* Location */}
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>

      {/* Checkin & Checkout */}
      <div className="flex justify-between">
        <div>
          Check-in:
          <div className="font-bold">{checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out:
          <div className="font-bold">{checkOut.toDateString()}</div>
        </div>
      </div>

      {/* Nights */}
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>

      {/* Guest */}
      <div>
        Guest:
        <div className="font-bold">
          {adultCount} Adults & {childCount} Children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
