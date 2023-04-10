import React, { useContext, useEffect, useState } from 'react';
import './ScanPage.css';
import { useHistory } from 'react-router-dom';
import Loader from './Loader';

const ScanPage = () => {
  const [result, setResult] = useState(null); // create a state variable to store the result
  const [loading, setLoading] = useState(false); // create a state variable to track loading state
  const [scanClicked, setScanClicked] = useState(false); // create a state variable to track whether scan button is clicked
  const history = useHistory();

  const handleScanUser = async (e) => {
    e.preventDefault();
    setLoading(true); // set loading to true when the scan button is clicked
    setScanClicked(true); // set scanClicked to true when the scan button is clicked
    let response = await fetch('http://127.0.0.1:8000/api/scan/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key_id: e.target.access_key_id.value,
        secret_access_key: e.target.secret_access_key.value,
        profile_name: e.target.profile_name.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setResult(data); // set the state variable to the result
    } else {
      alert('Please Provide valid access and secret keys!');
    }
    setLoading(false); // set loading back to false after getting the result
  };

  const handleShowResults = () => {
    // navigate to the results page
    history.push('/results', { result });
  };

  return (
    <div className='scan-container' id='container'>
      <form onSubmit={handleScanUser}>
        <h1>Scan</h1>
        <p>
          In order to scan IAM user you need to provide both Access and Secret
          Keys
        </p>
        <div>
          <input
            type='text'
            name='access_key_id'
            placeholder='Enter Access Key'
            required='True'
          />
          <input
            type='text'
            name='secret_access_key'
            placeholder='Enter Secret Key'
            required='True'
          />
          <input
            type='text'
            name='profile_name'
            placeholder='Enter Profile Name'
            required='True'
          />
        </div>
        {!scanClicked ? (
          <button type='submit'>Scan </button>
        ) : (
            <Loader result={result}/>
        )}
      </form>

      {/* conditional rendering based on the state variables */}
      {result && (
        <div className='result-container'>
          <button onClick={handleShowResults}>Show Results</button>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
