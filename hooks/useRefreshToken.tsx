import axios  from '@lib/axiosDefaultConfig'
import { setAuthSuccess } from 'features/auth/authSlice'
import { useAppDispatch } from 'app/hooks'

const useRefreshToken = () => {
    const dispatch = useAppDispatch()
  const refresh = async () => {
    const { data } = await axios.get(`/refresh`, {
      withCredentials: true,
    })
    dispatch(setAuthSuccess(data))
    return data.token
  }
    return refresh
}

export default useRefreshToken;
