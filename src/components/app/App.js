import Form from "../form/Form";
import NavBar from "../navBar/NavBar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { BrowserRouter } from "react-router-dom/dist";
import Reservations from "../reservations/Reservations";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Form />}></Route>
          <Route exact path="/reservations" element={<Reservations />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
