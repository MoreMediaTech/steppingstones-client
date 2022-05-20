import Cookies from 'js-cookie'
import { axiosInstance } from '@lib/axiosDefaultConfig'
import { CurrentUser } from '@lib/types'

// register user
const register = async (data: Partial<CurrentUser>) => {
  const response = await axiosInstance.post(`auth/register`, data)

  return response.data.message
}
// login user
const login = async (data: Partial<CurrentUser>) => {
  const response = await axiosInstance.post(`auth/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('ss_access_token', response.data.token)
    Cookies.set('ss_access_token', response.data.token)
    // Cookies.set('ss_refresh_token', response.data.refreshToken)
  }
  return { currentUser: response.data.user, token: response.data.token }
}

const getUser = async () => {
  const response = await axiosInstance.get(`auth/me`, {
    withCredentials: true,
  })
  return response.data
}

const logout = async () => {
  const response = await axiosInstance.post(`auth/logout`)
  localStorage.removeItem('user')
  localStorage.removeItem('ss_access_token')
  Cookies.remove('ss_access_token')
  return response.data
}

const authService = {
  register,
  login,
  getUser,
  logout,
}

export default authService
