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

import { useAppSelector, useAppDispatch } from 'state/hooks'
import { globalSelector, setDrawerOpened } from 'features/global/globalSlice'

const AdminSidebar = ({ handleLogout }: { handleLogout?: () => void }) => {
  const dispatch = useAppDispatch()
  const { drawerOpened } = useAppSelector(globalSelector)
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

  const title = drawerOpened ? 'Close navigation' : 'Open navigation'

  return (
    <header className="relative bg-primary-light-100 dark:bg-primary-dark-700   md:h-screen">
      <div className=" mb-2  flex items-center justify-between px-4 py-2 md:hidden ">
        <AppLogo />
        <Burger
          opened={drawerOpened}
          aria-label={title}
          onClick={() => dispatch(setDrawerOpened(!drawerOpened))}
          title={title}
          color="#00dcb3"
        />
      </div>

      <Drawer
        aria-labelledby="drawer-title"
        aria-describedby="drawer-body"
        closeButtonLabel="Close drawer"
        opened={drawerOpened}
        onClose={() => dispatch(setDrawerOpened(false))}
        padding="sm"
        size={250}
        position="left"
        className="flex h-screen flex-col"
      >
        <Link href={'/'} className="flex items-center px-4">
          <Image
            src={'/android-chrome-512x512.png'}
            alt=""
            width={70}
            height={70}
          />
        </Link>
        <div className="flex flex-grow flex-col  space-y-4 px-4">
          <Link
            href={'/admin/editor-portal'}
            className="flex items-center justify-start space-x-2 px-2 group-hover:hover:bg-[#00DCB3]/20"
          >
            <BiHomeCircle fontSize={18} color="#00DCB3" />{' '}
            <span className="mt-1 text-sm text-[#00DCB3]">Portal Home</span>
          </Link>

          <Link
            href={'/admin/editor-portal/messages'}
            className="relative flex space-x-4 rounded-lg  p-2 group-hover:hover:bg-[#00DCB3]/20"
          >
            <Indicator
              inline
              label={unreadMessages?.length}
              size={16}
              offset={7}
              position="top-start"
              color="red"
              withBorder
              className="flex items-center  space-x-2"
            >
              <FaRegEnvelope fontSize={18} color="#00DCB3" />
              <span className=" text-sm text-[#00DCB3]">Messages</span>
            </Indicator>
          </Link>
          <Group position="left">
            <Menu width={200}>
              {/* ...menu items */}

              <Menu.Label className="flex items-center justify-start space-x-2">
                <FaBriefcase fontSize={18} color="#00DCB3" />
                <span className="mt-1 text-sm text-[#00DCB3]">
                  Content Settings
                </span>
              </Menu.Label>

              <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 text-center font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                <Link href={'/admin/editor-portal/admin/county-settings'}>
                  Manage County
                </Link>
              </Menu.Item>
              <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 text-center font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                <Link href={'/admin/editor-portal/admin/district-settings'}>
                  Manage District
                </Link>
              </Menu.Item>
              <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 text-center font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                <Link href={'/admin/editor-portal/admin/section-settings'}>
                  Manage Section
                </Link>
              </Menu.Item>
              <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 text-center font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                <Link href={'/admin/editor-portal/admin/partner-directory'}>
                  Partner Directory
                </Link>
              </Menu.Item>
              <Menu.Item className="flex w-full items-center space-x-4 rounded-lg p-2 text-center font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100">
                <Link href={'/admin/editor-portal/admin/source-directory'}>
                  Source Directory
                </Link>
              </Menu.Item>
            </Menu>
          </Group>

          <Link
            href={'/admin/editor-portal/users'}
            className="flex items-center justify-start space-x-4 rounded-lg p-2 group-hover:hover:bg-[#00DCB3]/20"
          >
            <FaUsers fontSize={18} color="#00DCB3" />
            <span className="text-sm text-[#00DCB3]">Users</span>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-2">
        <Divider color="green" />
          <div className="flex w-full flex-col items-center justify-start py-2">
            <Menu width={150}>
              <Menu.Item
                className="mb-2 flex w-full  items-center rounded-lg  p-2 font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100"
                icon={<FaRegUser fontSize={14} />}
              >
                <Link href={'/auth/profile'}>Profile</Link>
              </Menu.Item>
              <Divider />
              <Menu.Item
                className="flex w-full items-center rounded-lg p-2  font-semibold hover:bg-[#00DCB3] hover:text-primary-light-100"
                icon={<FaSignOutAlt fontSize={14} />}
                onClick={handleLogout}
              >
                <p>Logout</p>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Drawer>

      {/* Mobile navigation */}
      {/* <div className="md:hidden">
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
            <Link href={'/admin/editor-portal'} className="flex items-center">
              <BiHomeCircle fontSize={30} color="#00DCB3" />
              <span className="w-32 rounded-md bg-transparent px-2 py-1 text-center text-lg font-semibold capitalize text-[#00DCB3]">
                Portal Home
              </span>
            </Link>

            <Link
              href={'/admin/editor-portal/messages'}
              className="flex items-center"
            >
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
                  className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3] active:bg-[#00DCB3] active:text-white"
                >
                  County Settings
                </Link>
                <Link
                  href={'/admin/editor-portal/admin/district-settings'}
                  className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]"
                >
                  District Settings
                </Link>
                <Link
                  href={'/admin/editor-portal/admin/section-settings'}
                  className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]"
                >
                  Section Settings
                </Link>
                <Link
                  href={'/admin/editor-portal/admin/partner-directory'}
                  className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]"
                >
                  Partner Directory
                </Link>
                <Link
                  href={'/admin/editor-portal/admin/source-directory'}
                  className="w-32 whitespace-nowrap rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]"
                >
                  Source Directory
                </Link>
              </div>
            </Accordion>
            <Link
              href={'/admin/editor-portal/users'}
              className="flex items-center"
            >
              <FaUsers fontSize={35} color="#00DCB3" />
              <span className="w-32 rounded-md bg-transparent px-2 py-1 text-center text-xl font-semibold capitalize text-[#00DCB3]">
                Users
              </span>
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
      </div> */}
    </header>
  )
}

export default AdminSidebar
