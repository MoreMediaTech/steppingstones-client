'use client'
import React from 'react'
import { Box, Container, Loader, SimpleGrid, Tabs, Text } from '@mantine/core'
import { DataGrid } from '@mui/x-data-grid'
import { FaUsers } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { FcSalesPerformance, FcFactoryBreakdown } from 'react-icons/fc'

// redux
import { useGetAnalyticsQuery } from 'app/global-state/features/analytics/analyticsApiSlice'

import PerformanceChart from './PerformanceChart'
import Header from 'components/Header'
import StatsItem, { DefaultStatsProps } from './StatsItem'
import BreakdownChart from './BreakdownChart'
import { themeSettings } from '../../constants/styles'
import { PaletteMode } from '@lib/types'

const defaultStats = (stats: any): DefaultStatsProps[] => {
  return [
    {
      title: 'Online Users',
      count: stats.onlineUsers || 0,
      icon: <FaUsers fontSize={24} color="#00dcb3" />,
      textColor: 'text-[#00dcb3]',
      borderColor: 'border-[#00dcb3]',
      bcg: 'dark:bg-primary-dark-200 bg-primary-light-200',
    },
    {
      title: 'Users Online Today',
      count: stats.onlineUsersToday || 0,
      icon: <FaUsers fontSize={24} color="#00dcb3" />,
      textColor: 'text-[#00dcb3]',
      borderColor: 'border-[#00dcb3]',
      bcg: 'dark:bg-primary-dark-200 bg-primary-light-200',
    },
    {
      title: '# of Users',
      count: stats.totalNumberUsers || 0,
      icon: <FaUsers fontSize={24} color="#00dcb3" />,
      textColor: 'text-[#00dcb3]',
      borderColor: 'border-[#00dcb3]',
      bcg: 'dark:bg-primary-dark-200 bg-primary-light-200',
    },
    {
      title: 'isEmailVerified?',
      count: stats.totalNumberUsersEmailVerified || 0,
      icon: <FaUsers fontSize={24} color="#00dcb3" />,
      textColor: 'text-[#00dcb3]',
      borderColor: 'border-[#00dcb3]',
      bcg: 'dark:bg-primary-dark-200 bg-primary-light-200',
    },
  ]
}

function RenderInsights() {
  const { data: analytics, isLoading } = useGetAnalyticsQuery()
  const { theme: mode } = useTheme()
  const theme = themeSettings(mode as PaletteMode)
  // add color scheme to bar in Performance Chart
  const performanceChartData = analytics?.averageLoadTimesByDay.map(
    (item: any) => {
      return {
        ...item,
        avgLoadTimeColor: '#00dcb3',
      }
    }
  )

  const stats = {
    onlineUsers: analytics?.onlineUsers,
    onlineUsersToday: analytics?.onlineUsersToday,
    totalNumberUsers: analytics?.totalNumberUsers,
    totalNumberUsersEmailVerified: analytics?.totalNumberUsersEmailVerified,
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'date', headerName: 'Date Viewed', flex: 0.5 },
    { field: 'timesViewed', headerName: '# of Views', flex: 0.4 },
  ]

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    )
  }
  return (
    <div className="overflow-y-auto">
      <Container size="lg" px="xs">
        <Box
          sx={{
            marginTop: '1rem',
            marginLeft: '1rem',
          }}
        >
          <Header title="Insights" order={2} />
        </Box>
        <Tabs
          color="violet"
          variant="outline"
          radius="xs"
          defaultValue="users"
          keepMounted={false}
        >
          <Tabs.List aria-label="Insights Tabs">
            <Tabs.Tab
              value="users"
              icon={<FaUsers fontSize={24} color="#00dcb3" />}
            >
              <Text
                fz="md"
                fw={500}
                className="text-gray-800 dark:text-gray-200"
              >
                Users
              </Text>
            </Tabs.Tab>
            <Tabs.Tab
              value="performance"
              icon={<FcSalesPerformance fontSize={24} />}
            >
              <Text
                fz="md"
                fw={500}
                className="text-gray-800 dark:text-gray-200"
              >
                App Performance
              </Text>
            </Tabs.Tab>
            <Tabs.Tab
              value="breakdown"
              icon={<FcFactoryBreakdown fontSize={24} />}
            >
              <Text
                fz="md"
                fw={500}
                className="text-gray-800 dark:text-gray-200"
              >
                Breakdown
              </Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="users" pt="xs">
            <Box
              sx={{
                marginTop: '1rem',
                marginLeft: '1rem',
              }}
            >
              <Header
                title="User Stats"
                order={3}
                subtitle="View your user stats"
                subOrder={6}
              />
              <SimpleGrid
                cols={2}
                breakpoints={[{ maxWidth: 980, cols: 1, spacing: 'md' }]}
              >
                {defaultStats(stats).map((item, index) => (
                  <StatsItem key={`stats-${index}`} {...item} />
                ))}
              </SimpleGrid>
            </Box>
          </Tabs.Panel>
          <Tabs.Panel value="performance" pt="xs">
            <Box
              sx={{
                marginTop: '1rem',
                marginLeft: '1rem',
              }}
            >
              <Header
                title="Performance"
                order={3}
                subtitle="Track your App performance over time"
                subOrder={6}
              />
              <PerformanceChart data={performanceChartData} />
            </Box>
          </Tabs.Panel>
          <Tabs.Panel value="breakdown" pt="xs">
            <Box
              sx={{
                marginTop: '1rem',
                marginLeft: '1rem',
                marginBottom: '1rem',
              }}
            >
              <Header
                title="Breakdown"
                order={3}
                subtitle="Breakdown of screens viewed by users"
                subOrder={6}
              />
              <SimpleGrid
                cols={1}
                breakpoints={[{ maxWidth: 980, cols: 1, spacing: 'md' }]}
              >
                <BreakdownChart data={analytics.topFiveViewedScreensByDay} />
                <Box
                  sx={{
                    '& .MuiDataGrid-root': {
                      border: 'none',
                      color: `${theme.palette.secondary?.[200]} !important`,
                    },
                    '& .MuiDataGrid-cell': {
                      borderBottom: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: theme.palette.background?.alt,
                      color: theme.palette.secondary?.[100],
                      borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                      backgroundColor: theme.palette.background?.alt,
                    },
                    '& .MuiDataGrid-footerContainer': {
                      backgroundColor: theme.palette.background?.alt,
                      color: theme.palette.secondary?.[100],
                      borderTop: 'none',
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                      color: `${theme.palette.secondary?.[200]} !important`,
                    },
                    '& .MuiTablePagination-selectLabel': {
                      color: `${theme.palette.secondary?.[200]} !important`,
                    },
                    '& .MuiInputBase-input': {
                      color: `${theme.palette.secondary?.[200]} !important`,
                    },
                    '& .MuiSelect-icon': {
                      color: `${theme.palette.secondary?.[200]} !important`,
                    },
                    '& .MuiTablePagination-displayedRows': {
                      color: `${theme.palette.secondary?.[200]} !important`,
                    },
                    '& .MuiIconButton-root': {
                      color: `${theme.palette.secondary?.[200]} !important`,
                    },
                    width: '100%',
                    minWidth: '325px',
                    minHeight: '325px',
                    height: '420px',
                  }}
                >
                  <DataGrid
                    loading={isLoading || !analytics}
                    getRowId={(row) => row.id}
                    rows={analytics.viewedScreensByDay || []}
                    columns={columns}
                    sx={{
                      boxShadow: 2,
                      border: 2,
                    }}
                  />
                </Box>
              </SimpleGrid>
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  )
}

export default RenderInsights
