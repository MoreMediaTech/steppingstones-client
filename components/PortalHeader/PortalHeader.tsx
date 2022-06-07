import { CurrentUser } from '@lib/types'
import { Avatar, Group, Text, TextInput } from '@mantine/core'
import { IoIosSearch } from 'react-icons/io'
import React from 'react'

const PortalHeader = ({ user }: { user: CurrentUser }) => {
      const initials = user?.name
        ?.split(' ')
        ?.map((n) => n[0])
        ?.join('')

  return (
    <header className='px-4 py-2 '>
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <div className='mb-2'>
          <Group>
            <Avatar color="sky" radius="sm" size="xl">
              {initials}
            </Avatar>

            <div style={{ flex: 1 }}>
              <Text size="xl" weight={500} color="#00a8a8">
                Welcome back {user?.name?.split(' ')[0]}
              </Text>

              <Text color="#3848f1" size="md">
                Please select from the menu below
              </Text>
            </div>
          </Group>
        </div>
        <div className='w-full md:w-56'>
            <TextInput placeholder='Search' rightSection={<IoIosSearch />} />
        </div>
      </div>
    </header>
  )
}

export default PortalHeader