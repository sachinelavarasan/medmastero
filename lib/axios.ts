import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.API_ENDPOINT, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
