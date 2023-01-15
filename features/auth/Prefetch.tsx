import { Children, useEffect } from 'react'
import { store } from 'state/store'
import { usersApiSlice } from 'features/user/usersApiSlice'
import { OutletProps } from '@lib/types'

interface IPrefetchProps {
  children: React.ReactElement | React.ReactElement[]
}

const Prefetch = ({ children }: IPrefetchProps) => {
  useEffect(() => {
    console.log('subscribing')
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      console.log('unsubscribing')
      users.unsubscribe()
    }
  }, [])

  return Children.only(children)
}
export default Prefetch
