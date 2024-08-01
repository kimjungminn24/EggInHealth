import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const updateUserRole = async (role) => {
  console.log(role);
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/user/role`, 
      { role }, 
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
