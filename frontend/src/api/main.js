import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const userInfo = async (Id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/${Id}`, 
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

  export const userEgg = async (Id,Month,Year) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/total?uid=${Id}&year=${Year}&month=${Month}`, 
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

  export const userSchedule = async (Id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/pt/plan/top?id${Id}=&cnt=3`, 
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

  