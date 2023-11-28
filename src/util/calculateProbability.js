export const calculateCombinedProbability = (demographicProbability, incomeProbability, heightProbability) => {
  const combined = demographicProbability * incomeProbability * heightProbability;
  return combined;
};

export function calculateDemographicProbability(relevantData, totalPopulationValue) {
  const demographicProbabilitySum = relevantData.reduce((sum, dataPoint) => sum + parseInt(dataPoint.value, 10), 0);
  console.log('relevantData', relevantData);
  console.log('demographicProbabilitySum', demographicProbabilitySum);
  console.log('totalPopulationValue', totalPopulationValue);
  return (demographicProbabilitySum / totalPopulationValue);
};

export function calculateIncomeProbability(incomeCategories, incomeData) {
  let sumOfValues = 0;
  let totalIncomePopulation = parseInt(incomeData.total, 10);

  // Add values from the matching category and all categories with higher income
  for (const category of incomeCategories) {
    sumOfValues += parseInt(incomeData.brackets[category]?.value, 10);
  }

  // Calculate the probability as the sum of the values divided by the total population
  let probability = sumOfValues / totalIncomePopulation;
  return probability;
}