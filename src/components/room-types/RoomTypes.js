import './RoomTypes.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/dist';
import Button from '../button/Button';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import ServerError from '../serverError/ServerError';

function RoomTypes() {
  // Holds the reservations data
  const [reservationsData, setReservationsData] = useState([]);

  const [roomTypesData, setRoomTypesData] = useState([]);

  // Sets the spinner to appear if we are loading data and will toggle the error message to appear is something is wrong
  const [dataState, setDataState] = useState({ loading: false, error: false });

  const getAllData = () => {
    // Link that helped me with this
    // https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae
    Promise.all([
      fetch('http://localhost:8080/reservations', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }),
      fetch('http://localhost:8080/room-types', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
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
      .catch(() => {
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
    <div className="reservation-main">
      <h1>Room Types Page</h1>
      {!dataState.loading ? <Spinner /> : null}
      <br />
      <div className="reservation-error">
        <Link to="/room-types/create">
          <Button className="create-reservations" value="Create" />
        </Link>

        {dataState.error ? (
          <ServerError />
        ) : (
          <div className="grid">
            {roomTypesData.map((room) => (
              <Card
                key={room.id}
                InputOne={(
                  <p>
                    Name:
                    {room.name}
                  </p>
                )}
                InputTwo={(
                  <>
                    Description:
                    {room.description}
                  </>
                )}
                InputThree={(
                  <>
                    Rate: $
                    {room.rate}
                  </>
)}
                InputFour={
                  room.active == true ? (
                    <>Status: Active</>
                  ) : (
                    <>Status: Inactive</>
                  )
                }
                endpoint={`edit/${room.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default RoomTypes;
