import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext/useAppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ type: 'SUCCESS', message: 'Logged in Successfully' });
      await queryClient.invalidateQueries('validateToken');
      navigate(location.state?.from?.pathname || '/');
    },
    onError: () => {
      showToast({ type: 'ERROR', message: 'Logged In Failed' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      {/* Email */}
      <label className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          value={'johnho@gmail.com'}
          className="w-full rounded border px-2 py-1 font-normal"
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <span className="font-bold text-red-500">{errors.email.message}</span>
        )}
      </label>

      {/* Password */}
      <label className="flex-1 text-sm font-bold text-gray-700">
        Password
        <input
          type="password"
          value={123456}
          className="w-full rounded border px-2 py-1 font-normal"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="font-bold text-red-500">
            {errors.password.message}
          </span>
        )}
      </label>

      <div className="flex items-center justify-between">
        <span>
          {`Don't have any account ? `}
          <Link to="/register" className="italic underline">
            Create an Account!
          </Link>
        </span>

        <button
          type="submit"
          className="rounded-sm bg-blue-600 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignIn;
