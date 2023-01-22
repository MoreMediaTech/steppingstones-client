import React from 'react'
import { Box, Title, Group, TitleOrder, ThemeIcon } from '@mantine/core'

type Props = {
  title: string
  subtitle?: string
  bcg?: string
  order: TitleOrder
  subOrder?: TitleOrder
  icon?: React.ReactElement
}

function Header({ title, order, subOrder, subtitle, icon, bcg }: Props) {
  return (
    <Box sx={{ width: '100%', marginBottom: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title order={order} className="text-gray-800 dark:text-gray-100">
          {title}
        </Title>
        {icon ? (
          <Box
            className={`flex items-center ${bcg} rounded-md shadow-lg`}
          >
            <ThemeIcon  radius="md" size="xl" color="violet">
              {icon}
            </ThemeIcon>
          </Box>
        ) : null}
      </Box>
      <Title order={subOrder} color="dimmed">
        {subtitle}
      </Title>
    </Box>
  )
}

export default Header
