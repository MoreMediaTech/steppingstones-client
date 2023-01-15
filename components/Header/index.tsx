import React from 'react'
import { Box, Title, Group, TitleOrder } from '@mantine/core'

type Props = {
  title: string
  subtitle?: string
  bcg?: string
  order: TitleOrder
  icon?: React.ReactElement
}

function Header({ title, order, subtitle, icon, bcg }: Props) {
  return (
    <Box sx={{width: '100%'}}>
      <Group spacing="xl" grow>
        <Title order={order}>{title}</Title>
        {icon ? (
          <div
            className={`inline-flex items-center justify-center p-2 ${bcg} h-12 w-12 rounded-md text-white shadow-lg`}
          >
            {icon}
          </div>
        ) : null}
      </Group>
      <Title order={5} color="dimmed">
        {subtitle}
      </Title>
    </Box>
  )
}

export default Header
