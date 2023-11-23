import React from 'react';
import './RadioGroup.css'; // Import the CSS file here

export const RadioGroup = ({ label, options, name, selectedValue, onChange }) => {
  return (
    <div className="radio-group-container">
      <legend className="radio-group-legend">{label}</legend>
      {options.map((option) => (
        <label key={option.value} className="radio-label">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            className="radio-input"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;