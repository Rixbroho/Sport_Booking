import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const signupUser = (userData) =>
  API.post('/user/user', {
    username: userData.fullName,
    email: userData.email,
    password: userData.password,
    phoneNumber: userData.phone,
  });

export const loginUser = (credentials) =>
  API.post('/user/loginuser', {
    email: credentials.email,
    password: credentials.password,
  });

export const forgotPassword = (email) =>
  API.post('/user/forgotpassword', {
    email,
  });

export const resetPassword = (email, newPassword, resetToken) =>
  API.post('/user/resetpassword', {
    email,
    newPassword,
    resetToken,
  });

export const getMe = () => API.get('/user/me');

export default API;
