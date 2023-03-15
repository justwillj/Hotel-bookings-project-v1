import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { isValidDate, isValidEmail, isValidNumber } from "../../validation";
import Button from "../button/Button";
import Input from "../input/Input";
import Spinner from "../spinner/Spinner";
import "./UpdateReservation.css";
const UpdateReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    console.log(sessionStorage.getItem("token"));
    loadReservation();
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

    if (roomType.value == "") {
      setRoomType({ ...roomType, error: true });
      formIsValid = false;
      e.preventDefault();
    }

    if (formIsValid === true) {
      updateData();
      navigate("/reservations");
    }
  };

  const updateData = () => {
    //Link that helped me with this
    //https://www.youtube.com/watch?v=GBbGEuZdyRg
    axios.put(
      `http://localhost:8080/reservations/${id}`,
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
    );
  };

  const loadReservation = () => {
    axios
      .get(`http://localhost:8080/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((reservationRes) => {
        if (!reservationRes.status == 200) {
          throw Error;
        }
        return (
          setGuestEmail({
            ...guestEmail,
            value: reservationRes.data.guestEmail,
            error: false,
          }),
          setCheckInDate({
            ...checkInDate,
            value: reservationRes.data.checkInDate,
            error: false,
          }),
          setNumberOfNights({
            ...numberOfNights,
            value: reservationRes.data.numberOfNights,
            error: false,
          }),
          setRoomType({
            ...roomType,
            value: reservationRes.data.roomTypeId,
            error: false,
          }),
          setDataState({ ...dataState, loading: true, error: false })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main-create">
      <h1>Update Reservation Page</h1>
      {!dataState.loading ? (
        <Spinner />
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
          <label htmlFor="Room Type:">Room Type:</label>
          <select value={roomType.value} onChange={selectOnChange}>
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
          <Button type="submit" value="Update" className="create-btn" />
        </form>
      )}
    </div>
  );
};
export default UpdateReservation;
