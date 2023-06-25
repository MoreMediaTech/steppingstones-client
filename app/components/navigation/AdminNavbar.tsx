'use client'
import { useEffect, useState } from 'react'
import {
  Burger,
  Divider,
  Group,
  Header,
  MantineTheme,
  MediaQuery,
  Menu,
  UnstyledButton,
} from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from 'app/global-state/hooks'
import {
  globalSelector,
  setDrawerOpened,
} from 'app/global-state/features/global/globalSlice'

interface IAdminNavbar {
  theme: MantineTheme
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  handleLogout: () => void
}

const AdminNavbar = ({
  theme,
  opened,
  setOpened,
  handleLogout,
}: IAdminNavbar) => {
  const dispatch = useAppDispatch()
  const { drawerOpened } = useAppSelector(globalSelector)
  const router = useRouter()
  const [pos, setPos] = useState<string>('top')
  const title = drawerOpened ? 'Close navigation' : 'Open navigation'

  // Check the top position of the navigation in the window
  useEffect(() => {
    const handleScrollTop = () => {
      const scrolled = document?.scrollingElement?.scrollTop as number
      if (scrolled >= 2) {
        setPos('moved')
      } else {
        setPos('top')
      }
    }
    document.addEventListener('scroll', handleScrollTop)
    return () => document.removeEventListener('scroll', handleScrollTop)
  }, [])

  return (
    <Header
      height={70}
      p="md"
      className={`${
        pos === 'top' ? 'absolute  ' : 'shadow-b-2xl fixed bg-white '
      }`}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <div className="flex w-full items-center justify-between">
          <div className=" flex items-center px-4 py-2  ">
            <Burger
              opened={drawerOpened}
              aria-label={title}
              onClick={() => dispatch(setDrawerOpened(!drawerOpened))}
              title={title}
              color="#00dcb3"
            />
          </div>
          <UnstyledButton
            onClick={() => {
              router.push('/')
            }}
          >
            <Group>
              <div className="w-50 h-50 -mb-4">
                <Image
                  src={'/SteppingStonesLogo2.png'}
                  alt="Stepping Stones Logo"
                  width={80}
                  height={80}
                />
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
          <div className="hidden md:block">
            <Menu position="left">
              <Menu.Label>Application</Menu.Label>
              <Menu.Item onClick={() => router.push('/auth/profile')}>
                Profile
              </Menu.Item>
              <Divider />
              <Menu.Item
                icon={<FaSignOutAlt fontSize={14} />}
                onClick={() => {
                  handleLogout()
                }}
              >
                <span>Logout</span>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
      </div>
    </Header>
  )
}

export default AdminNavbar