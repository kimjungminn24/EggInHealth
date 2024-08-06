import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true; // 쿠키를 포함하도록 설정

export const getExercise = async (uid, year, month, day) => {
  console.log(uid, year, month, day);
  const res = await axios.get(
    `${BASE_URL}/exercise/${uid}?year=${year}&month=${month}&day=${day}`
  );
  return res.data;
};

export const registerExh = async (set, weight,ref, name, time, date) => {
  const response = axios.post(
    `${BASE_URL}/exercise`,
    {
      set,
      weight,
      ref,
      name,
      time,
      date,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const registerExComment = async (content, boardId, boardType) => {
  const response = await axios.post(
    `${BASE_URL}/exercise/comment`,
    {
      content,
      boardId,
      boardType,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const registerEximg = async (date, img) => {
  const formData = new FormData();
  formData.append("image", img);
  formData.append("date", date);
  const res = await axios.post(`${BASE_URL}/exercise/report`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return res.data;
};

export const updateEx = async (setId, set, weight, name, time, date) => {
  const res = await axios.patch(`${BASE_URL}/exercise`, {
    setId,
    set,
    weight,
    name,
    time,
    date,
  });
  return res.data;
};
export const deleteEx = async (setId) => {
  const res = await axios.delete(`${BASE_URL}/exercise${setId}`);
  return res.data;
};

export const registerFeedback = async (
  motionSimilarity,
  memo,
  exerciseId,
  record,
  createdAt
) => {
  const formData = new FormData();
  formData.append(`motionSimiliarity`, motionSimilarity);
  formData.append(`memo`, memo);
  formData.append(`exerciseId`, exerciseId);
  formData.append(`record`, record);
  formData.append(`createdAt`, createdAt);
  const res = await axios.post(`${BASE_URL}/feedback`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const fetchFeedback = async (uid) => {
  const res = await axios.get(
    `${BASE_URL}/feedback/${uid}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
