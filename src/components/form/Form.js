import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom/dist";
import Button from "../button/Button";
import Input from "../input/Input";
import "./Form.css";
const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  //Link that helped me with this
  //https://bobbyhadz.com/blog/react-onclick-redirect
  const navigate = useNavigate();

  const formLogin = (e) => {
    e.preventDefault();

    //Link that helped me with this
    //https://blog.logrocket.com/how-to-use-axios-post-requests/
    axios
      .post("https://reqres.in/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (!res.status === 200) {
          throw Error;
        }
        const role = res.data.role;
        console.log(role);
        console.log(res);
        navigate("/reservations");
      })
      .catch((err) => {
        setError(true);
      });
    // navigate("/reservations");
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
    <div className="login-main">
      <div className="main">
        <form onSubmit={formLogin} noValidate>
          <h1>Login</h1>
          {error ? <p className="error">Invalid email or password</p> : null}
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
    </div>
  );
};
export default Form;
