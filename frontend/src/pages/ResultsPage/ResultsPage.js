import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './ResultsPage.css'
import { Collapse } from 'react-bootstrap';

const Results = () => {
  const location = useLocation();
  const caseId = location.pathname.split('/').pop(); // extract case_id from URL

  const [results, setResults] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const detailsContainerRef = useRef(null); // create reference to details container
  const [collapseState, setCollapseState] = useState({});

  const toggleCollapse = (key) => {
    setCollapseState({
      ...collapseState,
      [key]: !collapseState[key],
    });
  };

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
        const sortedData = Object.keys(data.data.last_run.summary).sort((a, b) => {
          return data.data.last_run.summary[b].flagged_items - data.data.last_run.summary[a].flagged_items;
        }).reduce((obj, key) => {
          obj[key] = data.data.last_run.summary[key];
          return obj;
        }, {});
        setResults({ ...data, data: { ...data.data, last_run: { ...data.data.last_run, summary: sortedData } } });
      } else {
        alert('Error retrieving results');
      }
    } catch (error) {
      console.log(error);
      alert('Error retrieving results');
    }
  };

  const history = useHistory();
  const handleRowClick = (serviceName) => {
    setSelectedService(serviceName);
    setSelectedKey(null);
  };

  const handleKeyClick = (key) => {
    setSelectedKey(key);
  };

  useEffect(() => {
    handleResults();
  }, [caseId]);

  useEffect(() => {
    if (selectedService && detailsContainerRef.current) {
      detailsContainerRef.current.scrollIntoView({ behavior: 'smooth' }); // trigger scroll event to details container
    }
  }, [selectedService]);

  return (
    <div>
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
    {results &&
      Object.keys(results.data.last_run.summary).map((serviceName) => {
        const flaggedItems = results.data.last_run.summary[serviceName].flagged_items;
        
        // Add a condition to filter rows with flagged items > 0
        if (flaggedItems > 0) {
          return (
            <tr onClick={() => handleRowClick(serviceName)} key={serviceName}>
              <td style={{fontWeight: 'bold', fontFamily: 'Arial', color: 'black'}}>{serviceName}</td>
              <td>{results.data.last_run.summary[serviceName].checked_items}</td>
              <td>{flaggedItems}</td>
              <td style={{ color: results.data.last_run.summary[serviceName].max_level === 'danger' ? 'red' : results.data.last_run.summary[serviceName].max_level === 'warning' ? 'orange' : 'black'}}>
                {results.data.last_run.summary[serviceName].max_level}
              </td>
              <td>{results.data.last_run.summary[serviceName].resources_count}</td>
            </tr>
          );
        }
        
        return null; // Skip rows that don't meet the condition
      })}
  </tbody>
</table>

    </div>
    {selectedService && (
  <div ref={detailsContainerRef} className='details-container'>
    <h2>{selectedService} Details</h2>
    <ul>
      {Object.keys(results.data.services[selectedService]).map((key) => (
        <li key={key}>
          <button onClick={() => toggleCollapse(key)}>{key}</button>
          <Collapse in={collapseState[key]}>
            <div>
              {Object.keys(results.data.services[selectedService][key]).map((subKey) => { 
                const sub = results.data.services[selectedService][key][subKey];
                if (key === 'users') {
                  console.log('///////', results.data.services[selectedService][key]);
                  return Object.keys(results.data.services[selectedService][key]).map((key2) => {
                    const user = results.data.services[selectedService][key][key2];
                    return (
                      <div key={key2}>
                        <h2><strong>{key2}</strong></h2>
                        <p>ARN: {user.arn}</p>
                        <p>Create Date: {user.create_date}</p>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Path:  {user.path}</p>
                        <p>Is Excluded:  {user.is_excluded ? 'true': 'false'}</p>
                        {/* Render other key-value pairs */}
                        {(user.inline_policies !== {} ||user.inline_policies !== undefined ) && (
                          <div><h3>Inline Policies</h3>
                          {Object.keys(user.inline_policies).map((groupKey) => (<p>{groupKey} : <br/> {user.inline_policies[groupKey]}</p>))}
                          </div>)}
                        {user.groups !== {} && Object.keys(user.groups).map((groupKey) => (<p>{groupKey} : {user.groups[groupKey]}</p>))}
                      </div>
                    //   "inline_policies": {
                    //     "41d7bcd9ad9057ed09528d58605da7d9400fe00ef55e4b64e5b89ca8218b31e3": "cg-bilbo-vulnerable_lambda_cgidn9shu2g3id-standard-user-assumer"
                    // },
                    // "groups": {},
                    // "customer_managed_policies": {},
                    // "aws_managed_policies": {},
                    );
                  })
                }
                return (
                <div key={subKey}>
                  <p>{subKey}</p>
                  <pre>{JSON.stringify(sub, null, 2)}</pre>
                </div>
              );})}
            </div>
          </Collapse>
        </li>
      ))}
    </ul>
  </div>
)}
    </div>
  );
};

export default Results;
