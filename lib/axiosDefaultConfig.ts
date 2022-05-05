import { API_URL } from './../config/index'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})
