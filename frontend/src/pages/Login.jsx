import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import eggImg from '../assets/egg.gif';
import logo from '../assets/logo.png';
import styled from 'styled-components';
import naverLogin from '../assets/naverLogin.png';

import { useStore } from '../store/login'; 

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
    const setToken = useStore((state) => state.setToken);
    const [cookies, setCookie] = useCookies(['Authorization']); 

    const naverClick = () => {
        window.location.href = 'http://localhost:8080'; 
    };

    useEffect(() => {
        const authToken = cookies.Authorization;

        if (authToken) {
            console.log('Authorization Token:', authToken);
            setToken(authToken); 
        } else {
            console.log('Authorization Token이 존재하지 않습니다.');
        }
    }, [cookies, setToken]);

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
