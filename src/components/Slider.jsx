import React from 'react';
import './Slider.css';

export const Slider = ({ label, min, max, value, step, onChange, formatLabel }) => {
  // Use formatLabel function if provided, otherwise default to current behavior
  const displayLabel = formatLabel ? formatLabel(value) : `${value} cm`;

  return (
    <div className="slider-container">
      <label className="slider-label">{label}: {displayLabel}</label>
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