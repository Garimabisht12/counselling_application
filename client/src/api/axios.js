import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL ;
const instance = axios.create({
    baseURL: `${base_url}/api/v1/`
});

export default instance;