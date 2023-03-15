import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
const NavBar = ({ logout, status }) => {
  console.log(status);
  return (
    <nav>
      <div className="header">
        <h2>Hotel Bookings</h2>
      </div>
      <ul>
        {sessionStorage.getItem("token") != "" ? (
          <li>
            <NavLink to="/reservations">Reservations</NavLink>
          </li>
        ) : null}
        {sessionStorage.getItem("token") != "" &&
        sessionStorage.getItem("role") == "manager" ? (
          <li>
            <NavLink to="/room-types"> Room Types</NavLink>
          </li>
        ) : null}
        {sessionStorage.getItem("token") != "" ? (
          <li>
            <NavLink to="/" onClick={logout}>
              Logout
            </NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
export default NavBar;
