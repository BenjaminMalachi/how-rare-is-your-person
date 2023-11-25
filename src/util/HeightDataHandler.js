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
  if (sex.toLowerCase() === 'doesnotmatter') {
    // Calculate for both male and female, then take the average
    const maleProbability = calculateProbabilityForSex(height, 'male');
    const femaleProbability = calculateProbabilityForSex(height, 'female');
    return (maleProbability + femaleProbability) / 2;
  } else {
    // Calculate normally for a specific sex
    return calculateProbabilityForSex(height, sex);
  }
};

const calculateProbabilityForSex = (height, sex) => {
  const brackets = heightDistribution[sex];
  let cumulativeProbability = 0;

  // Convert each range into a minimum and maximum number, then compare
  for (const range in brackets) {
    const probability = brackets[range];
    let min, max;
    if (range.startsWith('<')) {
      min = Number.NEGATIVE_INFINITY;
      max = parseFloat(range.slice(1));
    } else if (range.startsWith('>')) {
      min = parseFloat(range.slice(1));
      max = Number.POSITIVE_INFINITY;
    } else {
      [min, max] = range.split('-').map(parseFloat);
    }
    // If height is within the range, add the probability
    if (height > min && height <= max) {
      cumulativeProbability += probability;
      break; // Stop the loop if the height falls within a range
    }
  }

  return cumulativeProbability;
};