'use client';
import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { themeSettings } from '../../constants/styles'
import { Box } from '@mantine/core';
import { useTheme } from 'next-themes'
import { PaletteMode } from '@lib/types';

type DataProps = {
    name: string
    timesViewed: number
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

  const colors = [
    theme.palette.secondary?.[100],
    theme.palette.secondary?.[400],
    theme.palette.secondary?.[300],
    theme.palette.secondary?.[200],
    theme.palette.secondary?.[500],
  ]
  const formattedData = Object.entries(data).map(([name, timesViewed], i) => ({
    id: timesViewed.name,
    label: timesViewed.name,
    value: timesViewed.timesViewed,
    color: colors[i],
  }))


  return (
    <Box
      sx={{
        width: '100%',
        minWidth: '325px',
        minHeight: '325px',
        height: '420px',
        position: 'relative',
      }}
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary?.light,
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary?.light,
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary?.light,
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary?.light,
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary?.light,
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary?.main,
            },
          },
        }}
        colors={{ datum: 'data.color' }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary?.light}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 20,
            translateY: 50,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: theme.palette.primary?.light,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  )
}

export default BreakdownChart
