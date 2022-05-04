import axios from 'axios';
import { CurrentUser } from './authSlice';
import { API_URL } from '@config/index';


// register user
const register = async (data: Partial<CurrentUser>) => {
    const response = await axios.post(`${API_URL}auth/register`, data);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}
// login user
const login = async (data: Partial<CurrentUser>) => {
  const response = await axios.post(`${API_URL}auth/login`, data)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
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