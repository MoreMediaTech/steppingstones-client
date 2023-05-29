import React from 'react'
import { Group, Menu, Divider, Collapse } from '@mantine/core'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdBusiness } from 'react-icons/md'
import { FaRegUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import UserButton from '@components/UserButton'
import { CurrentUser } from '@lib/types'

export function LoginButton({
  currentUser,
  handleLogout,
  setActivePath
}: {
  currentUser: CurrentUser
  handleLogout(): void
  setActivePath: React.Dispatch<React.SetStateAction<string>>
}) {
  const pathname = usePathname()
  const initials = currentUser?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')
  return (
    <>
      {currentUser ? (
        <li>
          <Group position="center">
            <Menu withArrow position="bottom" shadow="md" width={150}>
              <Menu.Target>
                <UserButton
                  name={currentUser?.name ?? ''}
                  email={currentUser?.email ?? ''}
                  initials={initials}
                  show
                />
              </Menu.Target>
              {/* ...menu items */}
              <Menu.Dropdown>
                <Menu.Label>
                  <span className="item-center flex justify-center text-primary-dark-100 "></span>
                </Menu.Label>
                  <Menu.Item
                    icon={<MdBusiness fontSize={14} color="#5E17EB" />}
                  >
                    <Link
                      className="text-primary-dark-100 "
                      href={'/admin-portal'}
                    >
                      Portal
                    </Link>
                  </Menu.Item>
               
                <Divider />
                <Menu.Item icon={<FaRegUser fontSize={14} color="#5E17EB" />}>
                  <Link
                    className="text-primary-dark-100 "
                    href={'/auth/user-profile'}
                  >
                    Profile
                  </Link>
                </Menu.Item>
                <Divider />
                <Menu.Item
                  icon={<FaSignOutAlt fontSize={14} color="#5E17EB" />}
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  <span className="text-primary-dark-100 ">Logout</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </li>
      ) : (
        <li className={` cursor-pointer font-poppins text-[16px] font-normal `}>
          <Link
            href={'/auth/login'}
            className={`flex items-center gap-1 text-primary-dark-100 dark:text-primary-light-100`}
            onClick={() => setActivePath('/auth/login')}
          >
            <FaSignInAlt fontSize={18} />
            <span>Login</span>
          </Link>
        </li>
      )}
    </>
  )
}

export function MobileLoginButton({
  currentUser,
  handleLogout,
  setActivePath
}: {
  currentUser: CurrentUser
  handleLogout(): void
  setActivePath: React.Dispatch<React.SetStateAction<string>>
}) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const initials = currentUser?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')
  return (
    <>
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
                  <Menu.Item>
                    <Link
                      href={'/admin-portal'}
                      className="text-[#5E17EB]"
                    >
                      Portal
                    </Link>
                  </Menu.Item>
                <Divider />
                <Menu.Item>
                  <Link href={'/auth/user-profile'} className="text-[#5E17EB]">
                    Profile
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
          <Link
            href={'/auth/login'}
            className="flex items-center gap-1 text-[#5E17EB]"
            onClick={() => setActivePath('/auth/login')}
          >
            <FaSignInAlt fontSize={20} />
            <span>Login</span>
          </Link>
        </li>
      )}
    </>
  )
}
