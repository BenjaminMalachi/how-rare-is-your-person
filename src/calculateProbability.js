export function calculateProbability(relevantData, totalPopulation) {
  let probabilitySum = relevantData.reduce((sum, dataPoint) => sum + parseInt(dataPoint.value, 10), 0);
  
  // Assuming you want to calculate the probability as a percentage
  let probabilityPercentage = (probabilitySum / totalPopulation) * 100;

  return probabilityPercentage.toFixed(2); // Returns a string with 2 decimal places
}