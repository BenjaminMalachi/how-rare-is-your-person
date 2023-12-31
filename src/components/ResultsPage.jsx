import React, { useEffect, useState } from "react";
import Airtable from 'airtable';
import { airtableConfig } from '../util/airtable.config';

const ResultsPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const base = new Airtable({apiKey: airtableConfig.apiKey}).base(airtableConfig.baseId);
    base('Delululator').select({
      // Specify the fields and filters you need
    }).eachPage((records, fetchNextPage) => {
      setRecords(records);
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });
  }, []);

  return (
    <div>
      {records.map((record, index) => (
        <div key={index}>
            <p>Prefered Sex: {record.fields['Sex']}</p>
            <p>Min Height: {record.fields['Height']} cm</p>
            <p>Race: {Array.isArray(record.fields['Race']) ? record.fields['Race'].join(', ') : 'N/A'}</p>
            <p>Min Yearly Income: ${record.fields['Income']}</p>
            <p>Probability Chance: {record.fields['Probability Chance']*100}%</p>
            <p>Estimated Individuals: {record.fields['Estimated Individuals']}</p>
        </div>
      ))}
    </div>
  );

};

export default ResultsPage;