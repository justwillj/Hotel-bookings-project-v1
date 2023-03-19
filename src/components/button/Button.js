import React from 'react';
import './Button.css';

function Button({ value, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

export default Button;
