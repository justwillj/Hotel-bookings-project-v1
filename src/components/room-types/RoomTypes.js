import './RoomTypes.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/dist';
import Button from '../button/Button';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import ServerError from '../serverError/ServerError';

function RoomTypes() {
  // Holds on to the room types data
  const [roomTypesData, setRoomTypesData] = useState([]);

  // Sets the spinner to appear if we are loading data and will toggle the
  // error message to appear is something is wrong
  const [dataState, setDataState] = useState({ loading: false, error: false });

  /**
   * Grabs the data from the api for room type and stores it in state
   */
  const getAllData = () => {
    // Link that helped me with this
    // https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae
    fetch('http://localhost:8080/room-types', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then((resRoomTypes) => {
        if (!resRoomTypes.ok) {
          throw Error;
        }
        return resRoomTypes.json();
      })
      .then((dataRoomTypes) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <>
                    Name:
                    {room.name}
                  </>
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
                  room.active === true ? (
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
