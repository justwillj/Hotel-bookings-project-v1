import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { isValidDate, isValidEmail, isValidNumber } from "../../validation";
import Button from "../button/Button";
import Input from "../input/Input";
import ServerError from "../serverError/ServerError";
import Spinner from "../spinner/Spinner";
import "./CreateReservations.css";
const CreateReservation = () => {
  const navigate = useNavigate();
  const [guestEmail, setGuestEmail] = useState({ value: "", error: false });

  const [checkInDate, setCheckInDate] = useState({ value: "", error: false });

  const [numberOfNights, setNumberOfNights] = useState({
    value: "",
    error: false,
  });

  const [roomType, setRoomType] = useState({ value: "", error: false });

  //Holds the reservations data
  const [reservationsData, setReservationsData] = useState([]);

  const [roomTypesData, setRoomTypesData] = useState([]);

  //Sets the spinner to appear if we are loading data and will toggle the error message to appear is something is wrong
  const [dataState, setDataState] = useState({ loading: true, error: false });

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
        setDataState({ ...dataState, loading: false, error: false });
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

  const selectOnChange = (e) => {
    setRoomType({ ...roomType, value: e.target.value, error: false });
  };

  const InputOnChange = (e) => {
    //get the name from the input
    const inputName = e.target.name;
    //update state variables accordingly
    switch (inputName) {
      case "Guest Email:":
        setGuestEmail({ ...guestEmail, value: e.target.value, error: false });
        break;
      case "Check-in date:":
        setCheckInDate({ ...checkInDate, value: e.target.value, error: false });
        break;
      case "Number of nights:":
        setNumberOfNights({
          ...numberOfNights,
          value: e.target.value,
          error: false,
        });
        break;
      default:
    }
  };

  const addNewReservation = (e) => {
    let formIsValid = true;

    if (!isValidEmail(guestEmail.value)) {
      setGuestEmail({ ...guestEmail, error: true });
      formIsValid = false;
      e.preventDefault();
    }

    if (!isValidDate(checkInDate.value)) {
      setCheckInDate({ ...checkInDate, error: true });
      formIsValid = false;
      e.preventDefault();
    }

    if (isValidNumber(numberOfNights.value)) {
      setNumberOfNights({ ...numberOfNights, error: true });
      formIsValid = false;
      e.preventDefault();
    }

    if (roomType.value == "") {
      setRoomType({ ...roomType, error: true });
      formIsValid = false;
      e.preventDefault();
    }

    if (formIsValid === true) {
      addData();
      e.preventDefault();
    }
  };

  const addData = () => {
    //Link that helped me with this
    //https://blog.logrocket.com/how-to-use-axios-post-requests/
    setDataState({ ...dataState, loading: true, error: true });
    axios
      .post(
        `http://localhost:8080/reservations`,
        {
          guestEmail: guestEmail.value,
          roomTypeId: roomType.value,
          checkInDate: checkInDate.value,
          numberOfNights: numberOfNights.value,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        navigate("/reservations");
      })
      .catch((err) => {
        setDataState({ ...dataState, loading: false, error: true });
      });
  };

  return (
    <div className="main-create">
      <h1>Create Reservation Page</h1>
      {dataState.loading ? <Spinner /> : null}
      {dataState.error ? (
        <ServerError />
      ) : (
        <form className="main" onSubmit={addNewReservation} noValidate>
          <Input
            label="Guest Email:"
            type="email"
            value={guestEmail.value}
            onChange={InputOnChange}
          />
          {guestEmail.error ? (
            <p className="error">Must be a valid email</p>
          ) : null}
          <Input
            label="Check-in date:"
            type="text"
            value={checkInDate.value}
            onChange={InputOnChange}
          />
          {checkInDate.error ? (
            <p className="error">Date must be mm-dd-yyyy</p>
          ) : null}
          <Input
            label="Number of nights:"
            type="number"
            value={numberOfNights.value}
            onChange={InputOnChange}
          />
          {numberOfNights.error ? (
            <p className="error">Must be number greater than zero</p>
          ) : null}
          <label htmlFor="Room Type:">Room Type:</label>
          <select value={roomType.value} onChange={selectOnChange}>
            <option value="" disabled>
              Select your room type
            </option>
            {roomTypesData.map((test) => {
              return test.active == true ? (
                <option key={test.id} value={test.id}>
                  {test.name}
                </option>
              ) : null;
            })}
          </select>
          <br></br>
          {roomType.error ? (
            <p className="error">Must select a room type</p>
          ) : null}
          <Button value="Create" className="create-btn" />
        </form>
      )}
    </div>
  );
};
export default CreateReservation;
