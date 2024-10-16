import React, { useState } from 'react';
import './../App.css';

const ConfigPanel = ({ addNewColumn }) => {
  const [label, setLabel] = useState('');
  const [type, setType] = useState('text');
  const [options, setOptions] = useState('');

  const handleAddColumn = () => {
    const optionArray = options.split(',').map(opt => opt.trim());
    addNewColumn(label, type, optionArray);
    setLabel('');
    setOptions('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Column Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="link">Link</option>
        <option value="checkbox">Checkbox</option>
        <option value="dropdown">Dropdown</option>
      </select>
      {type === 'dropdown' && (
        <input
          type="text"
          placeholder="Comma separated options"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
        />
      )}
      <div style={{padding:"10px"}}>
      <button onClick={handleAddColumn}>Add Column</button>
      </div>
    </div>
  );
};

export default ConfigPanel;
