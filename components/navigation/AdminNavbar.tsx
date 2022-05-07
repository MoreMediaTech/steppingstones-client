import { Burger, Divider, Group, Header, MantineTheme, MediaQuery, Menu, UnstyledButton } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'

interface IAdminNavbar {
  theme: MantineTheme
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  handleLogout: () => void
}

const AdminNavbar = ({theme, opened, setOpened, handleLogout}: IAdminNavbar) => {
  const router = useRouter();
  return (
    <Header height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
  )
}

export default AdminNavbar