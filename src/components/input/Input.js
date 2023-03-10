import React from "react";
import "./Input.css";

/**input component containing label, input, and error message div */
const Input = ({ label, type, value, onChange, error, errorMsg }) => (
  <div className="input">
    <label htmlFor={label}>{label}</label>
    <input
      type={type}
      id={label}
      name={label}
      value={value}
      onChange={onChange}
    />
    <div className="error-message">{error && errorMsg}&nbsp;</div>
  </div>
);

export default Input;
