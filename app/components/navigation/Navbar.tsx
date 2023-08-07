'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from 'next-themes'
import { GiHamburgerMenu } from 'react-icons/gi'

import { LoginButton, MobileLoginButton } from './LoginButton'
import { useGetUserQuery } from '@global-state/features/user/usersApiSlice'
import { AppLogo } from './AppLogo'

import { UserSchemaWithIdAndOrganisationType } from '@models/User'
import { Button } from '@components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@components/ui/navigation-menu'
import { Avatar, AvatarFallback } from '@components/ui/avatar'
import Banner from '@components/Banner'

const paths = ['features', 'faqs']

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { data: currentUser } = useGetUserQuery()
  const [pos, setPos] = useState<string>('top')
  const [activePath, setActivePath] = useState<string>('')

  const initials = currentUser?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  useEffect(() => {
    const handleScrollTop = () => {
      const scrolled = document.scrollingElement?.scrollTop ?? 5
      if (scrolled >= 5) {
        setPos('moved')
      } else {
        setPos('top')
      }
    }
    document.addEventListener('scroll', handleScrollTop)
    return () => document.removeEventListener('scroll', handleScrollTop)
  }, [])

  const handleLogout = useCallback(async () => {
    router.push('/auth/logout')
  }, [])

  return (
    <nav
      className={`top-0 z-10  flex w-full flex-col ${
        pos === 'top'
          ? 'absolute bg-transparent shadow-none'
          : 'shadow-b-2xl fixed bg-background'
      }`}
    >
      <Banner />
      <div className="container mx-auto flex w-full items-center justify-between py-4 sm:max-w-screen-xl">
        <AppLogo pathname={pathname} />
        {/* Main Navigation */}
        <ul className="hidden list-none items-center justify-end gap-6 md:flex">
          <li className="hidden flex-1 items-center md:flex ">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`cursor-pointer bg-transparent font-poppins text-[16px] font-normal capitalize ${
                      pos === 'top' && pathname === '/' ? 'text-textLight' : ' '
                    }`}
                  >
                    <span>About</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className=" bg-background ">
                    <ul className="grid w-[220px] gap-3 p-4  ">
                      <li className="w-full rounded p-2 hover:bg-primary-dark-200/50">
                        <NavigationMenuLink
                          className="flex w-full items-center gap-2 px-2"
                          href={'/about'}
                        >
                          <span className="text-sm">About Stepping Stones</span>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </li>
          {paths.map((path, index) => {
            return (
              <li key={`${path}-${index}`}>
                <Link
                  href={pathname === '/' ? `/#${path}` : '/'}
                  className={`cursor-pointer font-poppins text-[16px] font-normal capitalize ${
                    pos === 'top' && pathname === '/' ? 'text-textLight' : ' '
                  }`}
                  scroll
                >
                  <span
                    className={`${
                      activePath === path
                        ? 'w-full border-b-2 border-primary-dark-100 pb-1 dark:border-primary-light-100'
                        : 'border-0'
                    }`}
                  >
                    {path}
                  </span>
                </Link>
              </li>
            )
          })}

          <LoginButton
            pos={pos}
            currentUser={currentUser as UserSchemaWithIdAndOrganisationType}
            handleLogout={handleLogout}
            setActivePath={setActivePath}
          />
          <li className="m-0 flex list-none ">
            <button
              type="button"
              aria-label="toggle-theme-button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`focus:ring-none flex cursor-pointer list-none  p-1 font-medium focus:border-transparent focus:outline-none md:block lg:mb-0 lg:ml-0 lg:p-1 lg:px-1 ${
                pos === 'top' && pathname === '/' ? 'text-textLight' : ' '
              }`}
            >
              {resolvedTheme === 'light' ? (
                <FiSun fontSize={20} />
              ) : (
                <FiMoon fontSize={20} />
              )}
              <span hidden>toggle theme</span>
            </button>
          </li>
          <li className="hidden flex-1 items-center md:flex ">
            <Button variant="outline" asChild>
              <Link
                href={'/enquire'}
                className={`rounded-lg  px-4 py-1 text-lg font-medium  ${
                  pos === 'top' && pathname === '/'
                    ? 'border-primary-light-100 text-textLight '
                    : ' border-primary-dark-100 dark:border-primary-light-100 '
                }`}
                onClick={() => setActivePath('enquire')}
              >
                <span>Enquire</span>
              </Link>
            </Button>
          </li>
        </ul>

        {/* Mobile Navigation */}

        <div className="flex w-full flex-1 items-center justify-end md:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="toggle-theme-button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`focus:ring-none flex cursor-pointer list-none  p-1 font-medium focus:border-transparent focus:outline-none md:block lg:mb-0 lg:ml-0 lg:p-1 lg:px-1 ${
                pos === 'top' ? 'text-textLight' : ' '
              }`}
            >
              {resolvedTheme === 'light' ? (
                <FiSun fontSize={20} />
              ) : (
                <FiMoon fontSize={20} />
              )}
              <span hidden>toggle theme</span>
            </button>
            {currentUser ? (
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ) : null}
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger>
                <GiHamburgerMenu
                  fontSize={24}
                  className={`${pos === 'top' ? 'text-textLight' : ' '}`}
                />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <ul className="grid w-full list-none grid-cols-1 gap-2 py-8">
                  {paths.map((path, index) => {
                    return (
                      <li className="w-full " key={`${path}-${index}`}>
                        <SheetTrigger>
                          <Button
                            variant="outline"
                            asChild
                            className="flex items-center justify-start"
                          >
                            <Link
                              href={`/#${path}`}
                              className={`cursor-pointer font-poppins text-[16px] font-normal capitalize `}
                              scroll
                            >
                              <span
                                className={`text-lg ${
                                  activePath === path
                                    ? ' w-full border-b-2 border-primary-dark-100 pb-1 dark:border-primary-light-100'
                                    : 'border-0'
                                }`}
                              >
                                {path}
                              </span>
                            </Link>
                          </Button>
                        </SheetTrigger>
                      </li>
                    )
                  })}
                  <li className="my-2 w-full cursor-pointer font-poppins font-medium">
                    <SheetTrigger>
                      <Button
                        variant="outline"
                        asChild
                        className="flex items-center justify-start"
                      >
                        <Link
                          href={'/enquire'}
                          className="w-full font-medium "
                          onClick={() => {
                            setActivePath('enquire')
                          }}
                        >
                          <span
                            className={`text-lg ${
                              pathname === '/enquire'
                                ? 'w-full border-b-2 border-primary-light-100'
                                : 'border-0'
                            }`}
                          >
                            Enquire
                          </span>
                        </Link>
                      </Button>
                    </SheetTrigger>
                  </li>
                  <li className="my-2 w-full cursor-pointer font-poppins font-medium">
                    <SheetTrigger>
                      <MobileLoginButton
                        currentUser={
                          currentUser as UserSchemaWithIdAndOrganisationType
                        }
                        handleLogout={handleLogout}
                        setActivePath={setActivePath}
                      />
                    </SheetTrigger>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Menu */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
