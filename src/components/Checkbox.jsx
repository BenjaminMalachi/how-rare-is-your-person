import React from 'react';
import './Checkbox.css';

export const Checkbox = ({ label, name, checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default Checkbox;