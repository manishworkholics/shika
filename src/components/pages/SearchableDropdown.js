import React, { useState } from 'react';
import Select from 'react-select';

const SearchableDropdown = ({ options,selectedOption,onChange }) => {
  // const [selectedOption, setSelectedOption] = useState(null);

  // const handleChange = selectedOption => {
  //   setSelectedOption(selectedOption);
  //   console.log(`Option selected:`, selectedOption);
  //   // Perform further actions with the selected option
  // };

  return (
    <Select
      value={selectedOption}
      onChange={onChange}
      options={options}
      isSearchable={true}
      placeholder="Search..."
    />
  );
};

export default SearchableDropdown;