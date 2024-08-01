// src/api/index.js
import axios from 'axios';

const BASE_URL = 'https://[경로미정]';

export const fetchUserInfo = async (uid, type, date, token) => {
  const response = await axios.get(`${BASE_URL}/info/${uid}`, {
    params: { type, 일자: date },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const registerDiet = async (dietType, dietDate, dietImgUrl, token) => {
  const response = await axios.post(
    `${BASE_URL}/diet`,
    {
      DietType: dietType,
      DietDate: dietDate,
      DietImgUrl: dietImgUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const registerComment = async (commentBoardId, commentBoardType, dietType) => {
  const response = await axios.post(
    `${BASE_URL}/diet/comment`,
    {
      CommentContent :comment,
      CommentCreatedAt : ,
      CommentBoardId : ,
      CommentBoardType : ,
    }
  )
}