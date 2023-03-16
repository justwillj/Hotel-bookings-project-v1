import { configure } from "@testing-library/react";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom/dist";
import Button from "../button/Button";
import Input from "../input/Input";
import jwt from "jwt-decode";
import "./Form.css";
import Spinner from "../spinner/Spinner";
import ServerError from "../serverError/ServerError";
const Form = ({ setStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //Sets the spinner to appear if we are loading data and will toggle the error message to appear is something is wrong
  const [dataState, setDataState] = useState({ loading: true, error: false });

  //Link that helped me with this
  //https://bobbyhadz.com/blog/react-onclick-redirect
  const navigate = useNavigate();

  const formLogin = (e) => {
    e.preventDefault();
    setDataState({ ...dataState, loading: false, error: false });
    //Link that helped me with this
    //https://blog.logrocket.com/how-to-use-axios-post-requests/
    axios
      .post("http://localhost:8080/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (!res.status == 200) {
          throw Error(setError(true));
        }
        const user = jwt(res.data.token);
        sessionStorage.setItem("role", user.roles);
        sessionStorage.setItem("user", user.sub);
        sessionStorage.setItem("token", res.data.token);
        setDataState({ ...dataState, loading: false, error: false });
        setStatus(true);
        navigate("/reservations");
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setError(true);
          setDataState({ ...dataState, loading: true, error: false });
        } else {
          setDataState({ ...dataState, loading: true, error: true });
        }
      });
  };

  const InputOnChange = (e) => {
    //get the name from the input
    const inputName = e.target.name;
    //update state variables accordingly
    switch (inputName) {
      case "Email:":
        setEmail(e.target.value);
        break;
      case "Password:":
        setPassword(e.target.value);
        break;
      default:
    }
  };

  return (
    <div className="loading">
      {!dataState.loading ? <Spinner /> : null}
      <div className="login-main">
        {dataState.error ? (
          <ServerError />
        ) : (
          <div className="main">
            <form onSubmit={formLogin} noValidate>
              <h1>Login</h1>
              {error ? (
                <p className="error-login">Invalid email or password</p>
              ) : null}
              <Input
                label="Email:"
                type="email"
                value={email}
                onChange={InputOnChange}
              />
              <Input
                label="Password:"
                type="email"
                value={password}
                onChange={InputOnChange}
              />
              <Button className="login-btn" onClick={formLogin} value="Login" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default Form;
