import axios from 'axios';

const instance = axios.create({ baseURL: "https://deploy-ti-backend.onrender.com/"})
instance.defaults.timeout = 50000;

export default instance;