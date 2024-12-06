import { HotelType } from './../../backend/src/shared/types';
import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/* REGISTER */
const register = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const resBody = await res.json();
  if (!res.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};

/* SIGN IN */
export const signIn = async (formData: SignInFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

/* SIGN OUT */
export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Logged Out Failed');
  return await res.json();
};

/* VALIDATE TOKEN */
export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Token invalid`);
  }

  return await res.json();
};

/* ADD MY HOTEL (CREATE HOTEL) */
export const addMyHotel = async (hotelFormData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData,
  });

  if (!res.ok) throw new Error('Failed to add new Hotel');
  return await res.json();
};

/* GET MY HOTELS */
export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error fetching hotels');
  return await res.json();
};

/* EXPORT */
export { register };
