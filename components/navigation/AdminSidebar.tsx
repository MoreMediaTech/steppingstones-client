import React, { useState } from 'react'
import {
  UnstyledButton,
  Divider,
  Navbar,
  Burger,
  Drawer,
  Indicator,
  Menu,
  Tooltip,
  Aside,
} from '@mantine/core'
import { BiHomeCircle } from 'react-icons/bi'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import {
  FaRegEnvelope,
  FaUsers,
  FaBriefcase,
  FaPowerOff,
  FaSignOutAlt,
} from 'react-icons/fa'

import { useGetUserQuery } from 'features/user/usersApiSlice'
import Link from 'next/link'
import Image from 'next/image'

const AdminSidebar = ({
  show,
  handleLogout,
  setIsOpen,
  isOpen,
}: {
  show?: boolean
  handleLogout?: () => void
  isOpen?: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data: currentUser } = useGetUserQuery()
  const [opened, setOpened] = useState(false)
  const title = opened ? 'Close navigation' : 'Open navigation'
  const initials = currentUser?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  const width = isOpen ? '288' : '100'
  return (
    <header className="relative bg-slate-50">
      <div className=" mb-2  p-2 md:hidden ">
        <Burger
          opened={opened}
          aria-label={title}
          onClick={() => setOpened((o) => !o)}
          title={title}
          color="#00dcb3"
        />
      </div>

      <Navbar p="sm" className="w-30 hidden flex-col space-y-8 md:flex">
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
        <Navbar.Section grow className="flex flex-col space-y-14 px-2">
          <Tooltip
            label={
              <p className="w-24 text-center font-semibold text-white">
                Portal Home
              </p>
            }
            closeDelay={500}
            tooltipId="portal-home"
            color="teal"
            position="right"
            withArrow
          >
            <Link href={'/admin/editor-portal'}>
              <a className="flex items-center justify-start space-x-4 rounded-lg p-2 group-hover:hover:bg-[#00DCB3]/20">
                <BiHomeCircle fontSize={30} color="#00DCB3" />
              </a>
            </Link>
          </Tooltip>
          {/* <Link href={'/admin/editor-portal'}>
              <a className="flex items-center justify-center py-12">
                <MdOutlineCreateNewFolder fontSize={30} color="#00DCB3" />
              </a>
            </Link> */}
          <Tooltip
            label={
              <p className="w-24 text-center font-semibold text-white">
                Messages
              </p>
            }
            closeDelay={500}
            tooltipId="messages"
            color="teal"
            position="right"
            withArrow
          >
            <Link href={'/admin/editor-portal/messages'}>
              <a className="relative flex items-center justify-start space-x-4 rounded-lg p-2 group-hover:hover:bg-[#00DCB3]/20">
                <Indicator
                  inline
                  label={1}
                  size={20}
                  offset={7}
                  position="top-start"
                  color="red"
                  withBorder
                >
                  <FaRegEnvelope fontSize={30} color="#00DCB3" />
                </Indicator>
              </a>
            </Link>
          </Tooltip>
          <Tooltip
            label={
              <p className="w-24 text-center font-semibold text-white">Admin</p>
            }
            closeDelay={500}
            tooltipId="portal-home"
            color="teal"
            position="right"
            withArrow
          >
            <Link href={'#'}>
              <a className="flex items-center justify-start space-x-4 rounded-lg p-2 group-hover:hover:bg-[#00DCB3]/20">
                <FaBriefcase fontSize={30} color="#00DCB3" />
              </a>
            </Link>
          </Tooltip>
          <Tooltip
            label={
              <p className="w-24 text-center font-semibold text-white">Users</p>
            }
            closeDelay={500}
            tooltipId="users"
            color="teal"
            position="right"
            withArrow
          >
            <Link href={'/admin/editor-portal/users'}>
              <a className="flex items-center justify-start space-x-4 rounded-lg p-2 group-hover:hover:bg-[#00DCB3]/20">
                <FaUsers fontSize={30} color="#00DCB3" />
              </a>
            </Link>
          </Tooltip>
        </Navbar.Section>
        <Divider color="green" />
        <Navbar.Section className="w-full space-y-14 px-2">
          <div className="flex w-full items-center justify-start py-6">
            <Menu
              withArrow
              position="right"
              placement="end"
              control={
                <UnstyledButton
                  type="button"
                  className="flex w-full items-center space-x-4 rounded-lg p-2 group-hover:hover:bg-[#00DCB3]/20"
                >
                  <FaPowerOff fontSize={30} fontWeight={100} color="#00DCB3" />
                  <span
                    className={`hidden text-xl text-[#00DCB3] group-hover:block`}
                  >
                    Settings
                  </span>
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

      {/* Mobile navigation */}
      <div className="md:hidden">
        <Drawer
          aria-labelledby="drawer-title"
          aria-describedby="drawer-body"
          closeButtonLabel="Close drawer"
          opened={opened}
          onClose={() => setOpened(false)}
          padding="xl"
          size="sm"
          position="left"
          title={
            <div id="drawer-title" className="relative">
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
          <aside className="relative flex w-full flex-col justify-between space-y-96">
            <div className="mb-4 ml-2 flex w-full flex-col space-y-12">
              <Link href={'/admin/editor-portal'}>
                <a className="flex w-full items-center space-x-2">
                  <BiHomeCircle fontSize={40} color="#00DCB3" />
                  <span className="w-32 rounded-md bg-[#00DCB3] px-2 py-1 text-center text-lg font-semibold capitalize text-white">
                    Portal Home
                  </span>
                </a>
              </Link>

              <Link href={'/admin/editor-portal/messages'}>
                <a className="flex  items-center  space-x-2">
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
                  <span className="w-32 rounded-md bg-[#00DCB3] px-2 py-1 text-center text-lg font-semibold capitalize text-white">
                    messages
                  </span>
                </a>
              </Link>
              <Link href={'/admin/editor-portal/users'}>
                <a className="flex items-center  space-x-2">
                  <FaUsers fontSize={40} color="#00DCB3" />
                  <span className="w-32 rounded-md bg-[#00DCB3] px-2 py-1 text-center text-lg font-semibold capitalize text-white">
                    Users
                  </span>
                </a>
              </Link>
            </div>
            <div className="ml-2 space-y-4">
              <Divider color="#00DCB3" />

                <UnstyledButton type="button" onClick={handleLogout} className="flex items-center space-x-2">
                  <FaPowerOff fontSize={40} fontWeight={100} color="#00DCB3" />
                <span className="w-32 rounded-md bg-[#00DCB3] px-2 py-1 text-center text-lg font-semibold capitalize text-white">
                  Sign Out
                </span>
                </UnstyledButton>

            </div>
          </aside>
        </Drawer>
      </div>
    </header>
  )
}

export default AdminSidebar
