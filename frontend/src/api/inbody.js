import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;


export const checkInbodyData = async (id, year, month) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/user/body?uid=${id}&year=${year}&month=${month}`, 
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


export const uploadInbodyData = async (data) => {
  try {
    const formData = new FormData();
    formData.append('height', data.height);
    formData.append('weight', data.weight);
    formData.append('muscle', data.muscle);
    formData.append('fat', data.fat);
    formData.append('bmi', data.bmi);
    formData.append('compositionScore', data.compositionScore);
    formData.append('memberId', data.memberId);
    formData.append('image', data.imageFile);
    console.log('image', data.imageFile);
    
    const response = await axios.post(`${BASE_URL}/body`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, 
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};


export const fetchBodyData = async (uid, year, month) => {
  try {
    const response = await axios.get(`${BASE_URL}/body`, {
      params: {
        uid,
        year,
        month
      },
      withCredentials: true, 
    });
    console.log(response.data);
    
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
}

