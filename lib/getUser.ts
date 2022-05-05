import { axiosInstance } from './axiosDefaultConfig'
import { SessionProps } from './types'

export async function getUser(cookie: string): Promise<SessionProps> {
  axiosInstance.defaults.headers.common['authorization'] = `Bearer ${cookie}`
  try {
    const { data } = await axiosInstance.get(`users/getMe`) 

    return data
  } catch (error) {
    throw new Error('Unable to fetch user: ' + error.message)
  }
}
