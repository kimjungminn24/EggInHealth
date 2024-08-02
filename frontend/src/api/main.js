import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const userInfo = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/${id}`, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
    }
  };