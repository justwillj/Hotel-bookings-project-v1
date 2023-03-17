import React from 'react';
import './Input.css';

/** input component containing label, input, and error message div */
function Input({
  label, type, value, onChange, error, errorMsg, checked
}) {
  return (
    <div className="input">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <div className="error-message">
        {error && errorMsg}
&nbsp;
      </div>
    </div>
  );
}

export default Input;
