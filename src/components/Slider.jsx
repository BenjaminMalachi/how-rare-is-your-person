import React from 'react';
import './Slider.css';

export const Slider = ({ label, min, max, value, step, onChange }) => {
  return (
    <div className="slider-container">
      <label className="slider-label">{label}: {value >= max ? `> ${max} cm` : `${value} cm`}</label>
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