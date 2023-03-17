import { Navigate } from 'react-router';
import React from 'react';

function PrivateRoute({ children }) {
  return sessionStorage.getItem('token') != '' ? children : <Navigate to="/" />;
}
export default PrivateRoute;
