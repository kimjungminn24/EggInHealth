import naverLogin from '../../assets/naverLogin.png'
import styled from 'styled-components';

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

const Naver = () =>{
    const NAVER_CLIENT_ID = "ihUg2hIJDk8Spcib_fWr";
    const REDIRECT_URI = "http://localhost:5173/redirect"; 
    const STATE = "flase";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  
    const loginHandler = () => {
      window.location.href = NAVER_AUTH_URL;
    };

    return(
        <NaverButton onClick={loginHandler}><img src={naverLogin} alt="naverButton img" /></NaverButton>
    )
}


export default Naver