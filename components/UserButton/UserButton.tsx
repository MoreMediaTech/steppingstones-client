import { forwardRef } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core'

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image?: string
  name: string
  email: string
  icon?: React.ReactNode
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
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
        {image && <Avatar src={image} radius="xl" />}

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <FaChevronRight fontSize={16} />}
      </Group>
    </UnstyledButton>
  )
)

export default UserButton;
