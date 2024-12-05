import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext/useAppContext';

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">HotelBookings.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center justify-center rounded-t-sm bg-white px-3 py-2 font-bold text-blue-600 hover:bg-gray-100"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center justify-center rounded-t-sm bg-white px-3 py-2 font-bold text-blue-600 hover:bg-gray-100"
              >
                My Hotels
              </Link>
              <Link
                to="/sign-out"
                className="flex items-center justify-center rounded-t-sm bg-white px-3 py-2 font-bold text-blue-600 hover:bg-gray-100"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center justify-center rounded-t-sm bg-white px-3 py-2 font-bold text-blue-600 hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
