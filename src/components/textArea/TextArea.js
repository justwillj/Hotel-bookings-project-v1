import React from 'react';

function TextArea({
  label, type, value, onChange, error, errorMsg
}) {
  return (
    <div className="input">
      <label htmlFor={label}>{label}</label>
      <textarea
        type={type}
        id={label}
        name={label}
        value={value}
        onChange={onChange}
      />
      <div className="error-message">
        {error && errorMsg}
  &nbsp;
      </div>
    </div>
  );
}
export default TextArea;
