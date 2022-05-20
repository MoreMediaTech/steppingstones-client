import { API_URL } from './../config/index'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import * as cookie from 'cookie'
import Cookies from 'js-cookie'
import * as setCookie from 'set-cookie-parser'
import jwt_decode from 'jwt-decode'
import { RootState } from 'app/store'

export const axiosInstance = axios.create({
  baseURL: API_URL,
})

const axiosPrivateInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

let store: RootState

export const injectStore = (_store: RootState) => {
  store = _store
}

const onRequest = async (
  req: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
 const token =  ''
  console.log(token)
  // const decoded = jwt_decode(token)
  // console.log('decoded', decoded)
  if (!req?.headers?.authorization) {
    req.headers!.authorization = `Bearer ${token}`
  }
  const { data } = await axiosInstance.get(`/refresh/`, {
    withCredentials: true,
  })
  console.log('data', data)
  Cookies.set('ss_access_token', data.accessToken)
  req.headers!.authorization = `Bearer ${data.accessToken}`
  return req
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response && axios.isAxiosError(error)) {
    const prevRequest = error?.config
    // console.log('interceptors.response.use', error)
    if (
      error?.response?.status === 401 &&
      error?.response?.data === 'Invalid token. token expired'
    ) {
      try {
        const { data } = await axiosInstance.get(`/refresh`, {
          withCredentials: true,
        })
        console.log(data)
        // Cookies.set('ss_access_token', data.accessToken, { expires: 1 });
        if (data) {
          prevRequest.headers!.authorization = `Bearer ${data.accessToken}`
        } else {

          window.location.href = '/auth/login';
        }
      } catch (_error) {
        Promise.reject(_error)
      }
    }
  }
  return Promise.reject(error)
}

// axiosPrivateInstance.interceptors.request.use(onRequest, onRequestError)

// axiosPrivateInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosPrivateInstance
