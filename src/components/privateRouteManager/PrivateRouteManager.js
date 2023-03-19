import { Navigate } from 'react-router';
import React from 'react';

function PrivateRouteManager({ children }) {
  return sessionStorage.getItem('token') !== ''
    && sessionStorage.getItem('role') === 'manager' ? (
      children
    ) : (
      <Navigate to="/reservations" />
    );
}
export default PrivateRouteManager;
