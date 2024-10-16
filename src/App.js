import React, { useState, useEffect } from 'react';
import Table from './Components/Table';
import ConfigPanel from './Components/ConfigPanel';
import { initialConfig, initialData } from './Components/TableConfig';
import './App.css';
const App = () => {
  // State management for table configuration and data
  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem('tableData');
    return storedData ? JSON.parse(storedData) : initialData;
  });
  const [tableConfig, setTableConfig] = useState(() => {
    const storedConfig = localStorage.getItem('tableConfig');
    return storedConfig ? JSON.parse(storedConfig) : initialConfig;
  });

  // Persist table state in localStorage
  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
    localStorage.setItem('tableConfig', JSON.stringify(tableConfig));
  }, [tableData, tableConfig]);

  // Function to add a new row to the table
  const addNewRow = () => {
    const newRow = tableConfig.reduce((acc, col) => ({ ...acc, [col.key]: col.type === 'checkbox' ? false : '' }), {});
    setTableData([...tableData, newRow]);
  };

  // Function to add a new column to the table
  const addNewColumn = (label, type, options = []) => {
    const newKey = `col_${Date.now()}`;
    const newColumn = { key: newKey, label, type, options };
    setTableConfig([...tableConfig, newColumn]);

    // Update existing rows to include the new column
    setTableData(tableData.map(row => ({ ...row, [newKey]: type === 'checkbox' ? false : '' })));
  };

  // Rearranging columns by updating the config
  const handleRearrangeColumns = (newConfig) => {
    setTableConfig(newConfig);
  };

  // Download table config and data as a JSON object
  const downloadTableConfig = () => {
    const tableContent = {
      config: tableConfig,
      data: tableData
    };

    const jsonContent = JSON.stringify(tableContent, null, 2); // Pretty print JSON

    // Create a Blob from the JSON string
    const blob = new Blob([jsonContent], { type: 'application/json' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'table_data.json'; // File name for download

    // Programmatically click the link to trigger the download
    link.click();
  };

  return (
    <div>
      <h1>Configurable Table</h1>
      <br></br>
      <ConfigPanel addNewColumn={addNewColumn} />
      <Table 
        data={tableData} 
        config={tableConfig} 
        setData={setTableData} 
        onRearrangeColumns={handleRearrangeColumns} 
      />
      <br></br>
      <div className='action-buttons'></div>
      <button onClick={addNewRow}>Add Row</button>
      <button onClick={downloadTableConfig}>Download Table Data</button>
    </div>
  );
};

export default App;
