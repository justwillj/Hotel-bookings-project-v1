import { Navigate } from 'react-router';
import React from 'react';

function PrivateRouteManager({ children }) {
  // Will return the user to the reservation page if they are not a manager
  return sessionStorage.getItem('token') !== ''
    && sessionStorage.getItem('role') === 'manager' ? (
      children
    ) : (
      <Navigate to="/reservations" />
    );
}
export default PrivateRouteManager;
