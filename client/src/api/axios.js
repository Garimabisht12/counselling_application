import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL ;
const instance = axios.create({
    baseURL: `https://counselling-application-git-main-garimabisht12s-projects.vercel.app/api/v1/`
});

export default instance;