import './NavBar.css';
import { NavLink } from 'react-router-dom';
import React from 'react';
import ActiveLink from '../activeLink/ActiveLink';

function NavBar({ logout }) {
  return (
    <nav>
      <div className="header">
        <h2>Hotel Bookings</h2>
      </div>
      <ul>
        {/* Will only show if theres a session token  */}
        {sessionStorage.getItem('token') !== '' ? (
          <ActiveLink to="/reservations">Reservations</ActiveLink>
        ) : null}

        {/* Will only show if theres a session token and the user us a manager  */}
        {sessionStorage.getItem('token') !== ''
        && sessionStorage.getItem('role') === 'manager' ? (
          <ActiveLink to="/room-types">Room Types</ActiveLink>
          ) : null}
        {/* Will only show if theres a session token  */}
        {sessionStorage.getItem('token') !== '' ? (
          <li>
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
export default NavBar;
