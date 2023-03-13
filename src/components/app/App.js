import Form from "../form/Form";
import NavBar from "../navBar/NavBar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { BrowserRouter } from "react-router-dom/dist";
import Reservations from "../reservations/Reservations";
import CreateReservation from "../createReservation/CreateReservation";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Form />}></Route>
          <Route exact path="/reservations" element={<Reservations />}></Route>
          <Route
            exact
            path="/reservations/create"
            element={<CreateReservation />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
