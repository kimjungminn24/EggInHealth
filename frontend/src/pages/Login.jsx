import eggImg from '../assets/egg.gif';
import logo from '../assets/logo.png';
import styled from 'styled-components';
import Naver from '../components/common/ButtonNaverLogin';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color : #FFE791;
    width: 360px;
    height: 800px;
`;

const Logo = styled.div`
    text-align: center;
    margin-bottom: 20px;
   
`;


function Login() {

  return (
    <Container>
      <Logo><img src={eggImg} alt="egg img" /></Logo>
      <Logo><img src={logo} alt="logo img" /></Logo>
      <Naver/>
    </Container>
  );
}

export default Login;
