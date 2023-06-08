'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Burger } from '@mantine/core'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from 'next-themes'

import { LoginButton, MobileLoginButton } from './LoginButton'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { useLogoutMutation } from 'app/global-state/features/auth/authApiSlice'
import { AppLogo } from './AppLogo'
import { CurrentUser } from '@lib/types'
import ScrollLink from 'app/components/scroll-link'
import UserButton from 'app/components/UserButton'

const paths = ['about', 'features', 'faqs']

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { data: currentUser } = useGetUserQuery()
  const [logout] = useLogoutMutation()
  const [pos, setPos] = useState<string>('top')
  const [activePath, setActivePath] = useState<string>('')
  const [opened, setOpened] = useState<boolean>(false)
  const title = opened ? 'Close navigation' : 'Open navigation'

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
      className={`top-0 z-10  flex w-full  py-2 sm:px-16 ${
        pos === 'top'
          ? 'absolute bg-slate-100 dark:bg-[#25262B]'
          : 'shadow-b-2xl fixed bg-slate-100 dark:bg-[#25262B]'
      }`}
    >
      <div className="container mx-auto flex w-full items-center justify-between sm:max-w-screen-lg">
        <AppLogo activePath={activePath} setActivePath={setActivePath} />
        {/* Main Navigation */}
        <ul className="hidden list-none items-center justify-end gap-6 sm:flex">
          {paths.map((path, index) => {
            if (activePath === path) {
              return (
                <li key={`${path}-${index}`}>
                  <ScrollLink
                    href={`/#${path}`}
                    className={`cursor-pointer font-poppins text-[16px] font-normal capitalize text-primary-dark-100 dark:text-primary-light-100`}
                    onClick={() => setActivePath(path)}
                    scroll={false}
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
                  </ScrollLink>
                </li>
              )
            } else {
              return (
                <li key={`${path}-${index}`}>
                  <Link
                    href={`/#${path}`}
                    className={`cursor-pointer font-poppins text-[16px] font-normal capitalize text-primary-dark-100 dark:text-primary-light-100`}
                    onClick={() => setActivePath(path)}
                    scroll={false}
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
            }
          })}

          <LoginButton
            currentUser={currentUser as CurrentUser}
            handleLogout={handleLogout}
            setActivePath={setActivePath}
          />
          <li className="m-0 flex list-none ">
            <button
              type="button"
              aria-label="toggle-theme-button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`focus:ring-none flex cursor-pointer list-none  p-1 font-medium focus:border-transparent focus:outline-none md:block lg:mb-0 lg:ml-0 lg:p-1 lg:px-1`}
            >
              {resolvedTheme === 'light' ? (
                <FiSun
                  fontSize={18}
                  className={`${
                    pathname === '/' && pos === 'top'
                      ? 'text-primary-dark-100 dark:text-primary-light-100'
                      : 'text-primary-dark-100 dark:text-primary-light-100'
                  } font-bold `}
                />
              ) : (
                <FiMoon
                  fontSize={18}
                  className={`${
                    pathname === '/' && pos === 'top'
                      ? 'text-primary-dark-100 dark:text-primary-light-100'
                      : 'text-primary-dark-100 dark:text-primary-light-100'
                  } font-bold `}
                />
              )}
              <span hidden>toggle theme</span>
            </button>
          </li>
          <li className="hidden flex-1 items-center md:flex ">
            <Link
              href={'/enquire'}
              className={`rounded-lg bg-[#5E17EB] px-4 py-1 text-lg font-medium text-primary-light-100`}
              onClick={() => setActivePath('enquire')}
            >
              <span
                className={`${
                  pathname === '/enquire'
                    ? 'w-full border-b-2 border-primary-light-100'
                    : 'border-0'
                }`}
              >
                Enquire
              </span>
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation */}
        <div className="flex w-full flex-1 items-center justify-end sm:hidden">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="toggle-theme-button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`focus:ring-none flex cursor-pointer list-none  p-1 font-medium focus:border-transparent focus:outline-none md:block lg:mb-0 lg:ml-0 lg:p-1 lg:px-1`}
            >
              {resolvedTheme === 'light' ? (
                <FiSun
                  fontSize={18}
                  className={`${
                    pathname === '/' && pos === 'top'
                      ? 'text-primary-dark-100 dark:text-primary-light-100'
                      : 'text-primary-dark-100 dark:text-primary-light-100'
                  } font-bold `}
                />
              ) : (
                <FiMoon
                  fontSize={18}
                  className={`${
                    pathname === '/' && pos === 'top'
                      ? 'text-primary-dark-100 dark:text-primary-light-100'
                      : 'text-primary-dark-100 dark:text-primary-light-100'
                  } font-bold `}
                />
              )}
              <span hidden>toggle theme</span>
            </button>
            {currentUser ? (
              <UserButton
                name={currentUser?.name ?? ''}
                email={currentUser?.email ?? ''}
                initials={initials}
              />
            ) : null}
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              title={title}
              color="#00dcb3"
            />
          </div>

          {/* Mobile Menu */}

          <div
            className={`${
              !opened ? 'hidden' : 'flex'
            } sidebar absolute right-0 top-14 mx-4 my-2 w-[240px] rounded-md bg-slate-100 p-6 shadow-md dark:bg-[#25262B]`}
          >
            <ul className="grid w-full list-none grid-cols-1 gap-2 ">
              {paths.map((path, index) => {
                if (activePath === path) {
                  return (
                    <li
                      className="w-full rounded-sm bg-slate-200 px-2 py-1 dark:bg-[#3b3c40]"
                      key={`${path}-${index}`}
                    >
                      <ScrollLink
                        href={`/#${path}`}
                        className={`cursor-pointer bg-slate-200 font-poppins text-[16px] font-normal capitalize text-[#00DCB3] dark:bg-[#3b3c40]`}
                        onClick={() => {
                          setActivePath(path)
                          setOpened(false)
                        }}
                        scroll={false}
                      >
                        <span
                          className={`${
                            activePath === path
                              ? ' w-full border-b-2 border-[#00DCB3]'
                              : 'border-0'
                          }`}
                        >
                          {path}
                        </span>
                      </ScrollLink>
                    </li>
                  )
                }
                return (
                  <li
                    className="w-full rounded-sm bg-slate-200 px-2 py-1 hover:bg-slate-200 dark:bg-[#3b3c40]"
                    key={`${path}-${index}`}
                  >
                    <Link
                      href={`/#${path}`}
                      className={`${
                        pathname === `${path}`
                          ? 'w-full border-b border-[#00DCB3]'
                          : 'border-0'
                      } cursor-pointer  font-poppins text-[16px] font-normal capitalize text-[#00DCB3]`}
                      onClick={() => {
                        setActivePath(path)
                        setOpened(false)
                      }}
                      scroll={false}
                    >
                      {path}
                    </Link>
                  </li>
                )
              })}
              <li className="my-2 w-full cursor-pointer font-poppins text-[16px] font-medium">
                <Link
                  href={'/enquire'}
                  className="w-full rounded-lg bg-[#5E17EB] px-6 py-2 font-medium text-white "
                  onClick={() => {
                    setOpened(false)
                    setActivePath('enquire')
                  }}
                >
                  <span
                    className={`${
                      pathname === '/enquire'
                        ? 'w-full border-b-2 border-primary-light-100'
                        : 'border-0'
                    }`}
                  >
                    Enquire
                  </span>
                </Link>
              </li>

              <MobileLoginButton
                currentUser={currentUser as CurrentUser}
                handleLogout={handleLogout}
                setActivePath={setActivePath}
              />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
