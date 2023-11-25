import React, { useCallback, useEffect, useState } from "react";
import DoubleRangeSlider from './components/DoubleRangeSlider';
import './components/DoubleRangeSlider.css';
import Checkbox from './components/Checkbox';
import RadioGroup from './components/RadioGroup';
import Slider from './components/Slider';
import axios from 'axios';
import { calculateDemographicProbability, calculateIncomeProbability, calculateCombinedProbability } from './util/calculateProbability';
import { findAllMatchingAgeCategories, ageCategoryMapping } from './util/AgeSexRaceDataHandler';
import { findIncomeCategory } from './util/IncomeDataHandler';
import { calculateHeightProbability } from './util/HeightDataHandler';
import './App.css';

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
  const [incomeData, setIncomeData] = useState(null);
  const [income, setIncome] = useState(20000);
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
  const [actualFigure, setActualFigure] = useState(0);

  // ... Rest of the component with functions to handle changes, submit, etc.

  const handleAgeRangeChange = useCallback((newMin, newMax) => {
    if (ageRange[0] !== newMin || ageRange[1] !== newMax) {
      setAgeRange([newMin, newMax]);
    }
  }, [ageRange]);

  const handleRaceChange = (event) => {
    const { name, checked } = event.target;
    // If "Does Not Matter" is checked, uncheck all others. If another box is checked, uncheck "Does Not Matter".
    const resetState = name === 'doesNotMatter'
      ? {
          malays: false,
          chinese: false,
          indians: false,
          other: false,
          doesNotMatter: checked,
        }
      : {
          ...race,
          [name]: checked,
          doesNotMatter: false,
        };
  
    setRace(resetState);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value); // Update the sex state to the value of the selected radio button
  };

  const handleCalculateProbability = () => {
    const selectedRaces = Object.keys(race).filter(key => race[key] && key !== 'doesNotMatter');
    let raceKeys = [];
    let demographicProbability = 0;
    let incomeProbability = 1; // Default to 1 in case there's no income data
    let heightProbability = 1; // Default to 1 in case there's no height data
    let relevantData = [];
    let totalPopulationValue = 0;
    let totalProbability = 0;

    console.log('sex:', sex);

    if (race.doesNotMatter && sex === "doesNotMatter") {
      raceKeys = ["Total Residents"];
    } else if (race.doesNotMatter) {
      // If the sex is not 'doesNotMatter', add the specific sex total key with "Residents"
      raceKeys = [`Total ${sex.charAt(0).toUpperCase() + sex.slice(1)} Residents`];
    } else {
      // Here you handle the case where specific races are selected
      selectedRaces.forEach(raceName => {
        if (sex !== "doesNotMatter") {
          if (raceName === 'other') {
            raceKeys.push(`Other Ethnic Groups (${sex.charAt(0).toUpperCase() + sex.slice(1)})`);
          } else {
            raceKeys.push(`Total ${sex.charAt(0).toUpperCase() + sex.slice(1)} ${raceName.charAt(0).toUpperCase() + raceName.slice(1)}`);
          }
        } else {
          // If the sex is 'doesNotMatter', you add the total key for each race
          if (raceName === 'other') {
            raceKeys.push("Other Ethnic Groups (Total)");
          } else {
            raceKeys.push(`Total ${raceName.charAt(0).toUpperCase() + raceName.slice(1)}`);
          }
        }
      });
    }

    console.log('raceKeys:', raceKeys);
    console.log('data: ', data);

    Object.values(data).forEach(segment => {
      if (segment.rows && Array.isArray(segment.rows)) {
        segment.rows.forEach(row => {
          if (row.value) {
            totalPopulationValue += parseInt(row.value, 10);
          }
        });
      }
    });
    
    
    raceKeys.forEach(raceKey => {
      const matchingCategories = findAllMatchingAgeCategories(ageRange, ageCategoryMapping);
      const seriesNumber = Object.keys(data).find(key => data[key].labelSexRace.includes(raceKey));
      
      if (seriesNumber) {
        relevantData = matchingCategories.flatMap(category => {
          return data[seriesNumber]?.rows.filter(row => row.label === category);
        });
      
        demographicProbability += calculateDemographicProbability(relevantData, totalPopulationValue);
        totalProbability += parseFloat(demographicProbability); // Sum the probabilities
      } else {
        console.error("Series number for the selected categories could not be determined.");
      }
    
      console.log('Total Probability:', totalProbability);
      console.log('relevantData:', relevantData);
      console.log('Total Population Value:', totalPopulationValue);
      console.log('Demographic Probability:', demographicProbability);
    });

    // Calculate income probability if income data is available
    if (incomeData) {
      const incomeCategories = findIncomeCategory(income, incomeData.brackets);
      console.log('Income Categories:', incomeCategories);
      if (incomeCategories) {
        // Instead of calculating here, we'll call the utility function
        incomeProbability = calculateIncomeProbability(incomeCategories, incomeData);
        console.log('Income Probability:', incomeProbability);
      } else {
        console.error("Income category not found");
      }
    } else {
      console.error("Income data is not available");
    }


    // Calculate height probability
    heightProbability = calculateHeightProbability(height, sex);
    console.log('Height Probability:', heightProbability);

    // Combine the probabilities using the calculateCombinedProbability function
    const combinedProbability = calculateCombinedProbability(demographicProbability, incomeProbability, heightProbability);

    console.log('Combined Probability:', combinedProbability);

    const calculatedActualFigure = combinedProbability * totalPopulationValue;
    console.log('Calculated Actual Figure:', calculatedActualFigure); 
    setActualFigure(calculatedActualFigure.toFixed(0)); // Store the actual figure

    // Set the combined probability
    setProbabilityResult((combinedProbability * 100).toFixed(4));
    console.log('Actual Figure State:', actualFigure);
    console.log('Probability Result State:', probabilityResult);
  };

  // Age Sex Race Parse Data
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

  //Income Parse Data
  function parseIncomeData(rows) {
    let parsedData = { brackets: {} };
    rows.forEach(row => {
      if (row.seriesNo === "2") {
        parsedData["total"] = row.columns[0].value; // Capture the total population
      } else if (row.seriesNo.startsWith("2.")) { // Check if the seriesNo indicates an income bracket
        const bracketKey = row.seriesNo;
        const value = row.columns[0].value;
        parsedData.brackets[bracketKey] = {
          range: row.rowText,
          value: value,
        };
      }
    });
    return parsedData;
  }

  // Axios

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Fetch Age Sex Race
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

      // Fetch Income
      axios.get('https://tablebuilder.singstat.gov.sg/api/table/tabledata/M130221', {
        params: {
          timeFilter: 2021
        }
      })
      .then(response => {
        // Process and save the income data similarly to how you're handling the other data
        const incomeData = parseIncomeData(response.data.Data.row);
        // Save the parsed data to state
        setIncomeData(incomeData);
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error fetching income data:', error);
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
      <div className="App">
        <Slider
          label="Select Yearly Income"
          min={20000}
          max={1000000}
          step={10000}
          value={income}
          onChange={(newValue) => setIncome(newValue)}
          formatLabel={(value) => `$${value.toLocaleString()}`}
        />
      </div>
      <button onClick={handleCalculateProbability}>Calculate Probability</button>
      <div className="probability-result">
        {probabilityResult && (
          <p>
            You have a {probabilityResult}% chance of finding someone like that in Singapore<br />
            Or roughly about: {actualFigure.toLocaleString()} individuals
          </p>
        )}
      </div>
    </main>
  );
}

export default App;