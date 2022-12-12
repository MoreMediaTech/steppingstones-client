import React, { useState } from 'react'
import {
  UnstyledButton,
  Divider,
  Burger,
  Drawer,
  Indicator,
  Menu,
  Tooltip,
  Group,
} from '@mantine/core'
import { BiHomeCircle } from 'react-icons/bi'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import {
  FaRegEnvelope,
  FaUsers,
  FaBriefcase,
  FaPowerOff,
  FaSignOutAlt,
  FaRegUser,
} from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useGetAllInAppEnquiryMsgQuery } from 'features/messages/messagesApiSlice'
import { MessageProps } from '@lib/types'
import { AppLogo } from './AppLogo'
import Accordion from '@components/Accordion'

const AdminSidebar = ({ handleLogout }: { handleLogout?: () => void }) => {
  let arg: void
  const { data: messages } = useGetAllInAppEnquiryMsgQuery(arg, {
    pollingInterval: 60000,
  })
  const [opened, setOpened] = useState(false)
  const router = useRouter()

  // filter all unread messages
  const unreadMessages = messages?.filter(
    (message: MessageProps) => message.isRead === false
  )

  const title = opened ? 'Close navigation' : 'Open navigation'

  return (
    <header className="relative bg-primary-light-100 dark:bg-primary-dark-700 md:h-screen">
      <div className=" mb-2  flex items-center justify-between px-4 py-2 md:hidden ">
        <AppLogo />
        <Burger
          opened={opened}
          aria-label={title}
          onClick={() => setOpened((o) => !o)}
          title={title}
          color="#00dcb3"
        />
      </div>

      <aside className="w-30 hidden flex-col space-y-8 bg-primary-light-100 py-2 px-1 dark:bg-primary-dark-700 md:flex md:h-full">
        <Link href={'/'}>
          <a>
            <Image src={'/android-chrome-512x512.png'} width={70} height={70} />
          </a>
        </Link>
        <div className="flex flex-grow flex-col space-y-14 px-2">
          <Tooltip
            label={
              <p className="w-36 text-center font-semibold text-primary-light-100">
                Portal Home
              </p>
            }
            closeDelay={500}
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
          <Tooltip
            label={
              <p className="w-36 text-center font-semibold text-primary-light-100">
                Messages
              </p>
            }
            closeDelay={500}
            color="teal"
            position="right"
            withArrow
          >
            <Link href={'/admin/editor-portal/messages'}>
              <a className="relative flex items-center justify-start space-x-4 rounded-lg p-2 group-hover:hover:bg-[#00DCB3]/20">
                <Indicator
                  inline
                  label={unreadMessages?.length}
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
          <Group position="center">
            <Menu withArrow position="right" shadow="md" width={200}>
              {/* ...menu items */}
              <Menu.Target>
                <Tooltip
                  label={
                    <p className="w-full text-center font-semibold text-primary-light-100">
                      Content Management
                    </p>
                  }
                  closeDelay={500}
                  color="teal"
                  position="right"
                  withArrow
                >
                  <UnstyledButton
                    type="button"
                    className="flex w-full items-center space-x-4 rounded-lg p-2"
                  >
                    <FaBriefcase fontSize={30} color="#00DCB3" />
                  </UnstyledButton>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Content Settings</Menu.Label>

                <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                  <Link href={'/admin/editor-portal/admin/county-settings'}>
                    <a>Manage County</a>
                  </Link>
                </Menu.Item>
                <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                  <Link href={'/admin/editor-portal/admin/district-settings'}>
                    <a>Manage District</a>
                  </Link>
                </Menu.Item>
                <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                  <Link href={'/admin/editor-portal/admin/section-settings'}>
                    <a>Manage Section</a>
                  </Link>
                </Menu.Item>
                <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                  <Link href={'/admin/editor-portal/admin/partner-directory'}>
                    <a>Partner Directory</a>
                  </Link>
                </Menu.Item>
                <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                  <Link href={'/admin/editor-portal/admin/source-directory'}>
                    <a>Source Directory</a>
                  </Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Tooltip
            label={
              <p className="w-36 text-center font-semibold text-primary-light-100">
                Users
              </p>
            }
            closeDelay={500}
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
        </div>
        <Divider color="green" />
        <div className="w-full px-2">
          <div className="flex w-full items-center justify-start py-2">
            <Menu withArrow position="right" shadow="md" width={150}>
              <Menu.Target>
                <UnstyledButton
                  type="button"
                  className="flex w-full items-center space-x-4 rounded-lg p-2 group-hover:hover:bg-[#00DCB3]/20"
                >
                  <FaPowerOff fontSize={30} fontWeight={100} color="#00DCB3" />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  className="flex w-full items-center  rounded-lg p-2  font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100"
                  icon={<FaRegUser fontSize={14} />}
                >
                  <Link href={'/auth/profile'}>
                    <a>Profile</a>
                  </Link>
                </Menu.Item>
                <Divider />
                <Menu.Item
                  className="flex w-full items-center rounded-lg p-2  font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100"
                  icon={<FaSignOutAlt fontSize={14} />}
                  onClick={handleLogout}
                >
                  <p>Logout</p>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div className="md:hidden">
        <Drawer
          aria-labelledby="drawer-title"
          aria-describedby="drawer-body"
          closeButtonLabel="Close drawer"
          opened={opened}
          onClose={() => setOpened(false)}
          padding="lg"
          size="lg"
          position="left"
          className="flex h-screen flex-col"
        >
          <div className="flex w-full  flex-grow flex-col space-y-6">
            <Link href={'/admin/editor-portal'}>
              <a className="flex items-center">
                <BiHomeCircle fontSize={30} color="#00DCB3" />
                <span className="w-32 rounded-md bg-transparent px-2 py-1 text-center text-lg font-semibold capitalize text-[#00DCB3]">
                  Portal Home
                </span>
              </a>
            </Link>

            <Link href={'/admin/editor-portal/messages'} passHref>
              <a className="flex  items-center">
                <Indicator
                  inline
                  label={unreadMessages?.length}
                  size={20}
                  offset={7}
                  position="top-start"
                  color="red"
                  withBorder
                >
                  <FaRegEnvelope fontSize={30} color="#00DCB3" />
                </Indicator>
                <span className="w-32 rounded-md bg-transparent px-2 py-1 text-center text-lg font-semibold capitalize text-[#00DCB3]">
                  messages
                </span>
              </a>
            </Link>
            <Accordion
              title={
                <div className="flex items-center">
                  <FaUsers fontSize={35} color="#00DCB3" />
                  <span className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]">
                    Content Management
                  </span>
                </div>
              }
            >
              <div className="flex flex-col gap-y-1 px-4">
                <Link
                  href={'/admin/editor-portal/admin/county-settings'}
                  passHref
                >
                  <a className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3] active:bg-[#00DCB3] active:text-white">
                    County Settings
                  </a>
                </Link>
                <Link href={'/admin/editor-portal/admin/district-settings'}>
                  <a className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]">
                    District Settings
                  </a>
                </Link>
                <Link href={'/admin/editor-portal/admin/section-settings'}>
                  <a className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]">
                    Section Settings
                  </a>
                </Link>
                <Link href={'/admin/editor-portal/admin/partner-directory'}>
                  <a className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]">
                    Partner Directory
                  </a>
                </Link>
                <Link href={'/admin/editor-portal/admin/source-directory'}>
                  <a className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]">
                    Source Directory
                  </a>
                </Link>
              </div>
            </Accordion>
            <Link href={'/admin/editor-portal/users'}>
              <a className="flex items-center">
                <FaUsers fontSize={35} color="#00DCB3" />
                <span className="w-32 rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]">
                  Users
                </span>
              </a>
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 mb-4 w-full space-y-4 px-2">
            <Divider color="#00DCB3" />

            <UnstyledButton
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-md bg-[#00DCB3] px-2 py-1"
            >
              <FaPowerOff fontSize={30} fontWeight={10} color="#fff" />
              <span className="w-32 rounded-md bg-[#00DCB3]  text-center text-xl font-semibold capitalize text-white">
                Sign Out
              </span>
            </UnstyledButton>
          </div>
        </Drawer>
      </div>
    </header>
  )
}

export default AdminSidebar
