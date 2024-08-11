import styled from "styled-components";
import { RegisterButtonContainer } from "../StyledComponents"

const DeleteButtonContainer = styled.button`
  background-color: red;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  color: white;
  &:hover {
    background-color: #ff6666;
  }
`;

const DeleteButton = ({onClick}) =>{

    return(
        <DeleteButtonContainer onClick={onClick}>삭제</DeleteButtonContainer>
    
    )
}

export default DeleteButton