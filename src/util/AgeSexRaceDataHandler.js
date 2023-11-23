export const ageCategoryMapping = {
  "0 - 4 Years": [0, 4],
  "5 - 9 Years": [5, 9],
  "10 - 14 Years": [10, 14],
  "15 - 19 Years": [15, 19],
  "20 - 24 Years": [20, 24],
  "25 - 29 Years": [25, 29],
  "30 - 34 Years": [30, 34],
  "35 - 39 Years": [35, 39],
  "40 - 44 Years": [40, 44],
  "45 - 49 Years": [45, 49],
  "50 - 54 Years": [50, 54],
  "55 - 59 Years": [55, 59],
  "60 - 64 Years": [60, 64],
  "65 - 69 Years": [65, 69],
  "70 - 74 Years": [70, 74],
  "75 - 79 Years": [75, 79],
  "80 - 84 Years": [80, 84],
  "85 - 89 Years": [85, 89],
  "65 Years & Over": [65, 69],
  "70 Years & Over": [70, 74],
  "75 Years & Over": [75, 79],
  "80 Years & Over": [80, 84],
  "85 Years & Over": [85, 89],
  "90 Years & Over": [90, 120]  
};

export const findAllMatchingAgeCategories = (userAgeRange) => {
  let matchingCategories = [];

  for (const [category, range] of Object.entries(ageCategoryMapping)) {
    if (userAgeRange[1] >= range[0] && userAgeRange[0] <= range[1]) {
      matchingCategories.push(category);
    }
  }

  return matchingCategories;
};