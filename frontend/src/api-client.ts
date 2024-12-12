import {
  HotelSearchRespone,
  HotelType,
  UserType,
} from './../../backend/src/shared/types';
import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/* GET CURRENT USER DETAIL */
export const fetchCurrentUser = async (): Promise<UserType> => {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error(`Error fetching user`);
  return await res.json();
};

/* REGISTER */
export const register = async (formData: RegisterFormData) => {
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

/* GET (DETAIL) MY HOTEL */
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Error fetching Hotel');
  return await res.json();
};

/* updateMyHotelById */
export const updateMyHotelById = async (hotelFormData: FormData) => {
  const res = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
    {
      method: 'PUT',
      body: hotelFormData,
      credentials: 'include',
    },
  );

  if (!res.ok) throw new Error('Failed to update Hotel');
  return await res.json();
};

/* TYPE SearchParams */
export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;

  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

/* searchHotels */
export const searchHotels = async (
  searchParams: SearchParams,
): Promise<HotelSearchRespone> => {
  // Prepare query
  const queryParams = new URLSearchParams();
  queryParams.append('destination', searchParams.destination || '');
  queryParams.append('checkIn', searchParams.checkIn || '');
  queryParams.append('checkOut', searchParams.checkOut || '');
  queryParams.append('adultCount', searchParams.adultCount || '');
  queryParams.append('childCount', searchParams.childCount || '');
  queryParams.append('page', searchParams.page || '');

  queryParams.append('maxPrice', searchParams.maxPrice || '');
  queryParams.append('sortOption', searchParams.sortOption || '');

  searchParams.types?.forEach((type) => queryParams.append('types', type));
  searchParams.stars?.forEach((star) => queryParams.append('stars', star));
  searchParams.facilities?.forEach((facility) =>
    queryParams.append('facilities', facility),
  );

  // Call API
  const res = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);
  if (!res.ok) throw new Error('Error fetching hotels');

  const data = await res.json();
  return data.respone;
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Error fetching hotel');

  return await res.json();
};
