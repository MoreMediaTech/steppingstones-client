'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname, redirect } from 'next/navigation'
import { Burger } from '@mantine/core'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

import { LoginButton, MobileLoginButton } from './LoginButton'
import { useGetUserQuery } from 'app/global-state/features/user/usersApiSlice'
import { useLogoutMutation } from 'app/global-state/features/auth/authApiSlice'
import { AppLogo } from './AppLogo'
import { CurrentUser } from '@lib/types'
import ScrollLink from '@components/scroll-link'

const paths = ['about', 'features', 'faqs']

const Navbar = () => {
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { data: currentUser } = useGetUserQuery()
  const [logout] = useLogoutMutation()
  const [pos, setPos] = useState<string>('top')
  const [activePath, setActivePath] = useState<string>('')
  console.log("🚀 ~ file: Navbar.tsx:26 ~ Navbar ~ activePath:", activePath)
  const [opened, setOpened] = useState<boolean>(false)
  const title = opened ? 'Close navigation' : 'Open navigation'

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
    await logout().unwrap()
    localStorage.removeItem('token')
    redirect('/')
  }, [])

  return (
    <nav
      className={`top-0 z-10  flex w-full px-2 py-2 sm:px-16 ${
        pos === 'top'
          ? 'absolute bg-slate-100 dark:bg-slate-900'
          : 'shadow-b-2xl fixed bg-slate-100 dark:bg-slate-900'
      }`}
    >
      <div className="container mx-auto flex max-w-screen-md items-center justify-between">
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
        <div className="flex flex-1 items-center justify-end sm:hidden">
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            title={title}
            color="#00dcb3"
          />

          <div
            className={`${
              !opened ? 'hidden' : 'flex'
            } sidebar absolute right-0 top-14 mx-4 my-2 min-w-[140px] rounded-md bg-slate-50 p-6 shadow-md`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end space-y-2">
              {paths.map((path, index) => {
                if (activePath === path) {
                  return (
                    <li key={`${path}-${index}`}>
                      <ScrollLink
                        href={`/#${path}`}
                        className={`cursor-pointer font-poppins text-[16px] font-normal capitalize text-primary-dark-100 dark:text-primary-light-100`}
                        onClick={() => {
                          setActivePath(path)
                          setOpened(false)
                        }}
                      >
                        <span
                          className={`${
                            activePath === path
                              ? 'dark: w-full border-b-2 border-primary-dark-100 pb-1 dark:border-primary-light-100'
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
                  <li key={`${path}-${index}`}>
                    <Link
                      href={`/#${path}`}
                      className={`${
                        pathname === `${path}`
                          ? 'w-full border-b border-primary-dark-100 dark:border-primary-light-100'
                          : 'border-0'
                      } cursor-pointer font-poppins text-[16px] font-normal capitalize text-primary-dark-100 dark:text-primary-light-100`}
                      onClick={() => {
                        setActivePath(path)
                        setOpened(false)
                      }}
                    >
                      {path}
                    </Link>
                  </li>
                )
              })}

              <MobileLoginButton
                currentUser={currentUser as CurrentUser}
                handleLogout={handleLogout}
                setActivePath={setActivePath}
              />

              <li className="mb-0 cursor-pointer font-poppins text-[16px] font-medium">
                <Link
                  href={'/enquire'}
                  className="rounded-lg bg-[#5E17EB] px-6 py-2  font-medium text-white"
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
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
