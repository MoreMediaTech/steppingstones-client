import React from 'react'
import { Box, Title, Group, TitleOrder } from '@mantine/core'

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
        <Title order={order}>{title}</Title>
        {icon ? (
          <Box
            className={`flex items-center justify-center p-2 ${bcg} h-12 w-12 rounded-md shadow-lg`}
          >
            {icon}
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
