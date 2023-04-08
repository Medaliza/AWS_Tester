import React, {useContext, useEffect, useState} from 'react'
import "./ScanPage.css"
import { useHistory } from 'react-router-dom'

const ScanPage = () => {
    const [result, setResult] = useState(null); // create a state variable to store the result
    const history = useHistory();
  
    let ScanUser = async (e) => {
      e.preventDefault();
      let response = await fetch('http://127.0.0.1:8000/api/scan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key_id: e.target.access_key_id.value,
          secret_access_key: e.target.secret_access_key.value,
        }),
      });
      let data = await response.json();
  
      if (response.status === 200) {
        setResult(data); // set the state variable to the result
      } else {
        alert('Please Provide valid access and secret keys!');
      }
    };
  
    const outputDiv = document.getElementById('output');
  
    if (result) {
      const prossdata = JSON.parse(result);
      for (const key in prossdata) {
        const value = prossdata[key];
        const div = document.createElement('div');
        div.textContent = `${key}: ${value}`;
        outputDiv.appendChild(div);
      }
    }
  
    return (
        <div>
      <div className='scan-container' id='container'>
        <form onSubmit={ScanUser}>
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
              name='profile'
              placeholder='Enter Profile Name'
              required='True'
            />
          </div>
          <button type='submit'>Scan </button>
        </form>
      </div>
      <div className='scan-container' id='output'></div>
      </div>
    );
  };
  
  export default ScanPage;
