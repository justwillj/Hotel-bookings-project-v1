import Form from "../form/Form";
import NavBar from "../navBar/NavBar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { BrowserRouter } from "react-router-dom/dist";
import Reservations from "../reservations/Reservations";
import CreateReservation from "../createReservation/CreateReservation";
import UpdateReservation from "../updateReservation/UpdateReservation";
import { useState, useEffect } from "react";
import PrivateRoute from "../privateRoute/PrivateRoute";
import PrivateRouteManager from "../privateRouteManager/PrivateRouteManager";
import RoomTypes from "../room-types/RoomTypes";
import CreateRoomTypes from "../createRoomTypes/CreateRoomTypes";
import UpdateRoomType from "../updateRoomType/UpdateRoomType";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("role", "");
    sessionStorage.setItem("user", "");
    setLoggedIn(false);
  };

  useEffect(() => {
    const data = window.localStorage.getItem("logStatus");
    setLoggedIn(data);
  }, []);

  useEffect(() => {
    //link that helped me with this
    //https://www.youtube.com/watch?v=rWfhwW9forg
    window.localStorage.setItem("logStatus", loggedIn);
  }, [loggedIn]);

  return (
    <div>
      <BrowserRouter>
        <NavBar logout={logout} status={loggedIn} />

        <Routes>
          <Route
            exact
            path="/"
            element={<Form setStatus={setLoggedIn} />}
          ></Route>

          <Route
            exact
            path="/reservations"
            element={
              <PrivateRoute>
                <Reservations />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/reservations/create"
            element={
              <PrivateRoute>
                <CreateReservation />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/reservations/edit/:id"
            element={
              <PrivateRoute>
                <UpdateReservation />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/room-types"
            element={
              <PrivateRouteManager>
                <RoomTypes />
              </PrivateRouteManager>
            }
          ></Route>

          <Route
            exact
            path="/room-types/create"
            element={
              <PrivateRouteManager>
                <CreateRoomTypes />
              </PrivateRouteManager>
            }
          ></Route>

          <Route
            exact
            path="/room-types/edit/:id"
            element={
              <PrivateRouteManager>
                <UpdateRoomType />
              </PrivateRouteManager>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
