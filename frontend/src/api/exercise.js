import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

axios.defaults.withCredentials = true; // 쿠키를 포함하도록 설정

export const registerExh = async (set, weight, name, time, date) =>{
   const response = axios.post(
    `${BASE_URL}/exercise`,
    {
        set,
        weight,
        name,
        time,
        date
    },
    {
        headers:{
            'Content-Type':'aplication/json'
        },
    }
   ) 
   return response.data
}