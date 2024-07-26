import axios from 'axios';

const fetchDietData = async (uid, type, date, token) => {
  try {
    const response = await axios.get(`https://[경로미정]/info/${uid}?type=${type}&일자=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      useStore.getState().setDietData(response.data);
    }
  } catch (error) {
    console.error('Error fetching diet data:', error);
  }
};

export default fetchDietData;