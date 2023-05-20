import React, { useState, useEffect } from 'react';
import './HistoryPage.css';
import { useHistory} from "react-router-dom";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/history/', {
        method: 'GET',
      });
      const data = await response.json();

      if (response.status === 200) {
        setHistoryData(data.results);
      }
    };
    fetchHistoryData();
  }, []);

  const history = useHistory();
  const handleRowClick = (Case_ID) => {
    history.push(`/results/${Case_ID}`);
  }  
  const renderTableData = () => {
    if (historyData) {
      return historyData.map((historyItem, index) => {
        const { Access_Key_ID, Profile_Name, Scan_Date, Case_ID } = historyItem;
        const formattedDate = new Date(Scan_Date).toLocaleString();
        return (
          <tr onClick={()=> handleRowClick(Case_ID)} key={index}>
            <td>{Case_ID}</td>
            <td>{Access_Key_ID}</td>
            <td>{Profile_Name}</td>
            <td>{formattedDate}</td>

          </tr>
        );
      });
    }
  };

  return (
    <div className='history-container'>
      <h1>Scan History</h1>
      <table className='history-table'>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Access Key ID</th>
            <th>Profile Name</th>
            <th>Scan Date</th>
          </tr>
        </thead>
        <tbody className='history-list'>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
