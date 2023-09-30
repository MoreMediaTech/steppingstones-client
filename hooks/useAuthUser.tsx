'use client'

import { UserSchemaWithIdType } from '@models/User'
import { usersApiSlice } from 'app/global-state/features/user/usersApiSlice'


export const useAuthUser = (): UserSchemaWithIdType | undefined => {
  const state = usersApiSlice.endpoints.getUser.useQueryState()
  return state.data
}
