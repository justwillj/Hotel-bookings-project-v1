import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Form from '../form/Form';
import NavBar from '../navBar/NavBar';
import './App.css';
import Reservations from '../reservations/Reservations';
import CreateReservation from '../createReservation/CreateReservation';
import UpdateReservation from '../updateReservation/UpdateReservation';
import PrivateRoute from '../privateRoute/PrivateRoute';
import PrivateRouteManager from '../privateRouteManager/PrivateRouteManager';
import RoomTypes from '../room-types/RoomTypes';
import CreateRoomTypes from '../createRoomTypes/CreateRoomTypes';
import UpdateRoomType from '../updateRoomType/UpdateRoomType';
import PageNotFound from '../pageNotFound/PageNotFound';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('role', '');
    sessionStorage.setItem('user', '');
    setLoggedIn(false);
  };

  useEffect(() => {
    const data = window.localStorage.getItem('logStatus');
    setLoggedIn(data);
  }, []);

  useEffect(() => {
    // link that helped me with this
    // https://www.youtube.com/watch?v=rWfhwW9forg
    window.localStorage.setItem('logStatus', loggedIn);
  }, [loggedIn]);

  return (
    <div>
      <BrowserRouter>
        <NavBar logout={logout} status={loggedIn} />

        <Routes>
          <Route exact path="/" element={<Form setStatus={setLoggedIn} />} />

          <Route
            exact
            path="/reservations"
            element={(
              <PrivateRoute>
                <Reservations />
              </PrivateRoute>
            )}
          />
          <Route
            exact
            path="/reservations/create"
            element={(
              <PrivateRoute>
                <CreateReservation />
              </PrivateRoute>
            )}
          />
          <Route
            exact
            path="/reservations/edit/:id"
            element={(
              <PrivateRoute>
                <UpdateReservation />
              </PrivateRoute>
            )}
          />

          <Route
            exact
            path="/room-types"
            element={(
              <PrivateRouteManager>
                <RoomTypes />
              </PrivateRouteManager>
            )}
          />

          <Route
            exact
            path="/room-types/create"
            element={(
              <PrivateRouteManager>
                <CreateRoomTypes />
              </PrivateRouteManager>
            )}
          />

          <Route
            exact
            path="/room-types/edit/:id"
            element={(
              <PrivateRouteManager>
                <UpdateRoomType />
              </PrivateRouteManager>
            )}
          />

          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
