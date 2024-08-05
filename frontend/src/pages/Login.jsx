import React from 'react';
import eggImg from '../assets/egg.gif';
import logo from '../assets/logo.png';
import styled from 'styled-components';
import naverLogin from '../assets/naverLogin.png';



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

const NaverButton = styled.img`
    cursor: pointer;
`;

function Login() {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const naverClick = () => {
        window.location.href = BASE_URL ; 
    };

    return (
        <Container>
            <Logo>
                <img src={eggImg} alt="egg img" />
            </Logo>
            <Logo> 
                <img src={logo} alt="logo img" /> 
            </Logo>
            <NaverButton src={naverLogin} onClick={naverClick} />
        </Container>
    );
}

export default Login;
