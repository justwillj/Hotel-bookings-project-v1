import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import "./Reservations.css";
const Reservations = () => {
  //Holds the reservations data
  const [reservationsData, setReservationsData] = useState([]);

  const redirect = useNavigate();

  const getAllData = () => {
    //Link that helped me with this
    //https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae

    fetch("http://localhost:8080/login")
      .then((res) => {
        if (!res.ok) {
          throw Error;
        }
        return res.json();
      })
      .then((data) => {
        setReservationsData(data);
        console.log(reservationsData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Loads the getAllData function when the page is opened
   */
  useEffect(() => {
    getAllData();
  }, []);

  const createReservation = () => {
    redirect("/reservations/create");
  };

  return (
    <div>
      <h1>Reservations Page</h1>
      <button onClick={createReservation}>Create</button>
    </div>
  );
};
export default Reservations;
