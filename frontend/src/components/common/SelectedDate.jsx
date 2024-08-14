import React, { useEffect } from 'react';

const SelectedDate = ({ selectedDate, setSelectedDate }) => {
  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <input type="date" onChange={handleChange} value={selectedDate} />
  );
};

export default SelectedDate;
