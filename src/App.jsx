import React, { useCallback, useEffect, useState } from "react";
import DoubleRangeSlider from './components/DoubleRangeSlider';
import './components/DoubleRangeSlider.css';
import Checkbox from './components/Checkbox';
import RadioGroup from './components/RadioGroup';
import Slider from './components/Slider';
import axios from 'axios';
import { calculateProbability } from './calculateProbability';
import { findAllMatchingAgeCategories, ageCategoryMapping } from './util/AgeSexRaceDataHandler';

function App() {
  const [ageRange, setAgeRange] = useState([0, 90]); // Default age range
  const [sex, setSex] = useState("");
  const [race, setRace] = useState({
    malays: false,
    chinese: false,
    indians: false,
    other: false,
    doesNotMatter: true, // Default to does not matter
  });
  const [height, setHeight] = useState(150); // Default minimum height
  const [income, setIncome] = useState(20000); // Default minimum income
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
  const [probabilityResult, setProbabilityResult] = useState("");

  // ... Rest of the component with functions to handle changes, submit, etc.

  const handleAgeRangeChange = useCallback((newMin, newMax) => {
    if (ageRange[0] !== newMin || ageRange[1] !== newMax) {
      setAgeRange([newMin, newMax]);
    }
  }, [ageRange]);

  const handleRaceChange = (event) => {
    const { name, checked } = event.target;
    setRace((prevRace) => ({
      ...prevRace,
      [name]: checked,
      doesNotMatter: false, // Reset 'does not matter' if other options are selected
    }));
  };

  const handleSexChange = (event) => {
    setSex(event.target.value); // Update the sex state to the value of the selected radio button
  };

  const handleCalculateProbability = () => {
    const selectedRaces = Object.keys(race).filter(key => race[key] && key !== 'doesNotMatter');
    let raceKeys = [];
  
    if (race.doesNotMatter && sex === "doesNotMatter") {
      raceKeys = ["Total Residents"];
    } else {
      if (sex !== "doesNotMatter") {
        selectedRaces.forEach(raceName => {
          if (raceName === 'other') {
            raceKeys.push(`Other Ethnic Groups (${sex.charAt(0).toUpperCase() + sex.slice(1)})`);
          } else {
            raceKeys.push(`Total ${sex.charAt(0).toUpperCase() + sex.slice(1)} ${raceName.charAt(0).toUpperCase() + raceName.slice(1)}`);
          }
        });
      } else {
        selectedRaces.forEach(raceName => {
          if (raceName === 'other') {
            raceKeys.push("Other Ethnic Groups (Total)");
          } else {
            raceKeys.push(`Total ${raceName.charAt(0).toUpperCase() + raceName.slice(1)}`);
          }
        });
      }
    }
  
    let totalProbability = 0; // Initialize a variable to hold the sum of probabilities
  
  raceKeys.forEach(raceKey => {
    const matchingCategories = findAllMatchingAgeCategories(ageRange, ageCategoryMapping);
    const seriesNumber = Object.keys(data).find(key => data[key].labelSexRace.includes(raceKey));
    const totalPopulationSeriesNumber = Object.keys(data).find(key => data[key].labelSexRace === "Total Residents");
    
    if (seriesNumber && totalPopulationSeriesNumber) {
      const relevantData = matchingCategories.flatMap(category => {
        return data[seriesNumber]?.rows.filter(row => row.label === category);
      });
      const totalPopulationValue = data[totalPopulationSeriesNumber]?.value;
      
      if (totalPopulationValue) {
        const probability = calculateProbability(relevantData, totalPopulationValue);
        totalProbability += parseFloat(probability); // Sum the probabilities
      } else {
        console.error("Total population data is missing or invalid.");
      }
    } else {
      console.error("Series number for the selected categories could not be determined.");
    }
  });

  setProbabilityResult(totalProbability.toFixed(2)); // Set the summed probability
};

  const parseData = (rows) => {
    let parsedData = {};
    rows.forEach(row => {
      if (Number.isInteger(Number(row.seriesNo))) {
        parsedData[Number(row.seriesNo)] = {rows: [], value: row.columns[0].value, labelSexRace: row.rowText};
      } else {
        const currentSeriesNo = parseInt(row.seriesNo); // "1.1" -> 1
        
        // row.rowText -> 0 - 4 years, 75 years and over etc.
        parsedData[currentSeriesNo].rows.push({
          label: row.rowText,
          value: row.columns[0].value,
        });

      }
    });
    return parsedData;
  };

  // Axios

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://tablebuilder.singstat.gov.sg/api/table/tabledata/M810011',{params: {
      timeFilter: 2023
    },})
      .then(response => {
        if (response.data && response.data.Data && Array.isArray(response.data.Data.row)) {
          setData(parseData(response.data.Data.row));
        } else {
          throw new Error('Unexpected data structure received');
        }
      })
      .catch(error => {
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Empty array ensures this runs once on mount only
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <RadioGroup
        label="Which Sex are you interested in?"
        name="sex"
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Does Not Matter', value: 'doesNotMatter' }
        ]}
        selectedValue={sex} // Pass the current sex state
        onChange={handleSexChange} // Pass the handler function
      />
      <div className="App">
      <DoubleRangeSlider
        label="Age Range"
        min={0}
        max={90}
        onChange={handleAgeRangeChange}
      />
      </div>
      <div className="App">
      <Slider
        label="Min Height"
        min={100}
        max={200}
        value={height}
        step={1}
        onChange={setHeight}
      />
    </div>
    <div className="checkbox-container">
        <h2>Race ?</h2>
        <Checkbox
          label="Malays"
          name="malays"
          checked={race.malays}
          onChange={handleRaceChange}
        />
        <Checkbox
          label="Chinese"
          name="chinese"
          checked={race.chinese}
          onChange={handleRaceChange}
        />
        <Checkbox
          label="Indians"
          name="indians"
          checked={race.indians}
          onChange={handleRaceChange}
        />
        <Checkbox
          label="Other"
          name="other"
          checked={race.other}
          onChange={handleRaceChange}
        />
        <Checkbox
          label="Does Not Matter"
          name="doesNotMatter"
          checked={race.doesNotMatter}
          onChange={handleRaceChange}
        />
      </div>
      <button onClick={handleCalculateProbability}>Calculate Probability</button>
      <div className="probability-result">
      {probabilityResult && <p>Probability: {probabilityResult}%</p>} {/* Updated to display a single value */}
    </div>
    </main>
  );
}

export default App;