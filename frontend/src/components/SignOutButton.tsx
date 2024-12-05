import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext/useAppContext';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      showToast({ type: 'SUCCESS', message: 'Signed Out Successfully' });
      await queryClient.invalidateQueries('validateToken');
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ type: 'ERROR', message: error.message });
    },
  });

  const onSignOutClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="flex items-center justify-center rounded-t-sm bg-white px-3 py-2 font-bold text-blue-600 hover:bg-gray-100"
      onClick={onSignOutClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
