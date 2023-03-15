import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../button/Button";
import Card from "../card/Card";
import "./Reservations.css";
import Spinner from "../spinner/Spinner";
const Reservations = () => {
  //Holds the reservations data
  const [reservationsData, setReservationsData] = useState([]);

  const [roomTypesData, setRoomTypesData] = useState([]);

  //Sets the spinner to appear if we are loading data and will toggle the error message to appear is something is wrong
  const [dataState, setDataState] = useState({ loading: false, error: false });

  const redirect = useNavigate();

  const getAllData = () => {
    //Link that helped me with this
    //https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae
    Promise.all([
      fetch("http://localhost:8080/reservations", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
      fetch("http://localhost:8080/room-types", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }),
    ])
      .then(([resReservations, resRoomTypes]) => {
        if (!resReservations.ok || !resRoomTypes.ok) {
          throw Error;
        }
        return Promise.all([resReservations.json(), resRoomTypes.json()]);
      })
      .then(([dataReservations, dataRoomTypes]) => {
        setReservationsData(dataReservations);
        setRoomTypesData(dataRoomTypes);
        setDataState({ ...dataState, loading: true, error: false });
      })
      .catch((err) => {
        setDataState({ ...dataState, loading: true, error: true });
      });
  };

  /**
   * Loads the getAllData function when the page is opened
   */
  useEffect(() => {
    getAllData();
  }, []);

  const deleteReservation = (id) => {
    //Link that helped me with this
    //https://www.freecodecamp.org/news/how-to-perform-crud-operations-using-react/
    axios
      .delete(`http://localhost:8080/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getAllData();
      });
  };

  return (
    <div className="reservation-main">
      <h1>Reservations Page</h1>
      {dataState.error ? <h2>Oops something went wrong</h2> : null}
      {!dataState.loading ? <Spinner /> : null}
      <div className="grid">
        {reservationsData.map((reservation, index) => {
          return (
            <Card
              total={roomTypesData.map((test) => {
                return (
                  <div key={test.id}>
                    {reservation.roomTypeId == test.id ? (
                      <h1>Total: ${reservation.numberOfNights * test.rate}</h1>
                    ) : null}
                  </div>
                );
              })}
              roomName={roomTypesData.map((test, index) => {
                return (
                  <div key={test.id}>
                    {reservation.roomTypeId == test.id ? (
                      <h1>Room name: {test.name}</h1>
                    ) : null}
                  </div>
                );
              })}
              key={reservation.id}
              guestEmail={reservation.guestEmail}
              checkInDate={reservation.checkInDate}
              numberOfNights={reservation.numberOfNights}
              onClick={() => deleteReservation(reservation.id)}
              endpoint={`edit/${reservation.id}`}
            />
          );
        })}
      </div>

      <Link to="/reservations/create">
        <Button value="Create" />
      </Link>
    </div>
  );
};
export default Reservations;
