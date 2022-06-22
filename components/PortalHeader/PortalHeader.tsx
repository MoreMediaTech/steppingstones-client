import { useState } from 'react'
import { Avatar, Burger, Group, Text, TextInput } from '@mantine/core'
import { IoIosSearch } from 'react-icons/io'
import { CurrentUser, CountyDataProps } from '@lib/types'
import ContentDrawer from '@components/navigation/ContentDrawer/ContentDrawer'

const PortalHeader = ({
  user,
  title,
  subTitle,
  countyData,
}: {
  user?: CurrentUser
  title?: string
  subTitle?: string
  countyData?: CountyDataProps
}) => {
  const [opened, setOpened] = useState(false)
  const initials = user?.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')

  const drawerTitle = opened ? 'Close Content nav' : 'Open Content navigation'

  return (
    <header className="container mx-auto px-4 py-2 ">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="mb-2">
          <Group>
            <Avatar color="sky" radius="sm" size={'xl'}>
              {user ? (
                initials
              ) : (
                <span className="px-2 text-xs">{title} County Portal</span>
              )}
            </Avatar>

            <div style={{ flex: 1 }}>
              <Text size="xl" weight={500} color="#00a8a8">
                {user ? ` Welcome back ${user?.name?.split(' ')[0]}` : title}
              </Text>

              <Text color="#3848f1" size="md">
                {user ? 'Please select from the menu below' : subTitle}
              </Text>
            </div>
          </Group>
        </div>
        <div className="flex w-full items-center space-x-4 md:w-96">
          <TextInput
            aria-label="search-input"
            placeholder="Search"
            icon={<IoIosSearch fontSize={30} fontWeight={500} />}
            size="lg"
            radius="md"
            className="w-full rounded-xl  bg-transparent shadow-xl"
          />
          <div className={!!countyData ? 'display: flex' : 'hidden'}>
            {!!countyData && (
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                title={drawerTitle}
                size={50}
                color="#00dcb3"
              />
            )}
          </div>
        </div>
      </div>
      <ContentDrawer
        opened={opened}
        setOpened={setOpened}
        countyData={countyData as CountyDataProps}
      />
    </header>
  )
}

export default PortalHeader
