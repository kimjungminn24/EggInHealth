import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const registerDiet = async (date, mealType, image, comment) => {
  try {
    const formData = new FormData();
    formData.append('date', date);
    formData.append('mealType', mealType);
    formData.append('image', image);
    formData.append('comment', comment);

    const response = await axios.post(`${API_BASE_URL}/diet`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};

export const registerDietComment = async (dietId, comment) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diet/comment`, { dietId, comment });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};

export const updateDiet = async (dietId, data) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/diet`, { dietId, ...data });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};

export const deleteDiet = async (dietId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/diet/${dietId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};

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
