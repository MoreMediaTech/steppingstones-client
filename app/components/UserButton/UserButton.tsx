'use client'
import { forwardRef } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core'
import { useTheme } from 'next-themes'

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: string
  name: string
  email: string
  initials?: string
  show?: boolean
  icon?: React.ReactNode
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  (
    { image, name, email, icon, initials, show, ...others }: UserButtonProps,
    ref
  ) => {
    const { theme } = useTheme()
    return (
      <UnstyledButton
        ref={ref}
        sx={() => ({
          display: 'block',
          width: '100%',
          padding: '10px 15px',
          color: theme === 'dark' ? '#5515d4' : '#f9f8fc',

          '&:hover': {
            backgroundColor: theme === 'dark' ? '#3b3c40' : '#cfb9f9',
          },
        })}
        {...others}
      >
        <Group>
          <Avatar color="#5E17EB" radius="xl">
            {initials}
          </Avatar>

          <div className="hidden lg:block" style={{ flex: 1 }}>
            <Text size="sm" color="#5E17EB" weight={500}>
              {name}
            </Text>

            <Text color="#00DCB3" size="xs">
              {email}
            </Text>
          </div>

          {show && (icon || <FaChevronRight fontSize={16} color="#5E17EB" />)}
        </Group>
      </UnstyledButton>
    )
  }
)

UserButton.displayName = 'UserButton'

export default UserButton
