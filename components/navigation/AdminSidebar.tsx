'use client'
import React from 'react'
import {
  Box,
  Divider,
  Burger,
  Drawer,
  Indicator,
  Menu,
  Title,
} from '@mantine/core'
import { BiHomeCircle } from 'react-icons/bi'
import {
  FaRegEnvelope,
  FaUsers,
  FaBriefcase,
  FaSignOutAlt,
  FaRegUser,
} from 'react-icons/fa'
import { GoFileDirectory } from 'react-icons/go'
import Link from 'next/link'
import Image from 'next/image'

import { useGetAllInAppEnquiryMsgQuery } from 'app/global-state/features/messages/messagesApiSlice'
import { MessageProps } from '@lib/types'
import { AppLogo } from './AppLogo'

import { useAppSelector, useAppDispatch } from 'app/global-state/hooks'
import {
  globalSelector,
  setDrawerOpened,
} from 'app/global-state/features/global/globalSlice'

const NAV_ITEMS = [
  {
    label: 'Portal Home',
    icon: <BiHomeCircle fontSize={18} color="#00DCB3" />,
    href: '/admin/editor-portal',
  },
  {
    label: 'Messages',
    icon: <FaRegEnvelope fontSize={18} color="#00DCB3" />,
    href: '/admin/editor-portal/messages',
  },
  {
    label: 'Manage Users',
    icon: <FaUsers fontSize={18} color="#00DCB3" />,
    href: '/admin/editor-portal/users',
  },
  {
    label: 'Admin',
    icon: null,
    href: null,
  },
  {
    label: 'Manage County',
    icon: <FaBriefcase fontSize={18} color="#00DCB3" />,
    href: '/admin/editor-portal/admin/county-settings',
  },
  {
    label: 'Manage District',
    icon: <FaBriefcase fontSize={18} color="#00DCB3" />,
    href: '/admin/editor-portal/admin/district-settings',
  },
  {
    label: 'Manage Section',
    icon: <FaBriefcase fontSize={18} color="#00DCB3" />,
    href: '/admin/editor-portal/admin/section-settings',
  },
  {
    label: 'Partner Directory',
    icon: <GoFileDirectory fontSize={18} color="#00DCB3" />,
    href: '/admin/editor-portal/admin/partner-directory',
  },
  {
    label: 'Source Directory',
    icon: <GoFileDirectory fontSize={18} color="#00DCB3" />,
    href: '/admin/editor-portal/admin/source-directory',
  },
]

const AdminSidebar = ({ handleLogout }: { handleLogout?: () => void }) => {
  const dispatch = useAppDispatch()
  const { drawerOpened } = useAppSelector(globalSelector)
  let arg: void
  const { data: messages } = useGetAllInAppEnquiryMsgQuery(arg, {
    pollingInterval: 60000,
  })

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
        opened={drawerOpened}
        onClose={() => dispatch(setDrawerOpened(false))}
        padding="sm"
        size={250}
        position="left"
        className="flex h-screen flex-col bg-primary-light-100 dark:bg-primary-dark-700"
        title={
          <>
            <Link href={'/'} className="flex items-center px-4">
              <Image
                src={'/android-chrome-512x512.png'}
                alt=""
                width={70}
                height={70}
              />
            </Link>
          </>
        }
      >
        <div className="flex flex-grow flex-col  space-y-4 px-4 py-2">
          {NAV_ITEMS.map(({ label, icon, href }) => {
            if (!icon && !href) {
              return (
                <Box
                  key={label}
                  sx={{
                    paddingLeft: '0.5rem',
                  }}
                >
                  <Title order={4} className="text-gray-800 dark:text-gray-100">
                    {label}
                  </Title>
                </Box>
              )
            }

            if (label === 'Messages') {
              return (
                <Link
                  key={label}
                  href={href as string}
                  className="relative flex space-x-4 rounded-lg  p-2 group-hover:hover:bg-[#00DCB3]/20"
                  onClick={() => dispatch(setDrawerOpened(false))}
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
                    {icon}
                    <span className=" text-sm text-[#00DCB3]">{label}</span>
                  </Indicator>
                </Link>
              )
            }

            return (
              <Link
                key={label}
                href={href as string}
                className="flex items-center justify-start space-x-2 px-2 group-hover:hover:bg-[#00DCB3]/20"
                onClick={() => dispatch(setDrawerOpened(false))}
              >
                {icon}
                <span className="mt-1 text-sm text-[#00DCB3]">{label}</span>
              </Link>
            )
          })}
        </div>
        <div className="absolute bottom-0 left-0 w-full px-2">
          <Divider color="green" />
          <div className="flex w-full flex-col items-center justify-start py-2">
            <Menu width={150}>
              <Menu.Item
                className="mb-2 flex w-full  items-center rounded-lg  p-2 font-semibold text-[#00DCB3]"
                icon={<FaRegUser fontSize={14} color="#00DCB3" />}
                onClick={() => dispatch(setDrawerOpened(false))}
              >
                <Link href={'/auth/profile'}>Profile</Link>
              </Menu.Item>
              <Menu.Item
                className="flex w-full items-center rounded-lg p-2  font-semibold text-[#00DCB3] "
                icon={
                  <FaSignOutAlt
                    fontSize={14}
                    color="#00DCB3"
                    className="hover:text-primary-light-100"
                  />
                }
                onClick={() => {
                  handleLogout && handleLogout()
                  dispatch(setDrawerOpened(false))
                }}
              >
                <p>Logout</p>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Drawer>
    </header>
  )
}

export default AdminSidebar
