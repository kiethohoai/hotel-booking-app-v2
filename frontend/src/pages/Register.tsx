import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';

/* RegisterFormData */
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

/* Register */
const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      alert(`Registration Successfully`);
    },
    onError: () => {
      alert(`Registration Failed`);
    },
  });

  const onSubmit = handleSubmit((data) => {
    // Submit form to API
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>

      {/* Fist Name & Last Name */}
      <div className="flex flex-col gap-5 md:flex-row">
        <label className="flex-1 text-sm font-bold text-gray-700">
          Fist Name
          <input
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register('firstName', { required: 'This field is required' })}
          />
          {errors.firstName && (
            <span className="font-bold text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name
          <input
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register('lastName', { required: 'This field is required' })}
          />
          {errors.lastName && (
            <span className="font-bold text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

      {/* Email */}
      <label className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
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
          <span className="font-bold text-red-500">{errors.password.message}</span>
        )}
      </label>

      {/* Confirm Password */}
      <label className="flex-1 text-sm font-bold text-gray-700">
        Confirm Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register('confirmPassword', {
            validate: (value) => {
              if (!value) return 'This field is required';
              if (watch('password') !== value) return `Your password don't match`;
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="font-bold text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      <div className="flex items-center justify-between">
        <span>
          Already registered ?{' '}
          <Link to="/login" className="italic underline">
            Login in here!
          </Link>
        </span>

        <button
          type="submit"
          className="rounded-sm bg-blue-600 px-4 py-2 text-xl font-bold text-white hover:bg-blue-700"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Register;
