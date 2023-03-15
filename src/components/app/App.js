import Form from "../form/Form";
import NavBar from "../navBar/NavBar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { BrowserRouter } from "react-router-dom/dist";
import Reservations from "../reservations/Reservations";
import CreateReservation from "../createReservation/CreateReservation";
import UpdateReservation from "../updateReservation/UpdateReservation";
import { useState } from "react";
import PrivateRoute from "../privateRoute/PrivateRoute";

function App() {
  const logout = () => {
    sessionStorage.setItem("token", "");
  };
  return (
    <div>
      <BrowserRouter>
        <NavBar logout={logout} />

        <Routes>
          <Route exact path="/" element={<Form />}></Route>

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
            element={<CreateReservation />}
          ></Route>
          <Route
            exact
            path="/reservations/edit/:id"
            element={<UpdateReservation />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
