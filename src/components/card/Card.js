import Button from "../button/Button";
import { Link } from "react-router-dom";
import "./Card.css";
const Card = ({
  InputOne,
  InputTwo,
  InputThree,
  InputFour,
  InputFive,
  onClick,
  endpoint,
}) => {
  return (
    <div className="card">
      <h1>{InputOne}</h1>
      <h1>{InputTwo}</h1>
      <h1>{InputThree}</h1>
      <h1>{InputFour}</h1>
      <h1>{InputFive}</h1>
      <Link to={endpoint}>
        <Button className="card-btn" value="Edit" />
      </Link>
      <Button className="card-btn" value="Delete" onClick={onClick} />
    </div>
  );
};
export default Card;
