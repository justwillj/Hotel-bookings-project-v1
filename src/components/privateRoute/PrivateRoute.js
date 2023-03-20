import { Navigate } from 'react-router';
import React from 'react';

function PrivateRoute({ children }) {
  // Will return the user to the login page if there is no session token in storage
  return sessionStorage.getItem('token') !== '' ? children : <Navigate to="/" />;
}
export default PrivateRoute;
