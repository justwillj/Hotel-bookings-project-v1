import { useState, useEffect } from "react";
import { isValidDate, isValidEmail, isValidNumber } from "../../validation";
import Button from "../button/Button";
import Input from "../input/Input";
import "./CreateReservations.css";
const CreateReservation = () => {
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
  const [dataState, setDataState] = useState({ loading: false, error: false });

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
    }

    if (!isValidDate(checkInDate.value)) {
      setCheckInDate({ ...checkInDate, error: true });
      formIsValid = false;
    }

    if (isValidNumber(numberOfNights.value)) {
      setNumberOfNights({ ...numberOfNights, error: true });
      formIsValid = false;
    }

    if (roomType.value == "") {
      setRoomType({ ...roomType, error: true });
      formIsValid = false;
    }

    e.preventDefault();
  };

  return (
    <div>
      <h1>Create Reservation Page</h1>
      <form className="main" onSubmit={addNewReservation} noValidate>
        <Input
          label="Guest Email:"
          type="email"
          value={guestEmail.value}
          onChange={InputOnChange}
        />
        {guestEmail.error ? <p>Must be a valid email</p> : null}
        <Input
          label="Check-in date:"
          type="text"
          value={checkInDate.value}
          onChange={InputOnChange}
        />
        {checkInDate.error ? <p>Date must be mm-dd-yyyy</p> : null}
        <Input
          label="Number of nights:"
          type="number"
          value={numberOfNights.value}
          onChange={InputOnChange}
        />
        {numberOfNights.error ? <p>Must be number greater than zero</p> : null}
        <label htmlFor="Room Type:">Room Type:</label>
        <select value={roomType.value} onChange={selectOnChange}>
          <option value="" disabled selected>
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
        {roomType.error ? <p>Must select a room type</p> : null}
        <Button value="Create" className="create-btn" />
      </form>
    </div>
  );
};
export default CreateReservation;
