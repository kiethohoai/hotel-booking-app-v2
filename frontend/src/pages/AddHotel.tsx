import { useMutation, useQueryClient } from 'react-query';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext/useAppContext';
import * as apiClient from '../api-client';
import { useNavigate } from 'react-router-dom';

const AddHotel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: 'Hotel Added Successfully', type: 'SUCCESS' });
      queryClient.invalidateQueries('fetchMyHotels');
      navigate('/my-hotels');
    },
    onError: () => {
      showToast({ message: 'Hotel Added Failed', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
