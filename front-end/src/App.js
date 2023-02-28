import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/" element={ <Navigate replace to="/login" /> } />
      <Route exact path="/register" element={ <Register /> } />
    </Routes>
  );
}

export default App;
