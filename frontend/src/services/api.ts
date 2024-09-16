import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const registerUser = (data: any) => api.post('/register', data);
export const getUser = () => api.get('/user');
export const logout = () => api.post('/logout');
