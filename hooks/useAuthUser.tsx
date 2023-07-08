import { UserSchemaWithIdAndOrganisationType } from '@models/User'
import { usersApiSlice } from 'app/global-state/features/user/usersApiSlice'


export const useAuthUser = (): UserSchemaWithIdAndOrganisationType | undefined => {
  const state = usersApiSlice.endpoints.getUser.useQueryState()
  return state.data
}
