const incomeBrackets = {
    '2.1': { min: 0, max: 20000 },
    '2.2': { min: 20001, max: 25000 },
    '2.3': { min: 25001, max: 30000 },
    '2.4': { min: 30001, max: 40000 },
    '2.5': { min: 40001, max: 50000 },
    '2.6': { min: 50001, max: 60000 },
    '2.7': { min: 60001, max: 70000 },
    '2.8': { min: 70001, max: 80000 },
    '2.9': { min: 80001, max: 100000 },
    '2.12': { min: 100001, max: 150000 },
    '2.13': { min: 150001, max: 200000 },
    '2.14': { min: 200001, max: 300000 },
    '2.15': { min: 300001, max: 400000 },
    '2.16': { min: 400001, max: 500000 },
    '2.17': { min: 500001, max: 1000000 },
    '2.18': { min: 1000001, max: Infinity },
  };
  
  export const findIncomeCategory = (income) => {
    for (const [key, range] of Object.entries(incomeBrackets)) {
      if (income >= range.min && income <= range.max) {
        return key;
      }
    }
    // Handle the case where income does not fit into any category
    return null;
  };