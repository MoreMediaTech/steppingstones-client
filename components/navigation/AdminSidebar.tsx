import React from 'react'
import { Divider, Navbar } from '@mantine/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/hooks'
import { authSelector } from 'features/auth/authSlice'
import { NEXT_URL } from '@config/index'
import UserButton from '@components/UserButton'

const AdminSidebar = ({
  opened,
  show,
}: {
  opened: boolean
  show?: boolean
}) => {
  const dispatch = useAppDispatch()
  const { currentUser } = useSelector(authSelector)
  const initials = currentUser?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  const hideNavbar = show ? 'sm' : 'xl'
  return (
    <header>
      <Navbar
        p="sm"
        hiddenBreakpoint={hideNavbar}
        hidden={!opened}
        width={{ sm: 200, lg: 300 }}
      >
        <Navbar.Section grow>Links</Navbar.Section>
        <Navbar.Section>
          <Divider />
          <UserButton
            name={currentUser?.name ?? ''}
            email={currentUser?.email ?? ''}
            initials={initials}
            show={false}
          />
        </Navbar.Section>

        {/* <div className="flex h-full flex-col justify-between overflow-y-scroll bg-white">
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
      </div> */}
      </Navbar>
    </header>
  )
}

export default AdminSidebar
