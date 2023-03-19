import React from 'react';
import './Button.css';

function Button({ value, onClick, className }) {
  return (
    <button className={className} onClick={onClick} type="submit">
      {value}
    </button>
  );
}

export default Button;
