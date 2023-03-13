import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import Button from "../button/Button";
import Card from "../card/Card";
import "./Reservations.css";
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
      fetch("https://640d0c1b1a18a5db83702985.mockapi.io/reservations"),
      fetch("https://640d0c1b1a18a5db83702985.mockapi.io/room-types"),
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

  return (
    <div>
      <h1>Reservations Page</h1>
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
            />

            // <h3>{reservation.guestEmail}</h3>
            // <h3>{reservation.checkInDate}</h3>
            // {roomTypesData.map((test) => {
            //   return (
            //     <>
            //       {reservation.roomTypeId == test.id ? (
            //         <h3>{test.name}</h3>
            //       ) : null}
            //     </>
            //   );
            // })}
            // <h3>{reservation.numberOfNights}</h3>
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
