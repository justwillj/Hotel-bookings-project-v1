import { Link } from 'react-router-dom';
import React from 'react';
import Button from '../button/Button';
import './Card.css';

function Card({
  InputOne,
  InputTwo,
  InputThree,
  InputFour,
  InputFive,
  onClick,
  endpoint,
  needDelete
}) {
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
      {needDelete ? (
        <Button className="card-btn" value="Delete" onClick={onClick} />
      ) : null}
    </div>
  );
}
export default Card;
