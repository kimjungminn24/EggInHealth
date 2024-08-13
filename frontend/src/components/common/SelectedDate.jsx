import React, { useEffect } from 'react';

const SelectedDate = ({ selectedDate, setSelectedDate }) => {
  useEffect(() => {
    const today = new Date();
    today.setHours(today.getHours() + 9); // UTC 시간을 KST로 변환
    const kstDate = today.toISOString().split('T')[0];
    setSelectedDate(kstDate);
  }, [setSelectedDate]);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <input type="date" onChange={handleChange} value={selectedDate} />
  );
};

export default SelectedDate;
