'use client'
import React from 'react'
import {
  Indicator,
  Menu,
  Title,
} from '@mantine/core'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { BiHomeCircle } from 'react-icons/bi'
import {
  FaRegEnvelope,
  FaUsers,
  FaBriefcase,
  FaSignOutAlt,
  FaRegUser,
  FaRegCalendarAlt,
} from 'react-icons/fa'
import { GoFileDirectory } from 'react-icons/go'
import { MdOutlineReviews, MdOutlineSpeakerNotes } from 'react-icons/md'
import { GiPortal } from 'react-icons/gi'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useGetAllInAppEnquiryMsgQuery } from 'app/global-state/features/messages/messagesApiSlice'
import { MessageProps } from '@lib/types'

import { useAppSelector, useAppDispatch } from '../../global-state/hooks'
import {
  globalSelector,
  setDrawerOpened,
} from 'app/global-state/features/global/globalSlice'
import { Separator } from '@components/ui/separator'

const NAV_ITEMS = [
  {
    label: 'Portal Home',
    icon: <BiHomeCircle fontSize={18} color="#00DCB3" />,
    href: '/admin-portal',
  },
  {
    label: 'Advertisements',
    href: '/admin-portal/ads-section',
    icon: <MdOutlineSpeakerNotes fontSize={18} color="#00DCB3" />,
  },
  {
    label: 'County Portal',
    href: '/admin-portal/county-portal',
    icon: <GiPortal fontSize={18} color="#00DCB3" />,
  },
  {
    label: 'Client Meetings',
    href: '/admin-portal/client-meeting',
    icon: <FaRegCalendarAlt fontSize={18} color="#00DCB3" />,
  },
  {
    label: 'Feedback',
    href: '/admin-portal/feedback',
    icon: <MdOutlineReviews fontSize={18} color="#00DCB3" />,
  },
  {
    label: 'Messages',
    icon: <FaRegEnvelope fontSize={18} color="#00DCB3" />,
    href: '/admin-portal/messages',
  },
  {
    label: 'Manage Users',
    icon: <FaUsers fontSize={18} color="#00DCB3" />,
    href: '/admin-portal/users',
  },
  {
    label: 'Admin',
    icon: null,
    href: null,
  },
  {
    label: 'Manage County',
    icon: <FaBriefcase fontSize={18} color="#00DCB3" />,
    href: '/admin-portal/admin/county-setting',
  },
  {
    label: 'Manage District',
    icon: <FaBriefcase fontSize={18} color="#00DCB3" />,
    href: '/admin-portal/admin/district-setting',
  },
  {
    label: 'Manage Section',
    icon: <FaBriefcase fontSize={18} color="#00DCB3" />,
    href: '/admin-portal/admin/section-setting',
  },
  {
    label: 'Partner Directory',
    icon: <GoFileDirectory fontSize={18} color="#00DCB3" />,
    href: '/admin-portal/admin/partner-directory',
  },
  {
    label: 'Source Directory',
    icon: <GoFileDirectory fontSize={18} color="#00DCB3" />,
    href: '/admin-portal/admin/source-directory',
  },
]

const AdminSidebar = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { drawerOpened } = useAppSelector(globalSelector)
  let arg: void
  const { data: messages } = useGetAllInAppEnquiryMsgQuery(arg, {
    pollingInterval: 60000,
  })

  const handleLogout = async () => {
    router.push(`/auth/logout`)
  }

  // filter all unread messages
  const unreadMessages = messages?.filter(
    (message: MessageProps) => message.isRead === false
  )

  const title = drawerOpened ? 'Close navigation' : 'Open navigation'

  return (
    <header className="">
      <Sheet>
        <SheetTrigger>
          <button className="navbar-burger flex items-center p-3 text-blue-600">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </SheetTrigger>
        <SheetContent side={'left'} className="w-[240px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>
              <Link href={'/'} className="flex items-center px-4">
                <Image
                  src={'/android-chrome-512x512.png'}
                  alt=""
                  width={70}
                  height={70}
                />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {NAV_ITEMS.map(({ label, icon, href }) => {
              if (!icon && !href) {
                return (
                  <div key={label} className="pl-2">
                    <Title
                      order={4}
                      className="text-gray-800 dark:text-gray-100"
                    >
                      {label}
                    </Title>
                    <Separator className="my-2" />
                  </div>
                )
              }

              if (label === 'Messages') {
                return (
                  <SheetClose key={label} asChild>
                    <Link
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
                  </SheetClose>
                )
              }

              return (
                <SheetClose key={label} asChild>
                  <Link
                    key={label}
                    href={href as string}
                    className="flex items-center justify-start space-x-2 px-2 group-hover:hover:bg-[#00DCB3]/20"
                    onClick={() => dispatch(setDrawerOpened(false))}
                  >
                    {icon}
                    <span className="mt-1 text-sm text-[#00DCB3]">{label}</span>
                  </Link>
                </SheetClose>
              )
            })}
          </div>
          <div className="absolute bottom-0 left-0 w-full px-2">
            <Separator className="my-2" />
            <div className="flex w-full flex-col items-center justify-start py-2">
              <Menu width={150}>
                <Menu.Item
                  className="mb-2 flex w-full  items-center rounded-lg  p-2 font-semibold text-[#00DCB3]"
                  icon={<FaRegUser fontSize={14} color="#00DCB3" />}
                  onClick={() => dispatch(setDrawerOpened(false))}
                >
                  <Link href={'/auth/user-profile'}>Profile</Link>
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
                    handleLogout()
                    dispatch(setDrawerOpened(false))
                  }}
                >
                  <p>Logout</p>
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default AdminSidebar
