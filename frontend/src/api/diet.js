import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

axios.defaults.withCredentials = true; // 쿠키를 포함하도록 설정

export const addDiet = async (type, date, imgUrl) => {
  const response = await axios.post(
    `${BASE_URL}/diet`,
    {
      type,
      date,
      imgUrl,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const addComment = async (content, createdAt, boardId, boardType) => {
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
