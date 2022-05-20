import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Burger,
  Drawer,
  Header,
  Button,
  UnstyledButton,
  Group,
  Menu,
  Divider,
  Collapse,
} from '@mantine/core'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/hooks'
import { authSelector, logout, reset } from 'features/auth/authSlice'
import { NEXT_URL } from '@config/index'
import UserButton from '@components/UserButton'

const AppLogo = ({ scrollToTop }: { scrollToTop: () => void }) => (
  <UnstyledButton
    className="flex cursor-pointer items-center gap-2 lg:w-0 lg:flex-1"
    onClick={scrollToTop}
  >
    <Group>
      <div className="w-50 h-50 -mb-4">
        <Image src={'/SteppingStonesLogo2.png'} width={80} height={80} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold uppercase text-indigo-900 sm:text-2xl">
          Stepping Stones
        </h1>
        <h3 className="text-xs capitalize text-sky-500">
          Business resource solutions
        </h3>
      </div>
    </Group>
  </UnstyledButton>
)

const Navbar = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentUser } = useSelector(authSelector)
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

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
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
                  <a className="font-semibold text-gray-900" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="font-semibold text-gray-900" href="#features">
                    Features
                  </a>
                </li>
                <li>
                  <a className="font-semibold text-gray-900" href="#faqs">
                    FAQs
                  </a>
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
                            <Link href={'/admin/dashboard'}>
                              <a>Dashboard</a>
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
                    <li>
                      <Link href={'/auth/register'}>
                        <a className="flex items-center gap-1 font-semibold text-gray-900">
                          <FaUser fontSize={12} />
                          <span>Register</span>
                        </a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            <div className="hidden flex-1 items-center justify-end space-x-4 lg:flex">
              <a
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
                href="#"
              >
                Enquire
              </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              title={title}
            />
            <Drawer
              opened={opened}
              onClose={() => setOpened(false)}
              padding="xl"
              size="lg"
              position="right"
            >
              <div>
                <AppLogo scrollToTop={scrollToTop} />
              </div>
              <div className="flex flex-col gap-4 space-y-8 p-8">
                <nav className="flex flex-col space-y-8 text-sm font-medium">
                  <ul className="flex flex-col space-y-8 text-sm font-medium">
                    <li>
                      <a
                        className="text-2xl font-semibold text-gray-900"
                        href="#about"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-2xl font-semibold text-gray-900"
                        href="#features"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-2xl font-semibold text-gray-900"
                        href="#faqs"
                      >
                        FAQs
                      </a>
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
                            <Menu.Label>Application</Menu.Label>
                            {currentUser.role !== 'PARTNER' ? (
                              <Menu.Item>
                                <Link href={'/admin/dashboard'}>
                                  <a>Dashboard</a>
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
                        <li>
                          <Link href={'/auth/register'}>
                            <a className="flex items-center gap-1 text-2xl font-semibold text-gray-900">
                              <FaUser fontSize={12} />
                              <span>Register</span>
                            </a>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>

                <div className="flex-1 items-center justify-end space-x-4 lg:flex">
                  <a
                    className="rounded-lg bg-blue-600 px-5 py-2 text-lg font-medium text-white"
                    href="#"
                  >
                    Enquire
                  </a>
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
