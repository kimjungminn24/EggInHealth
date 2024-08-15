import React, { useEffect } from 'react';
import styled from 'styled-components';

const Date = styled.input`
  background-color: transparent;
  cursor:pointer;
  font-size:18px;
`

const SelectedDate = ({ selectedDate, setSelectedDate }) => {
  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <Date type="date" onChange={handleChange} value={selectedDate} />
  );
};

export default SelectedDate;
