import React from 'react';
import './Loader.css';
import {BsCheckCircleFill} from "react-icons/bs";

const Loader = ({ result }) => {
  return (
    <div className="loader-container">
      {result ? (
        <BsCheckCircleFill className="green-check-icon"/>
      ) : (
        <div className="loader"></div>
      )}
      <div className="loader-text">{result ? 'Scan completed successfully!' : 'Scan scripts are running...'}</div>
    </div>
  );
};

export default Loader;
