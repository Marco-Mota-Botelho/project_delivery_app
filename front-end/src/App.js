import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import ThemeContext from './context/ThemeContext';
import { lightTheme, darkTheme } from './styles/Theme/Theme';
import OrderDetails from './pages/OrderDetails';

function App() {
  const { isDark } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={ isDark ? darkTheme : lightTheme }>
      <Routes>
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/" element={ <Navigate replace to="/login" /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/orders" element={ <Orders /> } />
        <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />

        <Route exact path="/seller/orders" element={ <Orders /> } />
        <Route exact path="/seller/orders/:id" element={ <OrderDetails /> } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
