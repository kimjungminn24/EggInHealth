import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const checkInbodyData = async (id, year, month) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/body?uid=${id}&year=${year}&month=${month}`, 
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
    console.log(data);
    
    
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
    const response = await axios.get(`${BASE_URL}/body?uid=${uid}&year=${year}&month=${month}`, {
      withCredentials: true, 
    });
    
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};

const OCR_URL = import.meta.env.OCR_URL
const secret_key = import.meta.env.SECRET_KEY

export const uploadOCR = async (imageFile) => {
  const formData = new FormData();

  const message = {
    version: 'V1',
    requestId: 'string', 
    timestamp: new Date().getTime(),
    lang: 'ko',  
    images: [
      {
        format: 'png',
        name: 'medium',
        templateIds: []  
      }
    ]
  };

  formData.append('message', JSON.stringify(message));
  formData.append('file', imageFile);

  try {
    const response = await axios.post(OCR_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-OCR-SECRET': secret_key
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};