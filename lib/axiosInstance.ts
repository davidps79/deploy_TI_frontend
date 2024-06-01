import axios from 'axios';

const instance = axios.create({ baseURL: "http://localhost:8000/"})
instance.defaults.timeout = 50000;

export default instance;