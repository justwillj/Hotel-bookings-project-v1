import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import jwt from 'jwt-decode';
import Button from '../button/Button';
import Input from '../input/Input';
import './Form.css';
import Spinner from '../spinner/Spinner';
import ServerError from '../serverError/ServerError';

function Form({ setStatus }) {
  // Holds onto the value and error state for email
  const [email, setEmail] = useState('');

  // Holds onto the value and error state for password
  const [password, setPassword] = useState('');

  // Holds onto the value for error
  const [error, setError] = useState(false);

  // Sets all the user information to blank when the app starts
  sessionStorage.setItem('token', '');
  sessionStorage.setItem('role', '');
  sessionStorage.setItem('user', '');

  // Sets the spinner to appear if we are loading data and will toggle
  // the error message to appear is something is wrong
  const [dataState, setDataState] = useState({ loading: true, error: false });

  // Link that helped me with this
  // https://bobbyhadz.com/blog/react-onclick-redirect
  // Allows the user to be redirected on successfully update
  const navigate = useNavigate();

  /**
   * Checks over the inputs to see if they are in the database and logins the user in
   * and storing the jwt token that is given
   * @param {SubmitEvent} e When the user clicks the login button
   */
  const formLogin = (e) => {
    e.preventDefault();
    setDataState({ ...dataState, loading: false, error: false });
    // Link that helped me with this
    // https://blog.logrocket.com/how-to-use-axios-post-requests/
    axios
      .post('http://localhost:8080/login', {
        email,
        password
      })
      .then((res) => {
        if (!res.status === 200) {
          throw Error(setError(true));
        }
        const user = jwt(res.data.token);
        sessionStorage.setItem('role', user.roles);
        sessionStorage.setItem('user', user.sub);
        sessionStorage.setItem('token', res.data.token);
        setDataState({ ...dataState, loading: false, error: false });
        setStatus(true);
        navigate('/reservations');
      })
      .catch((err) => {
        if (err.code === 'ERR_BAD_REQUEST') {
          setError(true);
          setDataState({ ...dataState, loading: true, error: false });
        } else {
          setDataState({ ...dataState, loading: true, error: true });
        }
      });
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
      case 'Email:':
        setEmail(e.target.value);
        setError(false);
        break;
      case 'Password:':
        setPassword(e.target.value);
        setError(false);
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
                type="password"
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
}
export default Form;
