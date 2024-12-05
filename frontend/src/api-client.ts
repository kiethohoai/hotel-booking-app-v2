import { RegisterFormData } from './pages/Register';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

/* EXPORT */
export { register };
