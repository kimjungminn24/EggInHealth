import React from 'react';
import { useNavigate } from 'react-router-dom';
import EditBtn from '../../../assets/editbutton.png';
import { styled } from 'styled-components';

const ImageButton = styled.img`
  cursor: pointer;
  width: 50px; 
  height: 50px; 
`;

const ButtonProfileEdit = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/select'); 
  };

  return <ImageButton src={EditBtn} alt="EditBtn" onClick={handleClick} />;
};

export default ButtonProfileEdit;
