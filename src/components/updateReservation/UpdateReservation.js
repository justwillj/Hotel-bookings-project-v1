import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { isValidDate, isValidEmail, isValidNumber } from '../../validation';
import Button from '../button/Button';
import Input from '../input/Input';
import ServerError from '../serverError/ServerError';
import Spinner from '../spinner/Spinner';
import './UpdateReservation.css';

function UpdateReservation() {
  // Allows the user to be redirected when doing a update
  const navigate = useNavigate();

  // The id of the reservation we are updating
  const { id } = useParams();

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
   * Updates the reservations that matches that id with the new inputs
   */
  const updateData = () => {
    setDataState({ ...dataState, loading: false, error: false });

    // Link that helped me with this
    // https://www.youtube.com/watch?v=GBbGEuZdyRg
    axios
      .put(
        `http://localhost:8080/reservations/${id}`,
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
        setDataState({ ...dataState, loading: true, error: true });
      });
  };

  /**
   * Checks over all the inputs to make sure they are valid
   * @param {SubmitEvent} e - when the user clicks the update button
   */
  const updateOldReservation = (e) => {
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
      updateData();
      e.preventDefault();
    }
  };

  /**
   * Loads all the data for that reservations and fills out the form
   */
  const loadReservation = () => {
    axios
      .get(`http://localhost:8080/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      .then((reservationRes) => {
        if (!reservationRes.status === 200) {
          throw Error;
        }
        return (
          setGuestEmail({
            ...guestEmail,
            value: reservationRes.data.guestEmail,
            error: false
          }),
          setCheckInDate({
            ...checkInDate,
            value: reservationRes.data.checkInDate,
            error: false
          }),
          setNumberOfNights({
            ...numberOfNights,
            value: reservationRes.data.numberOfNights,
            error: false
          }),
          setRoomType({
            ...roomType,
            value: reservationRes.data.roomTypeId,
            error: false
          }),
          getAllData(),
          setDataState({ ...dataState, loading: true, error: false })
        );
      })
      .catch((err) => {
        if (err.code === 'ERR_BAD_REQUEST') {
          navigate('/not-found');
        }
        setDataState({ ...dataState, loading: true, error: true });
      });
  };

  /**
   * Loads the loadReservation function when the page is opened
  */
  useEffect(() => {
    loadReservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-create">
      <h1>Update Reservation Page</h1>
      {!dataState.loading ? <Spinner /> : null}
      {dataState.error ? (
        <ServerError />
      ) : (
        <form className="main" onSubmit={updateOldReservation} noValidate>
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
          <label htmlFor="room-Type">
            Room Type:
            <select name="room-Type" value={roomType.value} onChange={selectOnChange}>
              <option value="">Select your room</option>
              {roomTypesData.map((room) => (room.active === true ? (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ) : null))}
            </select>
          </label>
          <br />
          {roomType.error ? (
            <p className="error">Must select a room type</p>
          ) : null}
          <Button type="submit" value="Update" className="create-btn" />
        </form>
      )}
    </div>
  );
}
export default UpdateReservation;
