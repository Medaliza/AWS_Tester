import React from 'react';
import { useLocation } from 'react-router-dom';
import './ResultsPage.css'

const ResultsPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const prossdata = JSON.parse(searchParams.get('result'));
    const outputDiv = document.getElementById('output');
    for (const key in prossdata) {
        const value = prossdata[key];
        const div = document.createElement('div');
        div.textContent = `${key}: ${value}`;
        outputDiv.appendChild(div);
      }
  
    return (
      <div className='results-container'>
        <div id='output'></div>
      </div>
    );
  };
  
  export default ResultsPage;