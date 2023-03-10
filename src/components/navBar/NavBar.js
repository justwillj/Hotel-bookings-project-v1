import "./NavBar.css";
import { Link } from "react-router-dom";
const NavBar = ({}) => {
  return (
    <nav>
      <div className="header">
        <h2>Hotel Bookings</h2>
      </div>
      <ul>
        <li>Reservations</li>
        <li>Room Types</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};
export default NavBar;
