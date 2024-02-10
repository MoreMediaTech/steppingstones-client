'use client'
import React from 'react'

import { BsArrowLeftShort } from 'react-icons/bs'
import { FaSignOutAlt, FaRegUser } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// redux global state (Model)
import { useAppDispatch, useAppSelector } from '@global-state/hooks'
import { setDrawerOpened, setMobileDrawerOpened } from '@global-state/features/global/globalSlice'
import { globalSelector } from "@global-state/features/global/globalSlice";


// public
import ColorLogo from '@public/SS-Color-logo-with-background.png'
import ColoLogo2 from '@public/SS_Color_logo_with-background2.png'

// components
import { Separator } from '@components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { Button } from '@components/ui/button'
import { ScrollArea } from '@components/ui/scroll-area'

import { NAV_ITEMS } from 'data'

export function AdminSidebar({ height }: { height: number }) {
  const SCROLL_AREA_HEIGHT = height - 70
  const { drawerOpened } = useAppSelector(globalSelector)
  const dispatch = useAppDispatch()
  const router = useRouter()
  let arg: void

  const handleLogout = async () => {
    router.push(`/auth/logout`)
  }


  return (
    <aside className="fixed left-0 top-20 z-50 ">
      <div
        className={`relative flex flex-col items-center  ${
          drawerOpened ? "w-72" : "w-24"
        } hidden h-screen bg-background shadow-xl shadow-green-100/50 transition-all duration-500 ease-in-out md:block`}
      >
        <BsArrowLeftShort
          className={`absolute -right-3 top-28 ml-auto h-6 w-6 cursor-pointer rounded-full bg-accent-light-500 text-white shadow-sm ${
            !drawerOpened ? "rotate-180" : ""
          }`}
          onClick={() => dispatch(setDrawerOpened(!drawerOpened))}
        />
        <ScrollArea
          className={`w-full p-2 py-4`}
          style={{ height: SCROLL_AREA_HEIGHT }}
        >
          <div className="w-full px-2">
            {NAV_ITEMS.map(({ label, Icon, href }) => {
              if (!Icon && !href) {
                return (
                  <div
                    key={label}
                    className={`my-2 w-full  ${
                      drawerOpened ? "px-4" : "text-center"
                    } transition-all duration-300 ease-in-out`}
                  >
                    {drawerOpened ? (
                      <h4 className="font-montserrat font-extrabold text-textDark dark:text-textLight">
                        {label}
                      </h4>
                    ) : (
                      <h6 className="font-montserrat font-extrabold text-textDark dark:text-textLight">
                        {label}
                      </h6>
                    )}
                  </div>
                );
              }

              return (
                <Button
                  key={`${label}-${href}`}
                  className={`flex w-full items-center ${
                    drawerOpened ? "justify-start" : ""
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
                    {
                      <Icon className="text-2xl text-textDark dark:text-textLight" />
                    }
                    <span
                      className={`text-sm duration-300 ${
                        !drawerOpened ? "hidden" : " "
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </Button>
              );
            })}
          </div>
          <div className="bottom-2 left-0 flex w-full flex-col justify-end px-2">
            <Separator className={`my-2 ${drawerOpened ? "w-64" : "w-16"}`} />
            <div className="flex w-full flex-col items-center space-y-2 py-2">
              <Button
                className={`mb-2 flex w-full items-center rounded-lg font-semibold ${
                  drawerOpened ? "justify-start" : ""
                }`}
                variant="outline"
                asChild
              >
                <Link
                  href={"/auth/user-profile"}
                  className="flex items-center justify-start space-x-2 px-2 group-hover:hover:bg-[#00DCB3]/20"
                >
                  <FaRegUser className="text-xl" />
                  <span
                    className={`transition-all duration-300 ${
                      !drawerOpened ? "hidden" : "mt-1 "
                    }`}
                  >
                    Profile
                  </span>
                </Link>
              </Button>
              <Button
                className={`mb-2 flex w-full items-center rounded-lg font-semibold ${
                  drawerOpened ? "justify-start" : ""
                }`}
                variant="outline"
                onClick={() => {
                  handleLogout();
                  dispatch(setDrawerOpened(false));
                }}
              >
                <FaSignOutAlt className="text-2xl" />
                <p
                  className={`transition-all duration-300 ${
                    !drawerOpened ? "hidden" : ""
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
  );
}

export function MobileAdminSidebar({ height }: { height: number }) {
  const SCROLL_AREA_HEIGHT = height - 100
  const dispatch = useAppDispatch()
  const { mobileDrawerOpened } = useAppSelector(globalSelector)
  const router = useRouter()

  const handleLogout = async () => {
    router.push(`/auth/logout`)
  }


  const handleOpenChange = (opened: boolean) => {
    dispatch(setMobileDrawerOpened(opened))
  }

  return (
    
      <Sheet open={mobileDrawerOpened} onOpenChange={handleOpenChange}>
        <SheetTrigger className="navbar-burger flex items-center pt-4 px-2 text-blue-600">
            <svg
              className="block h-6 w-6 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
            <span hidden>Mobile Menu</span>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[240px]">
          <SheetHeader>
            <SheetTitle>
              <div className={`inline-flex items-center gap-2`}>
                <Image
                  src={ColoLogo2}
                  alt="Stepping Stones logo"
                  width={140}
                  height={40}
                  sizes="(max-width: 640px) 40vw, 20vw"
                  className=""
                />
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
                    <div key={label} className="my-2 w-full text-left px-4">
                     <h4 className="text-textDark font-extrabold font-montserrat dark:text-textLight">{label}</h4>
                    </div>
                  );
                }

                return (
                  <Button
                    key={`${label}-${href}`}
                    className={`mb-2 flex w-full items-center justify-start rounded-lg font-semibold`}
                    variant="outline"
                    asChild
                  >
                    <Link
                      key={label}
                      href={href as string}
                      className={`flex w-auto items-center space-x-2 duration-300 group-hover:hover:bg-[#00DCB3]/20 `}
                      onClick={() => dispatch(setMobileDrawerOpened(false))}
                    >
                      {
                        <Icon className="text-2xl text-textDark dark:text-textLight" />
                      }
                      <span className={`text-sm duration-300 `}>{label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
            <div className="bottom-2 left-0 w-full">
              <Separator className={`my-2`} />
              <div className="flex w-full flex-col items-center space-y-2 py-2">
                <Button
                  className="flex w-full items-center justify-start rounded-lg p-2 px-4  font-semibold"
                  variant="outline"
                  asChild
                >
                  <Link
                    href={"/auth/user-profile"}
                    className="flex items-center justify-start space-x-2 group-hover:hover:bg-[#00DCB3]/20"
                  >
                    <FaRegUser className="text-xl" />
                    <span className={`transition-all duration-300 `}>
                      Profile
                    </span>
                  </Link>
                </Button>
                <Button
                  className="flex w-full items-center justify-start rounded-lg p-2 px-4 space-x-2  font-semibold"
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    dispatch(setMobileDrawerOpened(false));
                  }}
                >
                  <FaSignOutAlt className="text-2xl" />
                  <p className={`transition-all duration-300 text-sm `}>Logout</p>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
  );
}
