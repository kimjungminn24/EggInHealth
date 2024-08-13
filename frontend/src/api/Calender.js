import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const CheckFood = async (id, year, month, day) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/diet/${id}?year=${year}&month=${month}&day=${day}`, 
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

  export const CheckExer = async (id, year, month, day) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/exercise/${id}?year=${year}&month=${month}&day=${day}`, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
        console.log(
            `${BASE_URL}/exercise/${id}?year=${year}&month=${month}&day=${day}`
        );
        
      throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
    }
  };

  export const GetExerDate = async (id, year, month) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/pt/plan/${id}?year=${year}&month=${month}`, 
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

export const GetMembers = async (year, month) => {

  try {
    const response = await axios.get(
      `${BASE_URL}/pt/plan?year=${year}&month=${month}`, 
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
