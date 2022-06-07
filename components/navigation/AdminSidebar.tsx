import { useState } from 'react'
import { UnstyledButton, Divider, Navbar, Burger, Drawer } from '@mantine/core'
import { BiHomeCircle } from 'react-icons/bi'
import { FaRegEnvelope, FaUsers, FaBriefcase, FaPowerOff } from 'react-icons/fa'
import UserButton from '@components/UserButton'
import { useGetUserQuery } from 'features/user/usersApiSlice'
import Link from 'next/link'
import Image from 'next/image'

const AdminSidebar = ({
  show,
  handleLogout,
}: {
  show?: boolean
  handleLogout?: () => void
}) => {
  const { data: currentUser } = useGetUserQuery()
  const [opened, setOpened] = useState(false)
  const title = opened ? 'Close navigation' : 'Open navigation'
  const initials = currentUser?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  const hideNavbar = show ? 'sm' : 'xl'
  return (
    <header className="relative">
      <div className='sm:gap-1" items-left mb-2 flex w-screen gap-4 p-2 md:hidden '>
        <Burger
          opened={opened}
          aria-label={title}
          onClick={() => setOpened((o) => !o)}
          title={title}
          color="#00dcb3"
        />
      </div>
      <div className="hidden md:block">
        <Navbar p="sm" width={{ base: 100 }}>
          <Navbar.Section mt="xs">
            <Link href={'/'}>
              <a>
                <Image
                  src={'/android-chrome-512x512.png'}
                  width={70}
                  height={70}
                />
              </a>
            </Link>
          </Navbar.Section>
          <Navbar.Section grow>
            <Link href={'/admin/editor-portal'}>
              <a className="flex items-center justify-center py-12">
                <BiHomeCircle fontSize={40} color="#5271ff" />
              </a>
            </Link>
            <Link href={'/admin/messages'}>
              <a className="relative flex items-center justify-center py-12">
                <FaRegEnvelope fontSize={40} color="#5271ff" />
                <div className="absolute left-3 top-11 h-5 w-5 rounded-full bg-red-500"></div>
              </a>
            </Link>
            <Link href={'/admin/profile'}>
              <a className="flex items-center justify-center py-12">
                <FaBriefcase fontSize={40} color="#5271ff" />
              </a>
            </Link>
            <Link href={'/admin/users'}>
              <a className="flex items-center justify-center py-12">
                <FaUsers fontSize={40} color="#5271ff" />
              </a>
            </Link>
          </Navbar.Section>
          <Navbar.Section>
            <Divider color="#5271ff" />
            <div className="flex items-center justify-center py-6">
              <UnstyledButton type="button" onClick={handleLogout}>
                <FaPowerOff fontSize={40} fontWeight={100} color="#5271ff" />
              </UnstyledButton>
            </div>
          </Navbar.Section>
        </Navbar>
      </div>
      {/* Mobile navigation */}
      <div className="md:hidden">
        <Drawer
          aria-labelledby="drawer-title"
          aria-describedby="drawer-body"
          closeButtonLabel="Close drawer"
          opened={opened}
          onClose={() => setOpened(false)}
          padding="xl"
          size="xs"
          position="left"
          title={
            <div
              id="drawer-title"
              className="relative flex flex-col items-center justify-center "
            >
              <Link href={'/'}>
                <a>
                  <Image
                    src={'/android-chrome-512x512.png'}
                    width={70}
                    height={70}
                  />
                </a>
              </Link>
            </div>
          }
        >
          <nav>
            <div className="mb-4 flex flex-col space-y-8">
              <Link href={'/admin/editor-portal'}>
                <a className="relative flex flex-col items-center justify-center ">
                  <BiHomeCircle fontSize={40} color="#5271ff" />
                  <span className="text-xl capitalize text-[#5271ff]">
                    Portal Home
                  </span>
                </a>
              </Link>
              <Link href={'/admin/messages'}>
                <a className="relative flex flex-col items-center justify-center ">
                  <FaRegEnvelope fontSize={40} color="#5271ff" />
                  <span className="text-xl capitalize text-[#5271ff]">
                    messages
                  </span>
                </a>
              </Link>
              <Link href={'/admin/profile'}>
                <a className="relative flex flex-col items-center justify-center ">
                  <FaBriefcase fontSize={40} color="#5271ff" />
                  <span className="text-xl capitalize text-[#5271ff]">
                    messages
                  </span>
                </a>
              </Link>
              <Link href={'/admin/users'}>
                <a className="relative flex flex-col items-center justify-center ">
                  <FaUsers fontSize={40} color="#5271ff" />
                  <span className="text-xl capitalize text-[#5271ff]">
                    Users
                  </span>
                </a>
              </Link>
            </div>
            <div>
              <Divider color="#5271ff" />
              <div className="relative my-4 flex flex-col items-center justify-center">
                <UnstyledButton type="button" onClick={handleLogout}>
                  <FaPowerOff fontSize={40} fontWeight={100} color="#5271ff" />
                </UnstyledButton>
                <span className="text-xl capitalize text-[#5271ff]">
                  Sign Out
                </span>
              </div>
            </div>
          </nav>
        </Drawer>
      </div>
    </header>
  )
}

export default AdminSidebar
