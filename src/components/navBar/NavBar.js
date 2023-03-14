import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
const NavBar = ({}) => {
  return (
    <nav>
      <div className="header">
        <h2>Hotel Bookings</h2>
      </div>
      <ul>
        <li>
          <NavLink to="/reservations">Reservations</NavLink>
        </li>

        <li>
          <NavLink to="/room-types"> Room Types</NavLink>
        </li>

        <li>Logout</li>
      </ul>
    </nav>
  );
};
export default NavBar;
