import { useEffect } from 'react'
import axiosPrivateInstance  from '@lib/axiosDefaultConfig'
import {  authSelector } from 'features/auth/authSlice'
import { useAppSelector } from 'app/hooks'
import useRefreshToken from './useRefreshToken'
import { AxiosRequestConfig } from 'axios'


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { token } = useAppSelector(authSelector);
    useEffect(() => {
        const requestIntercept = axiosPrivateInstance.interceptors.request.use(
          (config: AxiosRequestConfig<any>) => {
            if (!config?.headers?.authorization) {
              config.headers!.authorization = `Bearer ${token}`;
            }
            return config;
          }, (error) => Promise.reject(error)
        )
        const responseIntercept = axiosPrivateInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosPrivateInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        )
        return () => {
            axiosPrivateInstance.interceptors.request.eject(requestIntercept);
            axiosPrivateInstance.interceptors.response.eject(responseIntercept);
        }
    }, [token, refresh]);

    return axiosPrivateInstance
}

export default useAxiosPrivate;
