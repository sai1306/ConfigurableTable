import React, { useState } from 'react';
import TableHeader from './TableHeader';

const Table = ({ data, config, setData, onRearrangeColumns }) => {
  const [editingCell, setEditingCell] = useState({ rowIndex: null, colKey: null });
  const [editValue, setEditValue] = useState('');

  const handleCellClick = (rowIndex, colKey, value) => {
    // Prevent toggling edit mode when clicking on a checkbox
    if (config.find(col => col.key === colKey).type === 'checkbox') return;
    
    setEditingCell({ rowIndex, colKey });
    setEditValue(value);
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (editingCell.rowIndex !== null && editingCell.colKey !== null) {
      const updatedData = [...data];
      updatedData[editingCell.rowIndex][editingCell.colKey] = editValue;
      setData(updatedData);
    }
    setEditingCell({ rowIndex: null, colKey: null });
  };

  const handleCheckboxChange = (rowIndex, colKey) => {
    const updatedData = [...data];
    updatedData[rowIndex][colKey] = !updatedData[rowIndex][colKey]; // Toggle checkbox state
    setData(updatedData);
  };

  const handleDropdownChange = (rowIndex, colKey, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][colKey] = value;
    setData(updatedData);
  };

  return (
    <table>
      <TableHeader config={config} onRearrangeColumns={onRearrangeColumns} />
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {config.map(col => (
              <td
                key={col.key}
                onClick={() => handleCellClick(rowIndex, col.key, row[col.key])}
                style={{ height: '50px' }}
              >
                {editingCell.rowIndex === rowIndex && editingCell.colKey === col.key ? (
                  col.type === 'dropdown' ? (
                    <select
                      value={editValue}
                      onChange={(e) => handleDropdownChange(rowIndex, col.key, e.target.value)}
                      onBlur={handleInputBlur}
                      style={{
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                      }}
                    >
                      {col.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={col.type === 'checkbox' ? 'checkbox' : 'text'}
                      value={col.type === 'checkbox' ? row[col.key] : editValue}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleInputBlur(); // Save on Enter
                        }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                      }}
                    />
                  )
                ) : col.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={row[col.key]} // Reflects the current state
                    onChange={() => handleCheckboxChange(rowIndex, col.key)} // Pass row index and key
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      verticalAlign: 'middle',
                    }}
                  />
                ) : col.type === 'link' ? (
                  <a href={row[col.key]} target="_blank" rel="noopener noreferrer">
                    {row[col.key]}
                  </a>
                ) : (
                  row[col.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
