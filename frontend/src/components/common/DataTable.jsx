import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledTh = styled.th`
  padding: 15px;
  /* background-color: #f8f8f8; */
  color: #333;
  font-weight: bold;
  text-align: left;
  /* transition: background-color 0.3s; */
`;

const StyledTheadTh = styled(StyledTh)`
  /* border-bottom: 2px solid #ddd; */
`;

const StyledTd = styled.td`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  /* transition: background-color 0.3s; */
  background-color: white ;
`;

const StyledTr = styled.tr`
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const DisabledRow = styled.tr`
  color: rgb(199, 199, 199);
  &:hover {
    background-color: transparent;
    cursor: default;
  }
`;

export function DataTable({ headers, children }) {
  if (!headers || !headers.length) {
    throw new Error('<DataTable /> headers is required.');
  }

  return (
    <StyledTable>
      <thead>
        <StyledTr>
          {headers.map((header) => (
            <StyledTheadTh key={header.text}> 
              {header.text}
            </StyledTheadTh>
          ))}
        </StyledTr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </StyledTable>
  );
}
