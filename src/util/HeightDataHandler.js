  const heightDistribution = {
    male: [
      { max: 152.88, probability: 0.0013 },
      { max: 159.12, probability: 0.0214 },
      { max: 165.38, probability: 0.1359 },
      { max: 177.88, probability: 0.6827 },
      { max: 184.12, probability: 0.1359 },
      { max: 190.38, probability: 0.0214 },
      { max: Infinity, probability: 0.0013 }
    ],
    female: [
      { max: 145.00, probability: 0.0013 },
      { max: 150.00, probability: 0.0214 },
      { max: 155.00, probability: 0.1359 },
      { max: 160.00, probability: 0.6827 },
      { max: 170.00, probability: 0.1359 },
      { max: 175.00, probability: 0.0214 },
      { max: Infinity, probability: 0.0013 }
    ]
  };
    
  export const calculateHeightProbability = (height, sex) => {
    // Find the cumulative probability for a given sex
    const calculateForSex = (sexHeightDistribution) => {
      return sexHeightDistribution.reduce((cumulativeProb, { max, probability }) => {
        return height <= max ? cumulativeProb + probability : cumulativeProb;
      }, 0);
    };
  
    // Handle "does not matter" case by averaging male and female probabilities
    if (sex.toLowerCase() === 'doesnotmatter') {
      const maleProb = calculateForSex(heightDistribution.male);
      const femaleProb = calculateForSex(heightDistribution.female);
      return (maleProb + femaleProb) / 2;
    }
  
    // Calculate normally for a specific sex
    return calculateForSex(heightDistribution[sex]);
  };