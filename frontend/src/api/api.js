import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const addDiet = async (date, mealType, image, comment) => {
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
};

export const addDietComment = async (dietId, comment) => {
  const response = await axios.post(`${API_BASE_URL}/diet/comment`, { dietId, comment });
  return response.data;
};

export const updateDiet = async (dietId, data) => {
  const response = await axios.patch(`${API_BASE_URL}/diet`, { dietId, ...data });
  return response.data;
};

export const deleteDiet = async (dietId) => {
  const response = await axios.delete(`${API_BASE_URL}/diet/${dietId}`);
  return response.data;
};
