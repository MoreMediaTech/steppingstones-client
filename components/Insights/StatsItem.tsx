'use client';
import { Box } from '@mantine/core'
import React from 'react'

import Header from '../Header'

export type DefaultStatsProps = {
  title: string
  count: number
  icon: React.ReactElement
  textColor: string
  borderColor: string
  bcg: string
  percentageInc?: number
}

function StatsItem({
  count,
  title,
  icon,
  textColor,
  borderColor,
  bcg,
  percentageInc,
}: DefaultStatsProps) {
  return (
    <Box
      className={`$ mx-2 mt-5 rounded-md border-b-4 bg-white px-4 py-2 shadow-xl ${borderColor} ${bcg}`}
    >
      <Header title={title} order={5} icon={icon} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          className={`inline-flex items-center justify-center p-2 ${textColor} h-12 w-12 rounded-md text-white shadow-lg`}
        >
          {count}
        </Box>

        {percentageInc ? (
          <Box
            className={`inline-flex items-center justify-center p-2 ${textColor} h-12 w-12 rounded-md text-white shadow-lg`}
          >
            {percentageInc}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default StatsItem
