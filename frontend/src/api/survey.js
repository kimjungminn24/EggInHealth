import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const updateUserRole = async (role) => {
  try {
   
    
    const response = await axios.patch(
      `${BASE_URL}/user/role`, 
      { role }, 
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

export const updateUserGole = async (exerciseCommonId,dietCommonId,goalCommonId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/goal`, 
      {exerciseCommonId,dietCommonId,goalCommonId}, 
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

export const updateUserInfo = async (height,age,gender) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/user`, 
      { height ,age,gender}, 
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