import Button from "../button/Button";
import "./Card.css";
const Card = ({
  guestEmail,
  roomName,
  checkInDate,
  numberOfNights,
  total,
  onClick,
}) => {
  return (
    <div className="card">
      <h1>Guest Email: {guestEmail}</h1>
      <h1>{roomName}</h1>
      <h1>Check in date: {checkInDate}</h1>
      <h1>Number of nights: {numberOfNights}</h1>
      <h1>{total}</h1>

      <Button className="card-btn" value="Edit" />
      <Button className="card-btn" value="Delete" onClick={onClick} />
    </div>
  );
};
export default Card;
