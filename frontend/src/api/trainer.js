import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;


export const checkCode = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/code`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });
      
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
    }
  }

  export const checkMemberList = async () => {
    try {
      const formatMonth = new Date().getMonth() + 1; 
      const formatYear = new Date().getFullYear().padStart(2, '0');
      const formatday = new Date().getDate().padStart(2, '0');
      const response = await axios.get(`${BASE_URL}/status/trainer/member?year=${formatYear}&month=${formatMonth}&day=${formatday}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });
      
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
    }
  }
