import "./RoomTypes.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Button from "../button/Button";
import Card from "../card/Card";

import Spinner from "../spinner/Spinner";
import ServerError from "../serverError/ServerError";
const RoomTypes = () => {
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
    setDataState({ ...dataState, loading: false, error: false });
    //Link that helped me with this
    //https://www.freecodecamp.org/news/how-to-perform-crud-operations-using-react/
    axios
      .delete(`http://localhost:8080/room-types/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getAllData();
      })
      .catch((err) => {
        setDataState({ ...dataState, loading: true, error: true });
      });
  };

  return (
    <div className="reservation-main">
      <h1>Room Types Page</h1>
      {!dataState.loading ? <Spinner /> : null}
      <br></br>
      <div className="reservation-error">
        <Link to="/room-types/create">
          <Button className="create-reservations" value="Create" />
        </Link>

        {dataState.error ? (
          <ServerError />
        ) : (
          <div className="grid">
            {roomTypesData.map((room) => {
              return (
                <Card
                  key={room.id}
                  InputOne={room.name}
                  InputTwo={room.description}
                  InputThree={<>Rate: ${room.rate}</>}
                  InputFour={
                    room.active == true ? (
                      <>Status: Active</>
                    ) : (
                      <>Status: Inactive</>
                    )
                  }
                  onClick={() => deleteReservation(room.id)}
                  endpoint={`edit/${room.id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default RoomTypes;
