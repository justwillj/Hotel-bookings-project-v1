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

  const formSubmit = () => {
    navigate("/reservations");
  };
  return (
    <div className="main">
      <form onSubmit={formSubmit} noValidate>
        <h1>Login</h1>
        {error ? <p className="error">Invalid email or password</p> : null}
        <Input label="Email:" type="email" />
        <Input label="Password:" type="email" />
        <Button onClick={formSubmit} value="Login" />
      </form>
    </div>
  );
};
export default Form;
