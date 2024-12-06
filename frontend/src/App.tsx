import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import { useAppContext } from './contexts/AppContext/useAppContext';
import AddHotel from './pages/AddHotel';

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
              <h1>Home Page</h1>
            </Layout>
          }
        ></Route>

        {/* Search Page */}
        <Route
          path="/search"
          element={
            <Layout>
              <h1>Search Page</h1>
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
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            ></Route>
          </>
        )}

        {/* TESTING ONLY */}
        {/* Add Hotel */}
        <Route
          path="/add-hotel"
          element={
            <Layout>
              <AddHotel />
            </Layout>
          }
        ></Route>

        {/* All Routes */}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
