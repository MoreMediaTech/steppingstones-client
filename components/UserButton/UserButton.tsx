import { forwardRef } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core'

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
  ) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
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

        {show && (icon || <FaChevronRight fontSize={16} />)}
      </Group>
    </UnstyledButton>
  )
)

UserButton.displayName = 'UserButton'

export default UserButton;
