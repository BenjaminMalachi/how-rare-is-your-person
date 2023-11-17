import React from 'react';

export const RadioGroup = ({ label, options, name, selectedValue, onChange }) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
};

export default RadioGroup;