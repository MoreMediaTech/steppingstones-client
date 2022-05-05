import React from 'react'
import { Divider, Navbar } from '@mantine/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/hooks'
import { authSelector, logout, reset } from 'features/auth/authSlice'
import { NEXT_URL } from '@config/index'
import UserButton from '@components/UserButton'

const AdminNavbar = ({ opened }: { opened: boolean }) => {
  const dispatch = useAppDispatch()
  const { currentUser } = useSelector(authSelector)
  const initials = currentUser?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <div className="flex h-full flex-col justify-between overflow-y-scroll bg-white">
        <div></div>

        <div className="content-end">
          <Divider />
          <UserButton
            name={currentUser?.name ?? ''}
            email={currentUser?.email ?? ''}
            initials={initials}
            show={false}
          />
        </div>
      </div>
    </Navbar>
  )
}

export default AdminNavbar
