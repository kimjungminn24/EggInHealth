import React, { useEffect } from 'react';
import eggImg from '../assets/egg.gif';
import logo from '../assets/logo.png';
import styled from 'styled-components';
import naverLogin from '../assets/naverLogin.png';
import { useStore, useUserInfoStore } from '../store/store';

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFE791;
    width: 360px;
    height: 800px;
    top: 0;
`;

const Logo = styled.div`
    text-align: center;
    margin-left: 25px;
    margin-top: 50px;
    margin-bottom: 50px;
    width: 70%;
`;
const Title = styled.div`
    text-align: center;
    margin-bottom: 50px;
`
const NaverButton = styled.img`
    width: 250px;
    cursor: pointer;
`;
const LogoImg = styled.img`
width: 300px;
`

function Login() {
    const { setUserType } = useStore(); 
    const { setUserType: setUserInfoType } = useUserInfoStore();

    const BASE_URL = import.meta.env.VITE_NAVER_URL;
    
    useEffect(() => {
        setUserType(null); 
        setUserInfoType(null); 
    }, [setUserType, setUserInfoType]); 

    const naverClick = () => {
        window.location.href = BASE_URL; 
    }; 

    return (
        <Container>
            <Logo>
                <img src={eggImg} alt="egg img" />
            </Logo>
            <Title> 
                <LogoImg src={logo} alt="logo img" /> 
            </Title>
            <NaverButton src={naverLogin} onClick={naverClick} />
        </Container>
    );
}

export default Login;
