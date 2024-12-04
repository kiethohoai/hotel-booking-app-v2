import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Register from './pages/Register';

export default function App() {
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

        {/* All Routes */}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
