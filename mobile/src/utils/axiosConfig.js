import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  transformRequest: [function (data, headers) {
    // Transformation des données
    return JSON.stringify(data);
  }],
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  }
});

// Intercepteur pour les requêtes
instance.interceptors.request.use(
  config => {
    console.log('Request sent:', config.url, config.data);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
instance.interceptors.response.use(
  response => {
    console.log('Response received:', response.data);
    return response;
  },
  error => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;