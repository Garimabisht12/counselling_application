import axios from 'axios';

const instance = axios.create({
    baseURL: `https://counselling-application.vercel.app/api/v1/`
});

export default instance;