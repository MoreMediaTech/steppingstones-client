import { useState } from 'react'
import {
  UnstyledButton,
  Divider,
  Navbar,
  Burger,
  Drawer,
  Indicator,
  Menu,
} from '@mantine/core'
import { BiHomeCircle } from 'react-icons/bi'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { FaRegEnvelope, FaUsers, FaBriefcase, FaPowerOff, FaSignOutAlt } from 'react-icons/fa'
import UserButton from '@components/UserButton'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import Link from 'next/link'
import Image from 'next/image'

const AdminSidebar = ({
  show,
  handleLogout,
}: {
  show?: boolean
  handleLogout?: () => void
}) => {
  const { data: currentUser } = useGetUserQuery()
  const [opened, setOpened] = useState(false)
  const title = opened ? 'Close navigation' : 'Open navigation'
  const initials = currentUser?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  const hideNavbar = show ? 'sm' : 'xl'
  return (
    <header className="relative">
      <div className='sm:gap-1" items-left mb-2 flex w-screen gap-4 p-2 md:hidden '>
        <Burger
          opened={opened}
          aria-label={title}
          onClick={() => setOpened((o) => !o)}
          title={title}
          color="#00dcb3"
        />
      </div>
      <div className="hidden md:block">
        <Navbar p="sm" width={{ base: 100 }}>
          <Navbar.Section mt="xs">
            <Link href={'/'}>
              <a>
                <Image
                  src={'/android-chrome-512x512.png'}
                  width={70}
                  height={70}
                />
              </a>
            </Link>
          </Navbar.Section>
          <Navbar.Section grow>
            <Link href={'/admin/editor-portal'}>
              <a className="flex items-center justify-center py-12">
                <BiHomeCircle fontSize={40} color="#00DCB3" />
              </a>
            </Link>
            {/* <Link href={'/admin/editor-portal'}>
              <a className="flex items-center justify-center py-12">
                <MdOutlineCreateNewFolder fontSize={40} color="#00DCB3" />
              </a>
            </Link> */}
            <Link href={'/admin/editor-portal/messages'}>
              <a className="relative flex items-center justify-center py-12">
                <Indicator
                  inline
                  label={1}
                  size={20}
                  offset={7}
                  position="top-start"
                  color="red"
                  withBorder
                >
                  <FaRegEnvelope fontSize={40} color="#00DCB3" />
                </Indicator>
              </a>
            </Link>
            <Link href={'#'}>
              <a className="flex items-center justify-center py-12">
                <FaBriefcase fontSize={40} color="#00DCB3" />
              </a>
            </Link>
            <Link href={'/admin/editor-portal/users'}>
              <a className="flex items-center justify-center py-12">
                <FaUsers fontSize={40} color="#00DCB3" />
              </a>
            </Link>
          </Navbar.Section>
          <Navbar.Section>
            <Divider color="#00DCB3" />
            <div className="flex items-center justify-center py-6">
              <Menu
                withArrow
                position="right"
                placement="end"
                control={
                  <UnstyledButton type="button">
                    <FaPowerOff
                      fontSize={40}
                      fontWeight={100}
                      color="#00DCB3"
                    />
                  </UnstyledButton>
                }
              >
                {/* ...menu items */}
                <Menu.Label>Application</Menu.Label>

                <Menu.Item>
                  <Link href={'/auth/profile'}>
                    <a>Profile</a>
                  </Link>
                </Menu.Item>
                <Divider />
                <Menu.Item
                  icon={<FaSignOutAlt fontSize={14} />}
                  onClick={handleLogout}
                >
                  <span className="text-gray-900">Logout</span>
                </Menu.Item>
              </Menu>
            </div>
          </Navbar.Section>
        </Navbar>
      </div>
      {/* Mobile navigation */}
      <div className="md:hidden">
        <Drawer
          aria-labelledby="drawer-title"
          aria-describedby="drawer-body"
          closeButtonLabel="Close drawer"
          opened={opened}
          onClose={() => setOpened(false)}
          padding="xl"
          size="xs"
          position="left"
          title={
            <div
              id="drawer-title"
              className="relative flex flex-col items-center justify-center "
            >
              <Link href={'/'}>
                <a>
                  <Image
                    src={'/android-chrome-512x512.png'}
                    width={70}
                    height={70}
                  />
                </a>
              </Link>
            </div>
          }
        >
          <nav>
            <div className="mb-4 flex flex-col space-y-8">
              <Link href={'/admin/editor-portal'}>
                <a className="relative flex flex-col items-center justify-center ">
                  <BiHomeCircle fontSize={40} color="#00DCB3" />
                  <span className="text-xl capitalize text-[#00DCB3]">
                    Portal Home
                  </span>
                </a>
              </Link>
              {/* <Link href={'/admin/editor-portal'}>
                <a className="relative flex flex-col items-center justify-center ">
                  <BiHomeCircle fontSize={40} color="#00DCB3" />
                  <span className="text-xl capitalize text-[#00DCB3]">
                    Create
                  </span>
                </a>
              </Link> */}
              <Link href={'/admin/editor-portal/messages'}>
                <a className="relative flex flex-col items-center justify-center ">
                  <Indicator
                    inline
                    label={1}
                    size={20}
                    offset={7}
                    position="top-start"
                    color="red"
                    withBorder
                  >
                    <FaRegEnvelope fontSize={40} color="#00DCB3" />
                  </Indicator>
                  <span className="text-xl capitalize text-[#00DCB3]">
                    messages
                  </span>
                </a>
              </Link>
              <Link href={'/admin/editor-portal/users'}>
                <a className="relative flex flex-col items-center justify-center ">
                  <FaUsers fontSize={40} color="#00DCB3" />
                  <span className="text-xl capitalize text-[#00DCB3]">
                    Users
                  </span>
                </a>
              </Link>
            </div>
            <div>
              <Divider color="#00DCB3" />
              <div className="relative my-4 flex flex-col items-center justify-center">
                <UnstyledButton type="button" onClick={handleLogout}>
                  <FaPowerOff fontSize={40} fontWeight={100} color="#00DCB3" />
                </UnstyledButton>
                <span className="text-xl capitalize text-[#00DCB3]">
                  Sign Out
                </span>
              </div>
            </div>
          </nav>
        </Drawer>
      </div>
    </header>
  )
}

export default AdminSidebar
