'use client'
import React from 'react'
import { Indicator, Menu, Title } from '@mantine/core'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { BiHomeCircle } from 'react-icons/bi'
import { BsArrowLeftShort } from 'react-icons/bs'
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

import { useGetAllInAppEnquiryMsgQuery } from '@global-state/features/messages/messagesApiSlice'
import { MessageProps } from '@lib/types'
import ColorLogo from '@public/SS-Color-logo-with-background.png'

import { useAppDispatch } from '@global-state/hooks'
import { setDrawerOpened } from 'app/global-state/features/global/globalSlice'
import { Separator } from '@components/ui/separator'
import Header from '@components/Header'
import { Button } from '@components/ui/button'
import { ScrollArea } from '@components/ui/scroll-area'
import { NAV_ITEMS } from 'data'

export function AdminSidebar({ height }: { height: number }) {
  const SCROLL_AREA_HEIGHT = height - 70
  const [opened, setOpened] = React.useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
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
  return (
    <aside className="sticky z-50">
      <div
        className={`relative flex flex-col items-center py-4 ${
          opened ? 'w-72' : 'w-24'
        } hidden min-h-screen rounded-lg border bg-background shadow-md transition-all duration-500  ease-in-out md:block`}
      >
        <BsArrowLeftShort
          className={`absolute -right-3 top-24 ml-auto h-6 w-6 cursor-pointer rounded-full bg-accent-light-500 text-white shadow-sm ${
            !opened ? 'rotate-180' : ''
          }`}
          onClick={() => setOpened(!opened)}
        />
        <div
          className={`inline-flex items-center px-2 ${
            opened ? 'gap-2' : 'gap-0'
          }`}
        >
          <Image
            src={ColorLogo}
            alt="Stepping Stones logo"
            width={60}
            height={40}
            sizes="(max-width: 640px) 40vw, 20vw"
            className={`${opened ? 'ml-0 ' : 'ml-2.5'}`}
          />
          <div
            className={`origin-left transition-all duration-300 ease-in-out fade-in-10 ${
              !opened ? 'hidden' : ''
            }`}
          >
            <Header
              title="Stepping Stones"
              order={4}
              subtitle="Business Solutions"
              subOrder={5}
            />
          </div>
        </div>
        <ScrollArea
          className={`w-full p-2 py-4`}
          style={{ height: SCROLL_AREA_HEIGHT }}
        >
          <div className="w-full px-2">
            {NAV_ITEMS.map(({ label, Icon, href }) => {
              if (!Icon && !href) {
                return (
                  <div key={label} className="my-2 w-full text-center">
                    <Title
                      order={opened ? 4 : 6}
                      className="text-textDark dark:text-textLight"
                    >
                      {label}
                    </Title>
                  </div>
                )
              }

              if (label === 'Messages') {
                return (
                  <Button
                    className={`mb-2 flex w-full items-center rounded-lg font-semibold ${
                      opened ? 'justify-start' : ''
                    }`}
                    variant="outline"
                    asChild
                  >
                    <Link
                      href={href as string}
                      className={`group-hover:hover:bg-[#00DCB3]/20" relative inline-flex w-full  space-x-2 rounded-lg`}
                      onClick={() => dispatch(setDrawerOpened(false))}
                    >
                      <Indicator
                        inline
                        label={unreadMessages?.length}
                        size={16}
                        offset={5}
                        position="top-end"
                        color="red"
                        withBorder
                        className={`flex items-center duration-100 `}
                      >
                        {<Icon size={20} />}
                      </Indicator>
                      <span
                        className={` text-sm transition-all duration-300 ease-in-out ${
                          !opened ? 'hidden' : ''
                        }`}
                      >
                        {label}
                      </span>
                    </Link>
                  </Button>
                )
              }

              return (
                <Button
                  className={`flex w-full items-center ${
                    opened ? 'justify-start' : ''
                  } mb-2 rounded-lg font-semibold`}
                  variant="outline"
                  asChild
                >
                  <Link
                    key={label}
                    href={href as string}
                    className={`flex w-auto items-center space-x-2 duration-300 group-hover:hover:bg-[#00DCB3]/20 `}
                    onClick={() => dispatch(setDrawerOpened(false))}
                  >
                    {<Icon className="text-2xl" />}
                    <span
                      className={`text-sm duration-300 ${
                        !opened ? 'hidden' : ' '
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </Button>
              )
            })}
          </div>
          <div className="bottom-2 left-0 w-full px-2">
            <Separator className={`my-2 ${opened ? 'w-64' : 'w-16'}`} />
            <div className="flex w-full flex-col items-center space-y-2 py-2">
              <Button
                className="flex w-full items-center rounded-lg p-2  font-semibold"
                variant="outline"
                asChild
              >
                <Link
                  href={'/auth/user-profile'}
                  className="flex items-center justify-start space-x-2 px-2 group-hover:hover:bg-[#00DCB3]/20"
                >
                  <FaRegUser className="text-xl" />
                  <span
                    className={`transition-all duration-300 ${
                      !opened ? 'hidden' : 'mt-1 '
                    }`}
                  >
                    Profile
                  </span>
                </Link>
              </Button>
              <Button
                className="flex w-full items-center rounded-lg p-2  font-semibold"
                variant="outline"
                onClick={() => {
                  handleLogout()
                  dispatch(setDrawerOpened(false))
                }}
              >
                <FaSignOutAlt className="text-2xl" />
                <p
                  className={`transition-all duration-300 ${
                    !opened ? 'hidden' : ''
                  }`}
                >
                  Logout
                </p>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}

export function MobileAdminSidebar({ height }: { height: number }) {
  const SCROLL_AREA_HEIGHT = height - 100
  const dispatch = useAppDispatch()
  const router = useRouter()
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

  return (
    <header>
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
        <SheetContent side={'left'} className="w-[240px]">
          <SheetHeader>
            <SheetTitle>
              <div className={`inline-flex items-center gap-2`}>
                <Image
                  src={ColorLogo}
                  alt="Stepping Stones logo"
                  width={60}
                  height={40}
                  sizes="(max-width: 640px) 40vw, 20vw"
                  className=""
                />
                <div
                  className={`origin-left transition-all duration-300 ease-in-out fade-in-10 `}
                >
                  <Header
                    title="Stepping Stones"
                    order={4}
                    subtitle="Business Solutions"
                    subOrder={5}
                  />
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea
            className={`  py-12`}
            style={{ height: SCROLL_AREA_HEIGHT }}
          >
            <div className="w-full">
              {NAV_ITEMS.map(({ label, Icon, href }) => {
                if (!Icon && !href) {
                  return (
                    <div key={label} className="my-2 w-full text-center">
                      <Title
                        order={4}
                        className="text-textDark dark:text-textLight"
                      >
                        {label}
                      </Title>
                    </div>
                  )
                }

                if (label === 'Messages') {
                  return (
                    <Button
                      className={`mb-2 flex w-full items-center justify-start rounded-lg font-semibold`}
                      variant="outline"
                      asChild
                    >
                      <Link
                        href={href as string}
                        className={`group-hover:hover:bg-[#00DCB3]/20" relative inline-flex w-full  space-x-2 rounded-lg`}
                        onClick={() => dispatch(setDrawerOpened(false))}
                      >
                        <Indicator
                          inline
                          label={unreadMessages?.length}
                          size={16}
                          offset={5}
                          position="top-end"
                          color="red"
                          withBorder
                          className={`flex items-center duration-100 `}
                        >
                          {<Icon size={20} />}
                        </Indicator>
                        <span
                          className={` text-sm transition-all duration-300 ease-in-out`}
                        >
                          {label}
                        </span>
                      </Link>
                    </Button>
                  )
                }

                return (
                  <Button
                    className={`mb-2 flex w-full items-center justify-start rounded-lg font-semibold`}
                    variant="outline"
                    asChild
                  >
                    <Link
                      key={label}
                      href={href as string}
                      className={`flex w-auto items-center space-x-2 duration-300 group-hover:hover:bg-[#00DCB3]/20 `}
                      onClick={() => dispatch(setDrawerOpened(false))}
                    >
                      {<Icon className="text-2xl" />}
                      <span className={`text-sm duration-300 `}>{label}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>
            <div className="bottom-2 left-0 w-full">
              <Separator className={`my-2`} />
              <div className="flex w-full flex-col items-center space-y-2 py-2">
                <Button
                  className="flex w-full items-center justify-start rounded-lg p-2  font-semibold"
                  variant="outline"
                  asChild
                >
                  <Link
                    href={'/auth/user-profile'}
                    className="flex items-center justify-start space-x-2 px-2 group-hover:hover:bg-[#00DCB3]/20"
                  >
                    <FaRegUser className="text-xl" />
                    <span className={`transition-all duration-300 `}>
                      Profile
                    </span>
                  </Link>
                </Button>
                <Button
                  className="flex w-full items-center justify-start rounded-lg p-2  font-semibold"
                  variant="outline"
                  onClick={() => {
                    handleLogout()
                    dispatch(setDrawerOpened(false))
                  }}
                >
                  <FaSignOutAlt className="text-2xl" />
                  <p className={`transition-all duration-300 `}>Logout</p>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </header>
  )
}
