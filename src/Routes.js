// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import RestaurantDetails from './RestaurantDetails'; // Import the new component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/restaurants/:restaurantId" element={<RestaurantDetails />} />
    </Routes>
  );
};

export default AppRoutes;
