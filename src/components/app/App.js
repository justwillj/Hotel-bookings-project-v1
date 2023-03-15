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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    sessionStorage.setItem("token", "");
    const data = window.localStorage.getItem("logStatus");
    setLoggedIn(data);
    setLoggedIn(false);
  };

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
