const heightDistribution = {
    male: {
      '<152.88': 0.0013,
      '152.88-159.12': 0.0214,
      '159.12-165.38': 0.1359,
      '165.38-177.88': 0.6827, // within 1 SD from the mean
      '177.88-184.12': 0.1359,
      '184.12-190.38': 0.0214,
      '>190.38': 0.0013
    },
    female: {
      '<145.00': 0.0013,
      '145.00-150.00': 0.0214,
      '150.00-155.00': 0.1359,
      '155.00-165.00': 0.6827, // within 1 SD from the mean
      '165.00-170.00': 0.1359,
      '170.00-175.00': 0.0214,
      '>175.00': 0.0013
    }
};
    
export const calculateHeightProbability = (height, sex) => {
  // Check if "Does Not Matter" is selected for sex
  if (sex === 'doesNotMatter') {
    const maleProbability = calculateProbabilityForSex(height, 'male');
    const femaleProbability = calculateProbabilityForSex(height, 'female');
    // Return the average probability of both sexes
    return (maleProbability + femaleProbability) / 2;
  } else {
    // Calculate normally for a specific sex
    return calculateProbabilityForSex(height, sex);
  }
};
    
const calculateProbabilityForSex = (height, sex) => {
  const brackets = heightDistribution[sex];
  let cumulativeProbability = 0;
  let heightReached = false;

  Object.entries(brackets).forEach(([range, probability]) => {
    const [minStr, maxStr] = range.split('-');
    const min = minStr === '<' ? Number.NEGATIVE_INFINITY : parseFloat(minStr);
    const max = maxStr === '>' ? Number.POSITIVE_INFINITY : parseFloat(maxStr);
    
    if (height > min && height <= max) {
      heightReached = true;
    }
    if (heightReached) {
      cumulativeProbability += probability;
    }
  });

  return cumulativeProbability;
};