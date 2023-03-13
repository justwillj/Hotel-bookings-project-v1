import React from "react";
import "../button/Button.css";

const Button = ({ type, value, onClick, className }) => (
  <button className={className} type={type} onClick={onClick}>
    {value}
  </button>
);

export default Button;
