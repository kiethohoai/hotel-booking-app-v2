import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppContext } from './contexts/AppContext/useAppContext';
import Layout from './layout/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import Home from './pages/Home';

export default function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* HomePage */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>

        {/* Search Page */}
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        ></Route>

        {/* Detail Page */}
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        ></Route>

        {/* Register Page */}
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        ></Route>

        {/* SignIn Page */}
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        ></Route>

        {isLoggedIn && (
          <>
            {/* Add Hotel */}
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            ></Route>

            {/* Add Hotel */}
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            ></Route>

            {/* Edit Hotels */}
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            ></Route>

            {/* View Hotels */}
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            ></Route>

            {/* Booking Page */}
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <h1>My Bookings Page (Comming Soon)</h1>
                </Layout>
              }
            ></Route>
          </>
        )}

        {/* All Routes */}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
