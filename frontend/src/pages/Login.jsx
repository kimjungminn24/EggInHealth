import React from 'react';
import eggImg from '../assets/egg.gif';
import logo from '../assets/logo.png';
import styled from 'styled-components';
import naverLogin from '../assets/naverLogin.png';
import { login } from '../api/login';
import {useStore} from '../store/login'; 

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFE791;
    width: 360px;
    height: 800px;
`;

const Logo = styled.div`
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;
`;

const NaverButton = styled.div`
    width: 200px;
    height: 100px; 
    text-align: center;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; 
`;

function Login() {
  const setToken = useStore((state) => state.setToken); 

  const naverClick = async () => {
    try {
      const responseData = await login();
      console.log(responseData)
      console.log(1)
      const token = responseData.token; 
   
      
      setToken(token);
      localStorage.setItem('token', token); 
      console.log('Received token:', token);
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <Container>
      <Logo>
        <img src={eggImg} alt="egg img" />
      </Logo>
      <Logo > 
        <img src={logo} alt="logo img" />
      </Logo>
      <NaverButton src={naverLogin} onClick={naverClick} />
    </Container>
  );
}

export default Login;
