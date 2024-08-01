import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const checkInbodyData = async (id,year,month) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/user/body?uid=${id}&year=${year}&month=${month}`, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};
