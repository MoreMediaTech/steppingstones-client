import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Burger,
  Drawer,
  Header,
  UnstyledButton,
  Group,
  Menu,
  Divider,
  Collapse,
} from '@mantine/core'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

import { usersApiSlice } from 'features/user/usersApiSlice'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import { useLogoutMutation } from 'features/auth/authApiSlice'
import { NEXT_URL } from '@config/index'
import UserButton from '@components/UserButton'
import { AppLogo } from './AppLogo'



const Navbar = () => {
  const router = useRouter()
  const { data: currentUser } = useGetUserQuery()
  const [logout] = useLogoutMutation()
  const [pos, setPos] = useState<string>('top')
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
    <Header height={80}>
      <div className="mx-auto w-full max-w-screen-xl p-2">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <AppLogo scrollToTop={scrollToTop} />
          <div className="flex items-center justify-center gap-4">
            <nav className="hidden text-sm font-medium lg:flex">
              <ul className="flex items-center space-x-8 text-sm font-medium">
                <li>
                  {router.pathname === '/' ? (
                    <a className="font-semibold text-gray-900" href="#about">
                      About
                    </a>
                  ) : (
                    <Link href={'/#about'}>
                      <a className="font-semibold text-gray-900">About</a>
                    </Link>
                  )}
                </li>
                <li>
                  {router.pathname === '/' ? (
                    <a className="font-semibold text-gray-900" href="#features">
                      Features
                    </a>
                  ) : (
                    <Link href={'/#features'}>
                      <a className="font-semibold text-gray-900">Features</a>
                    </Link>
                  )}
                </li>
                <li>
                  {router.pathname === '/' ? (
                    <a className="font-semibold text-gray-900" href="#faqs">
                      FAQs
                    </a>
                  ) : (
                    <Link href={'/#faqs'}>
                      <a className="font-semibold text-gray-900">FAQs</a>
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
                              <a>Portal</a>
                            </Link>
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            <Link href={'/admin/partner-portal'}>
                              <a>Portal</a>
                            </Link>
                          </Menu.Item>
                        )}
                        <Divider />
                        <Menu.Item>
                          <Link href={'/auth/profile'}>
                            <a>Profile</a>
                          </Link>
                        </Menu.Item>
                        <Divider />
                        <Menu.Item
                          icon={<FaSignOutAlt fontSize={14} />}
                          onClick={() => {
                            handleLogout()
                          }}
                        >
                          <span className="text-gray-900">Logout</span>
                        </Menu.Item>
                      </Menu>
                    </Group>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href={'/auth/login'}>
                        <a className="flex items-center gap-1 font-semibold text-gray-900">
                          <FaSignInAlt fontSize={14} />
                          <span>Login</span>
                        </a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            <div className="hidden flex-1 items-center justify-end space-x-4 lg:flex">
              <Link href={'/enquire'}>
                <a className="rounded-lg bg-blue-600 px-5 py-2 text-lg font-medium text-white">
                  Enquire
                </a>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              title={title}
              color="#00dcb3"
            />
            <Drawer
              opened={opened}
              title={
                <div>
                  <AppLogo scrollToTop={scrollToTop} />
                </div>
              }
              onClose={() => setOpened(false)}
              padding="xl"
              size="lg"
              position="right"
            >
              <div className="flex flex-col gap-4 space-y-8 p-8">
                <nav className="flex flex-col space-y-8 text-sm font-medium">
                  <ul className="flex flex-col space-y-8 text-sm font-medium">
                    <li>
                      {router.pathname === '/' ? (
                        <a
                          className="text-2xl font-semibold text-gray-900"
                          href="#about"
                        >
                          About
                        </a>
                      ) : (
                        <Link href={'/#about'}>
                          <a className="text-2xl font-semibold text-gray-900">
                            About
                          </a>
                        </Link>
                      )}
                    </li>
                    <li>
                      {router.pathname === '/' ? (
                        <a
                          className="text-2xl font-semibold text-gray-900"
                          href="#features"
                        >
                          Features
                        </a>
                      ) : (
                        <Link href={'/#features'}>
                          <a className="text-2xl font-semibold text-gray-900">
                            Features
                          </a>
                        </Link>
                      )}
                    </li>
                    <li>
                      {router.pathname === '/' ? (
                        <a
                          className="text-2xl font-semibold text-gray-900"
                          href="#faqs"
                        >
                          FAQs
                        </a>
                      ) : (
                        <Link href={'/#faqs'}>
                          <a className="text-2xl font-semibold text-gray-900">
                            FAQs
                          </a>
                        </Link>
                      )}
                    </li>

                    {currentUser ? (
                      <li>
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
                                    <a>Portal</a>
                                  </Link>
                                </Menu.Item>
                              ) : (
                                <Menu.Item>
                                  <Link href={'/admin/partner-portal'}>
                                    <a>Portal</a>
                                  </Link>
                                </Menu.Item>
                              )}
                              <Divider />
                              <Menu.Item>
                                <Link href={'/auth/profile'}>
                                  <a>Profile</a>
                                </Link>
                              </Menu.Item>
                              <Divider />
                              <Menu.Item
                                icon={<FaSignOutAlt fontSize={14} />}
                                onClick={() => {
                                  handleLogout()
                                }}
                              >
                                <span className="text-gray-900">Logout</span>
                              </Menu.Item>
                            </Menu>
                          </Collapse>
                        </Group>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link href={'/auth/login'}>
                            <a className="flex items-center gap-1 text-2xl font-semibold text-gray-900">
                              <FaSignInAlt fontSize={14} />
                              <span>Login</span>
                            </a>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>

                <div className="flex-1 items-center justify-end space-x-4 lg:flex">
                  <Link href={'/enquire'}>
                    <a className="rounded-lg bg-blue-600 px-5 py-2 text-lg font-medium text-white">
                      Enquire
                    </a>
                  </Link>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </Header>
  )
}

export default Navbar
