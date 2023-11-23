export function calculateDemographicProbability(relevantData, totalPopulation) {
  const demographicProbabilitySum = relevantData.reduce((sum, dataPoint) => sum + parseInt(dataPoint.value, 10), 0);
  return (demographicProbabilitySum / totalPopulation);
}

export function calculateIncomeProbability(incomeValue, totalIncomePopulation) {
  return incomeValue / totalIncomePopulation;
}