import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const checkGoal = async (uid) => {
    try {
      const response = await axios.get(`${BASE_URL}/goal/${uid}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      });
      
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
    }
  }

  export const checkPtLog = async (uid) => {
    try {
      const response = await axios.get(`${BASE_URL}/pt/log/${uid}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      });
      
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
    }
  }

  export const receiveToken = async (deviceToken) => {
    try{
      const response = await axios.post(
        `${BASE_URL}/device/token`,
        {
          token: deviceToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
      return response.data;
    } catch(error) {
      console.log("token 전송 실패");
    }
  };


  export const disconnectUser = async (uid) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/code/${uid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('연결끊기완료');
      
      return response.data;
    } catch (error) {
      console.log("연결끊기실패");
      console.error(error);
    }
  };