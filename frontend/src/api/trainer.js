import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;


export const checkCode = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/code`, {
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