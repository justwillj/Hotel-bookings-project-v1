import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { isValidRoomName, isValidNumber } from "../../validation";
import Button from "../button/Button";
import Input from "../input/Input";
import ServerError from "../serverError/ServerError";
import Spinner from "../spinner/Spinner";
import "./UpdateRoomType.css";
const UpdateRoomType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState({ value: "", error: false });

  const [description, setDescription] = useState({ value: "", error: false });

  const [rate, setRate] = useState({ value: "", error: false });

  const [activeStatus, setActiveStatus] = useState({
    value: false,
    error: false,
  });

  //Holds the reservations data
  const [reservationsData, setReservationsData] = useState([]);

  const [roomTypesData, setRoomTypesData] = useState([]);

  //Sets the spinner to appear if we are loading data and will toggle the error message to appear is something is wrong
  const [dataState, setDataState] = useState({ loading: true, error: false });

  const descriptionOnChange = (e) => {
    setDescription({ ...description, value: e.target.value, error: false });
  };

  const InputOnChange = (e) => {
    //get the name from the input
    const inputName = e.target.name;
    //update state variables accordingly
    switch (inputName) {
      case "Name:":
        setRoomName({ ...roomName, value: e.target.value, error: false });
        break;
      case "Rate:":
        setRate({ ...rate, value: e.target.value, error: false });
        break;
      case "Active Status:":
        setActiveStatus({
          ...activeStatus,
          value: !activeStatus.value,
          error: false,
        });
        break;
      default:
    }
  };

  const updateRoomType = (e) => {
    let formIsValid = true;

    if (!isValidRoomName(roomName.value)) {
      setRoomName({ ...roomName, error: true });
      formIsValid = false;
      e.preventDefault();
    }

    if (isValidNumber(rate.value)) {
      setRate({ ...rate, error: true });
      formIsValid = false;
      e.preventDefault();
    }

    if (formIsValid === true) {
      addData();
      e.preventDefault();
    }
  };

  /**
   * Loads the getAllData function when the page is opened
   */
  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = () => {
    axios
      .get(`http://localhost:8080/room-types/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (!res.status == 200) {
          throw Error;
        }
        return (
          setRoomName({
            ...roomName,
            value: res.data.name,
            error: false,
          }),
          setDescription({
            ...description,
            value: res.data.description,
            error: false,
          }),
          setRate({
            ...rate,
            value: res.data.rate,
            error: false,
          }),
          setActiveStatus({
            ...activeStatus,
            value: res.data.active,
            error: false,
          }),
          setDataState({ ...dataState, loading: false, error: false })
        );
      })
      .catch((err) => {
        setDataState({ ...dataState, loading: true, error: true });
      });
  };

  const addData = () => {
    //Link that helped me with this
    //https://blog.logrocket.com/how-to-use-axios-post-requests/
    setDataState({ ...dataState, loading: true, error: false });
    axios
      .put(
        `http://localhost:8080/room-types/${id}`,
        {
          name: roomName.value,
          description: description.value,
          rate: rate.value,
          active: activeStatus.value,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        navigate("/room-types");
      })
      .catch((err) => {
        setDataState({ ...dataState, loading: false, error: true });
      });
  };

  return (
    <div className="main-create">
      <h1>Edit Room-Type Page</h1>
      {dataState.loading ? <Spinner /> : null}
      {dataState.error ? (
        <ServerError />
      ) : (
        <form className="main" onSubmit={updateRoomType} noValidate>
          <Input
            label="Name:"
            type="text"
            value={roomName.value}
            onChange={InputOnChange}
          />
          {roomName.error ? (
            <p className="error">Must be at least 3 characters</p>
          ) : null}

          <label htmlFor="Description:">Description:</label>
          <textarea
            value={description.value}
            onChange={descriptionOnChange}
          ></textarea>

          <Input
            label="Rate:"
            type="number"
            value={rate.value}
            onChange={InputOnChange}
          />
          {rate.error ? (
            <p className="error">Must be number greater than zero</p>
          ) : null}

          <Input
            label="Active Status:"
            type="checkbox"
            checked={activeStatus.value}
            value={activeStatus.value}
            onChange={InputOnChange}
          />

          <Button value="Update" className="create-btn" />
        </form>
      )}
    </div>
  );
};
export default UpdateRoomType;