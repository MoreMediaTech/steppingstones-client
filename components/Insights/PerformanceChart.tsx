'use client';
import React from 'react'
import { Box } from '@mantine/core'
import { ResponsiveBar } from '@nivo/bar'

type PerformanceChartProps = {
    data: any
}

function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <Box sx={{ width: '100%', height: '325px' }}>
      <ResponsiveBar
        data={data}
        keys={['avgLoadTime']}
        theme={{
          textColor: '#9e9ac8',
          axis: {
            domain: {
              line: {
                stroke: '#9e9ac8',
              },
            },
            legend: {
              text: {
                fill: '#00dcb3',
              },
            },
            ticks: {
              line: {
                stroke: '#9e9ac8',
                strokeWidth: 1,
              },
            },
          },
          legends: {
            text: {
              fill: '#00dcb3',
            },
            
          },
          tooltip: {
            container: {
              background: '#bcbddc',
            },
          },
        }}
        defs={[
          {
            id: 'solid',
            type: 'patternDots',
            size: 1,
            padding: 0,
            stagger: false,
            background: 'inherit',
            color: '#00dcb3',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'avgLoadTime',
            },
            id: 'solid',
          },
        ]}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'greens' }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'date',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'time (s)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#002c24"
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Performance Bar Chart"
        barAriaLabel={function (e) {
          return `${e.id} ${e.value}`
        }}
      />
    </Box>
  )
}

export default PerformanceChart