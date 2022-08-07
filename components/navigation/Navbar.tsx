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
    <header
      className={`top-0 z-10 flex w-full flex-wrap items-center justify-between  ${
        pos === 'top'
          ? 'absolute bg-slate-50'
          : 'shadow-b-2xl fixed bg-slate-50'
      }`}
    >
      <div className="mx-auto w-full max-w-screen-xl p-2">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <AppLogo scrollToTop={scrollToTop} />
          <div className="flex items-center justify-center gap-4">
            <nav className="hidden text-sm font-medium lg:flex">
              <ul className="flex items-center space-x-8 text-sm font-medium">
                <li>
                  {router.pathname === '/' ? (
                    <a
                      className="text-lg font-semibold text-[#5E17EB]"
                      href="#about"
                    >
                      About
                    </a>
                  ) : (
                    <Link href={'/#about'}>
                      <a className="text-lg font-semibold text-[#5E17EB]">
                        About
                      </a>
                    </Link>
                  )}
                </li>
                <li>
                  {router.pathname === '/' ? (
                    <a
                      className="text-lg font-semibold text-[#5E17EB]"
                      href="#features"
                    >
                      Features
                    </a>
                  ) : (
                    <Link href={'/#features'}>
                      <a className="text-lg font-semibold text-[#5E17EB]">
                        Features
                      </a>
                    </Link>
                  )}
                </li>
                <li>
                  {router.pathname === '/' ? (
                    <a
                      className="text-lg font-semibold text-[#5E17EB]"
                      href="#faqs"
                    >
                      FAQs
                    </a>
                  ) : (
                    <Link href={'/#faqs'}>
                      <a className="text-lg font-semibold text-[#5E17EB]">
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
                        <Link href={'/auth/profile'}>
                          <Menu.Item>
                            <a>Profile</a>
                          </Menu.Item>
                        </Link>
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
                    </Group>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href={'/auth/login'}>
                        <a className="flex items-center gap-1 text-lg font-semibold text-[#5E17EB]">
                          <FaSignInAlt fontSize={18} />
                          <span>Login</span>
                        </a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            <div className="hidden flex-1 items-center justify-end md:flex">
              <Link href={'/enquire'}>
                <a className="rounded-lg bg-[#5E17EB] px-4 py-1 text-lg font-medium text-white">
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
              <div className="flex flex-col gap-4 space-y-8 py-4 px-2">
                <nav className="flex flex-col space-y-8 text-sm font-medium">
                  <ul className="flex flex-col space-y-12 text-sm font-medium">
                    <li>
                      {router.pathname === '/' ? (
                        <a
                          className="text-2xl font-semibold text-[#5E17EB]"
                          href="#about"
                        >
                          About
                        </a>
                      ) : (
                        <Link href={'/#about'}>
                          <a className="text-2xl font-semibold text-[#5E17EB]">
                            About
                          </a>
                        </Link>
                      )}
                    </li>
                    <li>
                      {router.pathname === '/' ? (
                        <a
                          className="text-2xl font-semibold text-[#5E17EB]"
                          href="#features"
                        >
                          Features
                        </a>
                      ) : (
                        <Link href={'/#features'}>
                          <a className="text-2xl font-semibold text-[#5E17EB]">
                            Features
                          </a>
                        </Link>
                      )}
                    </li>
                    <li>
                      {router.pathname === '/' ? (
                        <a
                          className="text-2xl font-semibold text-[#5E17EB]"
                          href="#faqs"
                        >
                          FAQs
                        </a>
                      ) : (
                        <Link href={'/#faqs'}>
                          <a className="text-2xl font-semibold text-[#5E17EB]">
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
                                <span className="text-[#5E17EB]">Logout</span>
                              </Menu.Item>
                            </Menu>
                          </Collapse>
                        </Group>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link href={'/auth/login'}>
                            <a className="flex items-center gap-1 text-2xl font-semibold text-[#5E17EB]">
                              <FaSignInAlt fontSize={24} />
                              <span>Login</span>
                            </a>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>

                <div className="flex-1 items-center justify-end lg:flex">
                  <Link href={'/enquire'}>
                    <a className="rounded-lg bg-[#5E17EB] px-6 py-4 text-xl font-medium text-white">
                      Enquire
                    </a>
                  </Link>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
