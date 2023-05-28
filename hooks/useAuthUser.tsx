import { usersApiSlice } from 'app/global-state/features/user/usersApiSlice'
import { CurrentUser } from '@lib/types'

export const useAuthUser = (): CurrentUser | undefined => {
  const state = usersApiSlice.endpoints.getUser.useQueryState()
  return state.data
}
