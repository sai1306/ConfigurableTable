import React from 'react';
import EditableCell from './EditableCell';
import './../App.css';
const TableRow = ({ row, config, rowIndex, handleCellChange }) => {
  return (
    <tr>
      {config.map(col => (
        <EditableCell
          key={col.key}
          value={row[col.key]}
          col={col}
          rowIndex={rowIndex}
          handleCellChange={handleCellChange}
        />
      ))}
    </tr>
  );
};

export default TableRow;
