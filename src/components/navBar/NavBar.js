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
        {sessionStorage.getItem('token') !== '' ? (
          <ActiveLink to="/reservations">Reservations</ActiveLink>
        ) : null}

        {sessionStorage.getItem('token') !== ''
        && sessionStorage.getItem('role') === 'manager' ? (
          <ActiveLink to="/room-types">Room Types</ActiveLink>
          ) : null}
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
