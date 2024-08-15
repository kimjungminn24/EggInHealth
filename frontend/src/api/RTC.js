import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const Alert = async (senderId, receiverId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/device/open`,
        {senderId, receiverId},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("API request failed:", error.response ? error.response.data : error.message);
   throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
    }
  };