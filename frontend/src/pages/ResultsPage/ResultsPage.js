import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultsPage.css'

const Results = () => {
  const location = useLocation();
  const caseId = location.pathname.split('/').pop(); // extract case_id from URL

  const [results, setResults] = useState(null);

  const handleResults = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/results/?case_id=${caseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setResults(data);
      } else {
        alert('Error retrieving results');
      }
    } catch (error) {
      console.log(error);
      alert('Error retrieving results');
    }
  };

  useEffect(() => {
    handleResults();
  }, []);

  return (
    <div className='results-container'>
      <h1>Findings Summary</h1>
        <table className='results-table'>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Checked Items</th>
              <th>Flagged Items</th>
              <th>Risk Level</th>
              <th>Resources Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(results.data.last_run.summary).map((serviceName) => (
              <tr key={serviceName}>
                <td style={{fontWeight: 'bold', fontFamily: 'Arial', color: 'black'}}>{serviceName}</td>
                <td>{results.data.last_run.summary[serviceName].checked_items}</td>
                <td>{results.data.last_run.summary[serviceName].flagged_items}</td>
                <td>{results.data.last_run.summary[serviceName].max_level}</td>
                <td>{results.data.last_run.summary[serviceName].resources_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default Results;
