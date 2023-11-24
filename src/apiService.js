import axios from 'axios';

const fetchAgeGroupData = async () => {
  try {
    const response = await axios.get('https://tablebuilder.singstat.gov.sg/table/TS/M810011');
    return response.data;
  } catch (error) {
    console.error('Error fetching age group data:', error);
  }
};