import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isValidDate, isValidEmail, isValidNumber } from '../../validation';
import Button from '../button/Button';
import Input from '../input/Input';
import ServerError from '../serverError/ServerError';
import Spinner from '../spinner/Spinner';

import './CreateReservations.css';

function CreateReservation() {
  // Allows the user to be redirected on successfully update
  const navigate = useNavigate();

  // Holds onto the value and error state for guest email
  const [guestEmail, setGuestEmail] = useState({ value: '', error: false });

  // Holds onto the value and error state for check in date
  const [checkInDate, setCheckInDate] = useState({ value: '', error: false });

  // Holds onto the value and error state for number of nights
  const [numberOfNights, setNumberOfNights] = useState({
    value: '',
    error: false
  });
  // Holds onto the value and error state for room type
  const [roomType, setRoomType] = useState({ value: '', error: false });

  // Stores the room type data from the api
  const [roomTypesData, setRoomTypesData] = useState([]);

  // Sets the spinner to appear if we are loading data and will toggle the error
  // message to appear is something is wrong
  const [dataState, setDataState] = useState({ loading: true, error: false });

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
        setDataState({ ...dataState, loading: false, error: false });
      })
      .catch(() => {
        setDataState({ ...dataState, loading: false, error: true });
      });
  };

  /**
   * Will add the new reservation to the api and database
   */
  const addData = () => {
    // Link that helped me with this
    // https://blog.logrocket.com/how-to-use-axios-post-requests/
    setDataState({ ...dataState, loading: true, error: false });
    axios
      .post(
        'http://localhost:8080/reservations',
        {
          user: sessionStorage.getItem('user'),
          guestEmail: guestEmail.value,
          roomTypeId: roomType.value,
          checkInDate: checkInDate.value,
          numberOfNights: numberOfNights.value
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        }
      )
      .then(() => {
        navigate('/reservations');
      })
      .catch(() => {
        setDataState({ ...dataState, loading: false, error: true });
      });
  };

  /**
   * Loads the getAllData function when the page is opened
   */
  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Grabs the value the user select and changes the state of it
   * @param {Event} e - The change of the value
   */
  const selectOnChange = (e) => {
    setRoomType({ ...roomType, value: e.target.value, error: false });
  };

  /**
   * Grabs the value the user select and changes the state of it for each of the inputs
   * @param {Event} e The change of the value
   */
  const InputOnChange = (e) => {
    // get the name from the input
    const inputName = e.target.name;
    // update state variables accordingly
    switch (inputName) {
      case 'Guest Email:':
        setGuestEmail({ ...guestEmail, value: e.target.value, error: false });
        break;
      case 'Check-in date:':
        setCheckInDate({ ...checkInDate, value: e.target.value, error: false });
        break;
      case 'Number of nights:':
        setNumberOfNights({
          ...numberOfNights,
          value: e.target.value,
          error: false
        });
        break;
      default:
    }
  };

  /**
   * Checks over all the inputs to make sure they are valid
   * @param {SubmitEvent} e - when the user clicks the create button
   */
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

    if (roomType.value === '') {
      setRoomType({ ...roomType, error: true });
      formIsValid = false;
      e.preventDefault();
    }

    if (formIsValid === true) {
      addData();
      e.preventDefault();
    }
  };

  return (
    <div className="main-create">
      <h1>Create Reservation</h1>
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
          <label htmlFor="Room Type:">
            Room Type:
            <select id="Room Type:" value={roomType.value} onChange={selectOnChange}>
              <option value="" disabled>
                Select your room type
              </option>
              {roomTypesData.map((test) => (test.active === true ? (
                <option key={test.id} value={test.id}>
                  {test.name}
                </option>
              ) : null))}
            </select>
          </label>
          <br />
          {roomType.error ? (
            <p className="error">Must select a room type</p>
          ) : null}
          <Button value="Create" className="create-btn" onClick={addNewReservation} />
        </form>
      )}
    </div>
  );
}
export default CreateReservation;
