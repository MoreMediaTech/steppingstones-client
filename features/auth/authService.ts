import axios from 'axios';
import { CurrentUser } from './authSlice';
import { API_URL } from '@config/index';
import { axiosInstance } from '@lib/axiosDefaultConfig';


// register user
const register = async (data: Partial<CurrentUser>) => {
    const response = await axiosInstance.post(`auth/register`, data);

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
  const response = await axiosInstance.post(`auth/login`, data)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify({ name: response.data.name, email: response.data.email, token: response.data.token }));
  }
  return response.data
}

const logout = async () => {
    const response = await axiosInstance.post(`auth/logout`)
    localStorage.removeItem('user');
    return response.data;
}

const authService = {
    register,
    login,
    logout
}

export default authService;