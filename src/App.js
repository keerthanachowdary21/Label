import React, { useState } from 'react';
import './App.css';

const App = () => {
  const label1Options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  const [label2Options, setLabel2Options] = useState(['Multi 1', 'Multi 2', 'Multi 3']);
  const [rows, setRows] = useState([{ label1: '', label2: [] }]);
  const [usedLabel1Options, setUsedLabel1Options] = useState([]);

  const addRow = () => {
    setRows([...rows, { label1: '', label2: [] }]);
  };

  const updateRowLabel1 = (index, value) => {
    const updatedRows = [...rows];
    const prevValue = updatedRows[index].label1;

    updatedRows[index].label1 = value;

    setRows(updatedRows);
    setUsedLabel1Options((prev) => {
      const updatedUsed = [...prev];
      if (prevValue) updatedUsed.splice(updatedUsed.indexOf(prevValue), 1);
      if (value) updatedUsed.push(value);
      return updatedUsed;
    });
  };

  const updateRowLabel2 = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].label2 = value;
    setRows(updatedRows);
  };

  const addLabel2Option = (newOption) => {
    if (newOption && !label2Options.includes(newOption)) {
      setLabel2Options((prev) => [...prev, newOption]);
    }
  };

  return (
    <div className="app">
      <h1>Dynamic Table</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Label 1</th>
              <th>Label 2</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={row.label1}
                    onChange={(e) => updateRowLabel1(index, e.target.value)}
                  >
                    <option value="" disabled>Select an option</option>
                    {label1Options
                      .filter((option) => !usedLabel1Options.includes(option) || option === row.label1)
                      .map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                  </select>
                </td>
                <td>
                  <MultiSelectDropdown
                    options={label2Options}
                    selectedOptions={row.label2}
                    onSelect={(selected) => updateRowLabel2(index, selected)}
                    onAddOption={addLabel2Option}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-row-button" onClick={addRow}>Add New Row</button>
      </div>
    </div>
  );
};

const MultiSelectDropdown = ({ options, selectedOptions, onSelect, onAddOption }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleOption = (option) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    onSelect(updatedSelection);
  };

  const handleAddOption = () => {
    if (inputValue) {
      onAddOption(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="multi-select-dropdown">
      <div
        className="dropdown-header"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select options'}
      </div>
      {isDropdownOpen && (
        <div className="dropdown-body">
          {options.map((option) => (
            <div key={option} className="option">
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                {option}
              </label>
            </div>
          ))}
          <div className="add-option">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add new option"
            />
            <button onClick={handleAddOption}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
