// src/api/taskManagerApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8282/api';

const taskManagerApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default taskManagerApi;