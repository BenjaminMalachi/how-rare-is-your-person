# Delulu Calculator
his React application provides users with the ability to calculate demographic probabilities based on various criteria such as age, sex, race, income, and height. It leverages data from APIs to compute the likelihood of a demographic segment within a population.

## Features
- Age Range Selection: Users can select a range of ages for demographic analysis.
- Sex and Race Filters: Includes options for filtering by sex and race, including a 'Does Not Matter' option for broader results.
- Height Filter: Allows users to input a minimum height for the demographic calculation.
- Income Slider: Users can choose an income bracket to refine their demographic search.
- Probability Calculation: The app computes and displays the probability and estimated number of individuals matching the selected criteria.

# Trello Board
https://trello.com/b/NUojDTIh/delulu-solulu

## Data Sources
This application uses data from the following API endpoints:
- Age, Sex, and Race Data: `https://tablebuilder.singstat.gov.sg/api/table/tabledata/M810011`
- Income Data: `https://tablebuilder.singstat.gov.sg/api/table/tabledata/M130221`

## Technologies Used
- React.js
- Axios for API requests
- CSS for styling

# Takeaways
- Learnt how to handle and parse data from table pulled from API

# Challenges
- Handling the table data that was fetched from the API

# Next Steps
- 
- Save feature
- Add in more parameters to filter by
    - Household type
    - Area of residence
    - 🍆size
    - Highest Qualification
    - Physically active
    - Religion
