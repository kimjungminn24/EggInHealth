import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true; // 쿠키를 포함하도록 설정



export const getDiet = async (uid,year,month,day) => {
  const res = await axios.get(
    `${BASE_URL}/diet/${uid}?year=${year}&month=${month}&day=${day}`
  );
  return res.data;
}


export const registerDiet = async (type, date, img) => {
  const formData = new FormData()
  formData.append('image',img)
  formData.append('date',date);
  formData.append('type',type)
  const res = await axios.post(
    `${BASE_URL}/diet`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
  );
  return res.data;
}

export const registerComment = async (content, createdAt, boardId, boardType) => {
  const response = await axios.post(
    `${BASE_URL}/diet/comment`,
    {
      content,
      createdAt,
      boardId,
      boardType,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const updateDiet = async (type,date,img,id) => {
  const formData = new FormData()
  formData.append('image',img)
  formData.append('date',date);
  formData.append('type',type)
  const response = await axios.patch(
    `${BASE_URL}/diet/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const deleteDiet = async (dietId) => {
  const response = await axios.delete(`${BASE_URL}/diet/${dietId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
