import axios from 'axios';

const API_URL = 'http://localhost:8080/';

export const login = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

export const role = async (data) => {
  try {
    const response = await axios.patch(`${API_URL}/user/role`, data);
    return response.data;
  } catch (error) {
    throw new Error('role failed: ' + error.message);
  }
};

export const user = async (data) => {
  try {
    const response = await axios.patch(`${API_URL}/user`, data);
    return response.data;
  } catch (error) {
    throw new Error('role failed: ' + error.message);
  }
};
