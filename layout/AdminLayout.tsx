import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  Menu,
  Button,
  Divider,
} from '@mantine/core'
import Head from 'next/head'
import { CgMenuGridR } from 'react-icons/cg'
import Image from 'next/image'
import { UnstyledButton } from '@mantine/core'
import { FaSignOutAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'app/hooks'
import { authSelector, logout, reset } from 'features/auth/authSlice'

import { AdminNavbar } from '@components/navigation'
import { NEXT_URL } from '@config/index'
interface ILayout {
  title?: string
  description?: string
  children: React.ReactNode
}

const AdminLayout = ({
  title,
  description,
  children,
}: ILayout): JSX.Element => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    router.replace(`${NEXT_URL}`)
  }

  return (
    <div
      className="flex h-screen flex-col justify-between"
      aria-label="layout"
      data-testid="layout"
    >
      <Head>
        <title>{title} - Stepping Stones</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="application-name" content="Stepping Stones" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Stepping Stones" />
        <meta name="description" content={description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${title} | Stepping Stones`} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Stepping Stones" />
        <meta property="og:url" content="" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={<AdminNavbar opened={opened} />}
        header={
          <Header height={70} p="md">
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <div className="flex w-full items-center justify-between">
                <UnstyledButton
                  onClick={() => {
                    router.push('/')
                  }}
                >
                  <Group>
                    <div className="w-50 h-50 -mb-4">
                      <Image
                        src={'/SteppingStonesLogo2.png'}
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
                <div className="">
                  <Menu placement="start" position="left">
                    <Menu.Label>Application</Menu.Label>
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
        }
      >
        {children}
      </AppShell>
    </div>
  )
}

export default AdminLayout
