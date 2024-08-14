// components/user/SelectedDate.js
import React, { useEffect } from 'react';
// import { DateInput } from './StyledComponents';

const SelectedDate = ({ selectedDate, setSelectedDate }) => {
  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <input type="date" onChange={handleChange} value={selectedDate} />
  );
};

export default SelectedDate;
