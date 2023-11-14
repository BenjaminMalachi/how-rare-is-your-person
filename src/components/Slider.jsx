import React from 'react';

export const Slider = ({ label, min, max, value, step, onChange }) => {
  return (
    <div>
      <label>{label}: {value >= max ? `> ${max}` : value}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
    </div>
  );
};

export default Slider;