import { useForm } from 'react-hook-form';
import {
  PaymentIntentRespone,
  UserType,
} from '../../../../backend/src/shared/types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import useSearchContext from '../../contexts/SearchContext/useSearchContext';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as apiClient from '../../api-client';
import { useAppContext } from '../../contexts/AppContext/useAppContext';

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentRespone;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ type: 'SUCCESS', message: 'Booking Saved!' });
      },
      onError: () => {
        showToast({ type: 'ERROR', message: 'Error Saving Booking!' });
      },
    },
  );

  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,

      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),

      hotelId: hotelId,
      paymentIntentId: paymentIntent.paymentIntentId,
      totalCost: paymentIntent.totalCost,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) return;
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === 'succeeded') {
      // Book the room
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-5 rounded-md border p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-bold tracking-tight">
        Confirm Your Details
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <label className="to-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full px-3 py-2 to-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register('firstName')}
          />
        </label>
        <label className="to-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full px-3 py-2 to-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register('lastName')}
          />
        </label>
      </div>

      <label className="to-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="mt-1 border rounded w-full px-3 py-2 to-gray-700 bg-gray-200 font-normal"
          type="text"
          readOnly
          disabled
          {...register('email')}
        />
      </label>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">
          Your Price Summary
        </h3>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Include taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">
          Payment Details
        </h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-3 text-base"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-700 disabled:bg-gray-500"
        >
          {isLoading ? 'Saving...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
