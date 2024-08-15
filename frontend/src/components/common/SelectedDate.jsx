import React, { useEffect } from 'react';
import styled from 'styled-components';

const Date = styled.input`
  background-color: #F8F7F4;
  cursor:pointer;
  font-size:24px;
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
