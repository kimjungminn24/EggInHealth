import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

axios.defaults.withCredentials = true; // 쿠키를 포함하도록 설정



export const getDiet = async (uid,year,month,day) => {
  const res = await axios.get(
    `${BASE_URL}/diet/${uid}?year=${year}&month=${month}&day=${day}`
  );
  console.log(res);
  return res.data;
}


export const registerDiet = async (type, date, img) => {
  console.log(type,date,img)
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

export const updateDiet = async (dietId, dietType, dietDate, dietUrl) => {
  const response = await axios.patch(
    `${BASE_URL}/api/diet`,
    {
      DietId: dietId,
      DietType: dietType,
      DietDate: dietDate,
      DietUrl: dietUrl,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const deleteDiet = async (dietId) => {
  const response = await axios.delete(`${BASE_URL}/api/diet/${dietId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
