import axios from 'axios';

const API_URL = 'https://sandra-portfolio.onrender.com/';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
