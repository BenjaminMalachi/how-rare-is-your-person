import React, { useState } from 'react';
import DoubleRangeSlider from './components/DoubleRangeSlider';
import './components/DoubleRangeSlider.css';
import Checkbox from './components/Checkbox';
import RadioGroup from './components/RadioGroup';
import Slider from './components/Slider';

function App() {
  const [ageRange, setAgeRange] = useState([0, 90]); // Default age range
  const [sex, setSex] = useState({ male: false, female: false });
  const [race, setRace] = useState({
    malays: false,
    chinese: false,
    indians: false,
    other: false,
    doesNotMatter: true, // Default to does not matter
  });
  const [height, setHeight] = useState(150); // Default minimum height
  const [income, setIncome] = useState(20000); // Default minimum income
  const [maritalStatus, setMaritalStatus] = useState('doesNotMatter'); // Default marital status
  const [householdType, setHouseholdType] = useState({
    hdb: false,
    condo: false,
    landed: false,
    doesNotMatter: true, // Default to does not matter
  });
  const [location, setLocation] = useState({
    north: false,
    south: false,
    east: false,
    west: false,
    central: false,
    doesNotMatter: true, // Default to does not matter
  });
  const [qualification, setQualification] = useState('doesNotMatter'); // Default qualification
  const [physicallyActive, setPhysicallyActive] = useState('doesNotMatter'); // Default physical activity
  const [religion, setReligion] = useState({
    noReligion: false,
    buddhism: false,
    taoism: false,
    islam: false,
    hinduism: false,
    sikhism: false,
    catholic: false,
    christian: false,
    doesNotMatter: true, // Default to does not matter
  });
  const [size, setSize] = useState(2); // Default size, visible only if male is selected

  // ... Rest of the component with functions to handle changes, submit, etc.

  return (
    <div className="App">
      <DoubleRangeSlider
      min={0}
      max={90}
      onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
    />
      {/* Repeat for other inputs, making sure to pass the right props */}
      {/* ... */}
    </div>
  );
}

export default App;