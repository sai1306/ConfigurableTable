import React from 'react';

const TableHeader = ({ config, onRearrangeColumns }) => {
  const handleMoveLeft = (index) => {
    if (index > 0) {
      const newConfig = [...config];
      const [movedColumn] = newConfig.splice(index, 1);
      newConfig.splice(index - 1, 0, movedColumn); // Move column to the left
      onRearrangeColumns(newConfig); // Update the parent component with new configuration
    }
  };

  const handleMoveRight = (index) => {
    if (index < config.length - 1) {
      const newConfig = [...config];
      const [movedColumn] = newConfig.splice(index, 1);
      newConfig.splice(index + 1, 0, movedColumn); // Move column to the right
      onRearrangeColumns(newConfig); // Update the parent component with new configuration
    }
  };

  return (
    <thead>
      <tr>
        {config.map((col, index) => (
          <th key={col.key}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {col.label}
              <button onClick={() => handleMoveLeft(index)} disabled={index === 0} style={{ marginLeft: '8px' }}>
              <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button onClick={() => handleMoveRight(index)} disabled={index === config.length - 1} style={{ marginLeft: '4px' }}>
              <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
