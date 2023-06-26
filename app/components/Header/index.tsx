'use client'
import React from 'react'
import {
  Box,
  Title,
  Group,
  TitleOrder,
  ThemeIcon,
} from '@components/mantine-components'

type Props = {
  title: string
  subtitle?: string
  bcg?: string
  order: TitleOrder
  subOrder?: TitleOrder
  iconRight?: React.ReactElement
  iconLeft?: React.ReactElement
}

function Header({
  title,
  order,
  subOrder,
  subtitle,
  iconRight,
  iconLeft,
  bcg,
}: Props) {
  return (
    <Box sx={{ width: '100%', marginBottom: '1rem' }}>
      <div className="flex items-center gap-1"
      >
        {iconLeft ? (
          <Box className={`flex items-center rounded-md shadow-lg`}>
            <ThemeIcon radius="md" size="xl" color="lightgreen">
              {iconLeft}
            </ThemeIcon>
          </Box>
        ) : null}
        <Title order={order} className="text-gray-800 dark:text-gray-100">
          {title}
        </Title>
        {iconRight ? (
          <Box className={`flex items-center rounded-md shadow-lg`}>
            <ThemeIcon radius="md" size="xl" color="violet">
              {iconRight}
            </ThemeIcon>
          </Box>
        ) : null}
      </div>
      <Title order={subOrder} color="dimmed">
        {subtitle}
      </Title>
    </Box>
  )
}

export default Header
