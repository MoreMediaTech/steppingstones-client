'use client';
import { forwardRef } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core'


interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: string
  name: string
  email: string
  initials?: string
  show?: boolean
  theme?: string
  icon?: React.ReactNode
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  (
    {
      image,
      name,
      email,
      icon,
      initials,
      show,
      theme,
      ...others
    }: UserButtonProps,
    ref
  ) => (
    <UnstyledButton
      ref={ref}
      sx={() => ({
        display: 'block',
        width: '100%',
        padding: '10px 15px',
        color: theme === 'dark' ? '#5515d4' : '#f9f8fc',

        '&:hover': {
          backgroundColor: theme === 'dark' ? '#5E17EB' : '#cfb9f9',
        },
      })}
      {...others}
    >
      <Group>
        <Avatar color="#5E17EB" radius="xl">
          {initials}
        </Avatar>

        <div style={{ flex: 1 }}>
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
)

UserButton.displayName = 'UserButton'

export default UserButton;
