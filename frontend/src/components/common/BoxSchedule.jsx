import React from 'react';
import styled from 'styled-components';

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

`;

const ScheduleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;  
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const TimeText = styled.div`
  font-size: 16px;
  color: #333;
`;

const BoxSchedule = ({ timebox }) => {
  return (
    <ScheduleContainer>
      {timebox.map((schedule, index) => (
        <ScheduleItem key={index}>
          <DateContainer>
            <strong>{schedule.day}</strong> 
          </DateContainer>
          <TimeText>{schedule.time}</TimeText>
        </ScheduleItem>
      ))}
    </ScheduleContainer>
  );
};

export default BoxSchedule;
