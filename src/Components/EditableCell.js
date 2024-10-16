import React from 'react';
import './../App.css';
const EditableCell = ({ value, col, rowIndex, handleCellChange }) => {
  const handleChange = (e) => {
    const newValue = col.type === 'checkbox' ? e.target.checked : e.target.value;
    handleCellChange(rowIndex, col.key, newValue);
  };

  switch (col.type) {
    case 'text':
      return <td><input type="text" value={value} onChange={handleChange} /></td>;
    case 'link':
      return (
        <td>
          <input type="url" value={value} onChange={handleChange} />
          {value && <a href={value} target="_blank" rel="noopener noreferrer">Visit</a>}
        </td>
      );
    case 'checkbox':
      return <td><input type="checkbox" checked={value} onChange={handleChange} /></td>;
    case 'dropdown':
      return (
        <td>
          <select value={value} onChange={handleChange}>
            {col.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </td>
      );
    default:
      return <td>{value}</td>;
  }
};

export default EditableCell;
