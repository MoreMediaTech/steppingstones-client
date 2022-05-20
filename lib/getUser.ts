import axiosPrivateInstance from './axiosDefaultConfig'
import { SessionProps } from './types'

export async function getUser(cookie: string): Promise<SessionProps> {
  axiosPrivateInstance.defaults.headers.common.authorization = `Bearer ${cookie}`
  try {
    const { data } = await axiosPrivateInstance.get(`users/getMe`)

    return data
  } catch (error) {
    throw new Error('Unable to fetch user: ' + error.message)
  }
}
