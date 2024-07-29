import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const RedirectURI = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/select')
    // const fetchAccessToken = async (code) => {
    //   try {
    //     const response = await fetch(`http://localhost:8080/api/auth/login?code=${code}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });

    //     // 응답이 성공적일 경우 처리
    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log('Access token received:', data);

    //       // 로그인 성공 후 Select 페이지로 리디렉션
    //       navigate('/select');
    //     } else {
    //       console.error('Failed to fetch access token:', response.statusText);
    //       // 오류 처리 (예: 사용자에게 오류 메시지 표시)
    //     }
    //   } catch (error) {
    //     console.error('Error occurred while fetching access token:', error);
    //     // 오류 처리 (예: 사용자에게 오류 메시지 표시)
    //   }
    // };

    // // URL에서 인증 코드 추출
    // const code = new URL(window.location.href).searchParams.get('code');
    // if (code) {
    //   fetchAccessToken(code);
    // } else {
    //   console.error('Authorization code not found');
    //   // 인증 코드가 없으면 오류 페이지로 리디렉션하거나 오류 처리
    // }
  }, [navigate]);

  return (
    <Wrap>
     
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default RedirectURI;
