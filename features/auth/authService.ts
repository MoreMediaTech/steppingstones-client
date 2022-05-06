import axios from 'axios';
import { CurrentUser } from './authSlice';
import { API_URL } from '@config/index';
import { axiosInstance } from '@lib/axiosDefaultConfig';


// register user
const register = async (data: Partial<CurrentUser>) => {
    const response = await axios.post(`${API_URL}auth/register`, data , { headers: { 'Content-Type': 'application/json' } });

    if (response.data) {
         localStorage.setItem(
           'user',
           JSON.stringify({
             name: response.data.name,
             email: response.data.email,
             token: response.data.token,
           })
         )
    }
    return response.data;
}
// login user
const login = async (data: Partial<CurrentUser>) => {
  const response = await axios.post(`${API_URL}auth/login`, data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
  })

  if (response.data) {
    localStorage.setItem('user', JSON.stringify({ name: response.data.name, email: response.data.email, token: response.data.token }));
  }
  return response.data
}

const logout = async () => {
    const response = await axios.post(`${API_URL}auth/logout`)
    localStorage.removeItem('user');
    return response.data;
}

const authService = {
    register,
    login,
    logout
}

export default authService;