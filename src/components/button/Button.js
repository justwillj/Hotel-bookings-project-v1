import React from 'react';
import './Button.css';

function Button({ value, onClick, className }) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {value}
    </button>
  );
}

export default Button;
