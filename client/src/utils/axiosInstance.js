import axios from 'axios';
axios.defaults.withCredentials = true;

const fitness = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000,
});

export default fitness;
