import React from 'react'
import { Group, Menu, Divider, Collapse } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdBusiness } from 'react-icons/md'
import { FaRegUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import UserButton from 'app/components/UserButton'
import { UserSchemaWithIdAndOrganisationType } from '@models/User'


export function LoginButton({
  currentUser,
  handleLogout,
  setActivePath,
}: {
  currentUser: UserSchemaWithIdAndOrganisationType
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
                  <span className="item-center flex justify-center text-[#00DCB3] "></span>
                </Menu.Label>
                <Menu.Item icon={<MdBusiness fontSize={14} color="#00DCB3" />}>
                  <Link className="text-[#00DCB3] " href={'/admin-portal'}>
                    Portal
                  </Link>
                </Menu.Item>

                <Divider />
                <Menu.Item icon={<FaRegUser fontSize={14} color="#00DCB3" />}>
                  <Link className="text-[#00DCB3] " href={'/auth/user-profile'}>
                    Profile
                  </Link>
                </Menu.Item>
                <Divider />
                <Menu.Item
                  icon={<FaSignOutAlt fontSize={14} color="#00DCB3" />}
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  <span className="text-[#00DCB3] ">Logout</span>
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
  setActivePath,
}: {
  currentUser: UserSchemaWithIdAndOrganisationType
  handleLogout(): void
  setActivePath: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <>
      {currentUser ? (
        <li className="mb-4 w-full cursor-pointer font-montserrat text-[16px] font-medium">
          <Group position="left">
            <Menu width={150}>
              <div className="grid w-full">
                <Menu.Label>
                  <span className="text-[16px] text-[#557e77]">Admin</span>
                </Menu.Label>
                <Divider my="sm" />
                <Menu.Item icon={<MdBusiness fontSize={14} color="#00DCB3" />}>
                  <Link className="text-[#00DCB3] " href={'/admin-portal'}>
                    Portal
                  </Link>
                </Menu.Item>

                <Menu.Label>
                  <span className="text-[16px] text-[#557e77]">Settings</span>
                </Menu.Label>
                <Divider my="sm" />
                <Menu.Item icon={<FaRegUser fontSize={14} color="#00DCB3" />}>
                  <Link className="text-[#00DCB3] " href={'/auth/user-profile'}>
                    Profile
                  </Link>
                </Menu.Item>
                <Divider my="sm" />
                <Menu.Item
                  icon={<FaSignOutAlt fontSize={14} color="#00DCB3" />}
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  <span className="text-[#00DCB3] ">Logout</span>
                </Menu.Item>
              </div>
            </Menu>
          </Group>
        </li>
      ) : (
        <li className="mb-4 cursor-pointer rounded-sm bg-slate-200 px-2 py-1 font-montserrat text-[16px] font-medium dark:bg-[#3b3c40]">
          <Link
            href={'/auth/login'}
            className="flex items-center gap-1 text-[#00DCB3]"
            onClick={() => setActivePath('/auth/login')}
          >
            <FaSignInAlt fontSize={20} />
            <span className="text-base">Login</span>
          </Link>
        </li>
      )}
    </>
  )
}
