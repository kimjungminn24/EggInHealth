import styled from 'styled-components';

const StyledTable = styled.table`
display: grid;

`;

const StyledTh = styled.th`
width: 320px;
  padding: 15px;
  color: #333;
  font-weight: bold;
  text-align: center;
  background-color: transparent; 
`;


export function DataTable({ headers, children }) {
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header) => (
            <StyledTh key={header.value}>{header.text}</StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </StyledTable>
  );
}
