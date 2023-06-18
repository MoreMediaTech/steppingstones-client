'use client'
import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'

import { themeSettings } from '../../../../constants/styles'
import { Box } from '@components/mantine-components'
import { useTheme } from 'next-themes'
import { PaletteMode } from '@lib/types'

type DataProps = {
  name: string
  timesViewed: number
}

type RenderCustomizedLabelProps = {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
}

function BreakdownChart({
  data,
  isDashboard = false,
}: {
  data: DataProps[]
  isDashboard?: boolean
}) {
  const { theme: mode } = useTheme()
  const theme = themeSettings(mode as PaletteMode)

  const pieData = data.map((item) => ({
    name: item.name,
    value: item.timesViewed,
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff0000']

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: RenderCustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className='relative w-full h-[500px]'>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={600} height={600}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BreakdownChart
