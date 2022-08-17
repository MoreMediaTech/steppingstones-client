import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Burger, Drawer, Group, Menu, Divider, Collapse } from '@mantine/core'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

import { useGetUserQuery } from 'features/user/usersApiSlice'
import { useLogoutMutation } from 'features/auth/authApiSlice'
import { NEXT_URL } from '@config/index'
import UserButton from '@components/UserButton'
import { AppLogo } from './AppLogo'
import styles from 'constants/styles'

const Navbar = () => {
  const router = useRouter()
  const { data: currentUser } = useGetUserQuery()
  const [logout] = useLogoutMutation()
  const [pos, setPos] = useState<string>('top')
  const [active, setActive] = useState<string>('about')
  const [opened, setOpened] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
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

  const scrollToTop = () => {
    if (router.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.location.hash = ''
    }
    router.push('/')
  }

  const handleLogout = async () => {
    await logout().unwrap()
    localStorage.removeItem('token')
    router.replace(`${NEXT_URL}`)
  }

  const initials = currentUser?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  return (
    <nav
      className={`top-0 z-10  flex w-full px-2 py-2 sm:px-16 ${
        pos === 'top'
          ? 'absolute bg-slate-50'
          : 'shadow-b-2xl fixed bg-slate-50'
      }`}
    >
      <div className="container mx-auto flex max-w-screen-xl items-center">
        <AppLogo scrollToTop={scrollToTop} />
        <ul className="hidden list-none items-center justify-end gap-6 sm:flex">
          <li>
            {router.pathname === '/' ? (
              <a
                className={` cursor-pointer font-poppins text-[16px] font-normal text-primary`}
                onClick={() => setActive('#about')}
                href="#about"
              >
                About
              </a>
            ) : (
              <Link href={'/#about'}>
                <a
                  className={` cursor-pointer font-poppins text-[16px] font-normal text-primary`}
                  onClick={() => setActive('#about')}
                >
                  About
                </a>
              </Link>
            )}
          </li>
          <li>
            {router.pathname === '/' ? (
              <a
                className={` cursor-pointer font-poppins text-[16px] font-normal text-primary`}
                onClick={() => setActive('#features')}
                href="#features"
              >
                Features
              </a>
            ) : (
              <Link href={'/#features'}>
                <a
                  className={` cursor-pointer font-poppins text-[16px] font-normal text-primary`}
                  onClick={() => setActive(router.pathname)}
                >
                  Features
                </a>
              </Link>
            )}
          </li>
          <li>
            {router.pathname === '/' ? (
              <a
                className={` cursor-pointer font-poppins text-[16px] font-normal text-primary`}
                onClick={() => setActive('#faqs')}
                href="#faqs"
              >
                FAQs
              </a>
            ) : (
              <Link href={'/#faqs'}>
                <a
                  className={` cursor-pointer font-poppins text-[16px] font-normal text-primary`}
                  onClick={() => setActive('#faqs')}
                >
                  FAQs
                </a>
              </Link>
            )}
          </li>

          {currentUser ? (
            <li>
              <Group position="center">
                <Menu
                  withArrow
                  placement="center"
                  control={
                    <UserButton
                      name={currentUser?.name ?? ''}
                      email={currentUser?.email ?? ''}
                      initials={initials}
                      show
                    />
                  }
                >
                  {/* ...menu items */}
                  <Menu.Label>Application</Menu.Label>
                  {currentUser.role !== 'PARTNER' ? (
                    <Menu.Item>
                      <Link href={'/admin/editor-portal'}>
                        <a className="text-[#5E17EB]">Portal</a>
                      </Link>
                    </Menu.Item>
                  ) : (
                    <Menu.Item>
                      <Link href={'/admin/partner-portal'}>
                        <a className="text-[#5E17EB]">Portal</a>
                      </Link>
                    </Menu.Item>
                  )}
                  <Divider />
                  <Link href={'/auth/profile'}>
                    <Menu.Item>
                      <a className="text-[#5E17EB]">Profile</a>
                    </Menu.Item>
                  </Link>
                  <Divider />
                  <Menu.Item
                    icon={<FaSignOutAlt fontSize={14} color="#5E17EB" />}
                    onClick={() => {
                      handleLogout()
                    }}
                  >
                    <span className="text-[#5E17EB]">Logout</span>
                  </Menu.Item>
                </Menu>
              </Group>
            </li>
          ) : (
            <li
              className={` cursor-pointer font-poppins text-[16px] font-normal `}
              onClick={() => setActive('login')}
            >
              <Link href={'/auth/login'}>
                <a className={`flex items-center gap-1 text-primary`}>
                  <FaSignInAlt fontSize={18} />
                  <span>Login</span>
                </a>
              </Link>
            </li>
          )}
          <li className="hidden flex-1 items-center sm:flex ">
            <Link href={'/enquire'}>
              <a
                className={`rounded-lg bg-[#5E17EB] px-4 py-1 text-lg font-medium text-dimWhite
                `}
                onClick={() => setActive('enquire')}
              >
                Enquire
              </a>
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
            } sidebar absolute top-14 right-0 mx-4 my-2 min-w-[140px] rounded-md bg-slate-50 p-6 shadow-md`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end space-y-2">
              <li>
                {router.pathname === '/' ? (
                  <a
                    className="mb-4 cursor-pointer font-poppins text-[16px] font-medium text-[#5E17EB]"
                    href="#about"
                  >
                    About
                  </a>
                ) : (
                  <Link href={'/#about'}>
                    <a className="mb-4 cursor-pointer font-poppins text-[16px] font-medium text-[#5E17EB]">
                      About
                    </a>
                  </Link>
                )}
              </li>
              <li>
                {router.pathname === '/' ? (
                  <a
                    className="mb-4 cursor-pointer font-poppins text-[16px] font-medium text-[#5E17EB]"
                    href="#features"
                  >
                    Features
                  </a>
                ) : (
                  <Link href={'/#features'}>
                    <a className="mb-4 cursor-pointer font-poppins text-[16px] font-medium text-[#5E17EB]">
                      Features
                    </a>
                  </Link>
                )}
              </li>
              <li>
                {router.pathname === '/' ? (
                  <a
                    className="mb-4 cursor-pointer font-poppins text-[16px] font-medium text-[#5E17EB]"
                    href="#faqs"
                  >
                    FAQs
                  </a>
                ) : (
                  <Link href={'/#faqs'}>
                    <a className="mb-4 cursor-pointer font-poppins text-[16px] font-medium text-[#5E17EB]">
                      FAQs
                    </a>
                  </Link>
                )}
              </li>

              {currentUser ? (
                <li className="mb-4 cursor-pointer font-poppins text-[16px] font-medium">
                  <Group position="center">
                    <UserButton
                      name={currentUser?.name ?? ''}
                      email={currentUser.email ?? ''}
                      initials={initials}
                      onClick={() => setIsOpen((o) => !o)}
                    />
                    <Collapse in={isOpen}>
                      <Menu>
                        <Menu.Label>Application</Menu.Label>
                        {currentUser.role !== 'PARTNER' ? (
                          <Menu.Item>
                            <Link href={'/admin/editor-portal'}>
                              <a className="text-[#5E17EB]">Portal</a>
                            </Link>
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            <Link href={'/admin/partner-portal'}>
                              <a className="text-[#5E17EB]">Portal</a>
                            </Link>
                          </Menu.Item>
                        )}
                        <Divider />
                        <Menu.Item>
                          <Link href={'/auth/profile'}>
                            <a className="text-[#5E17EB]">Profile</a>
                          </Link>
                        </Menu.Item>
                        <Divider />
                        <Menu.Item
                          icon={<FaSignOutAlt fontSize={14} />}
                          onClick={() => {
                            handleLogout()
                          }}
                        >
                          <span className="text-[#5E17EB]">Logout</span>
                        </Menu.Item>
                      </Menu>
                    </Collapse>
                  </Group>
                </li>
              ) : (
                <li className="mb-4 cursor-pointer font-poppins text-[16px] font-medium">
                  <Link href={'/auth/login'}>
                    <a className="flex items-center gap-1 text-[#5E17EB]">
                      <FaSignInAlt fontSize={20} />
                      <span>Login</span>
                    </a>
                  </Link>
                </li>
              )}
              <li className="mb-0 cursor-pointer font-poppins text-[16px] font-medium">
                <Link href={'/enquire'}>
                  <a className="rounded-lg bg-[#5E17EB] px-6 py-2  font-medium text-white">
                    Enquire
                  </a>
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
