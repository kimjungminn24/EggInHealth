import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  border: 1px solid #ddd;
  border-spacing: 0;
  border-radius: 5px;
`;

const StyledTh = styled.th`
  padding: 10px;
`;

const StyledTheadTh = styled(StyledTh)`
  border-bottom: 1px solid #ddd;
`;

const StyledTd = styled.td`
  min-width: 100px;
  padding: 10px;
  margin: 0;
`;

const StyledFirstTd = styled(StyledTd)`
  min-width: auto;
`;

const StyledTr = styled.tr`
  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;

const SelectRow = styled.tr`
  background-color: rgb(240, 240, 240);
`;

const DisabledRow = styled.tr`
  color: rgb(199, 199, 199);
  &:hover {
    background-color: transparent;
    cursor: default;
  }
`;

export function DataTable({ headers, children }) {
  // headers가 있는지 체크하고, 없다면 에러를 던짐
  if (!headers || !headers.length) {
    throw new Error('<DataTable /> headers is required.')
  }
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header) => (
            <StyledTheadTh key={header.text}>
              {header.text} {/* 컬럼명 바인딩 */}
            </StyledTheadTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </StyledTable>
  );
}
