'use client'
import React, { Suspense } from 'react'
import {
  Box,
  Container,
  Loader,
  SimpleGrid,
  Tabs,
  Text,
} from '@components/mantine-components'

import { FaUsers } from 'react-icons/fa'
import { FcSalesPerformance, FcFactoryBreakdown } from 'react-icons/fc'

// redux
import { useGetAnalyticsQuery } from 'app/global-state/features/analytics/analyticsApiSlice'

import PerformanceChart from './PerformanceChart'
import Header from 'app/components/Header'
import StatsItem, { DefaultStatsProps } from './StatsItem'
import BreakdownChart from './BreakdownChart'
import { columns } from './table-column'
import { DataTable } from '@components/table/data-table'

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

export function RenderInsights() {
  const { data: analytics, isLoading } = useGetAnalyticsQuery()
  console.log(analytics?.averageLoadTimesByDay)
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
                <Suspense fallback={<Loader size="xl" variant="bars" />}>
                  <BreakdownChart data={analytics.topFiveViewedScreensByDay || []} />
                </Suspense>
                <div className="rounded-md border p-2">
                  <DataTable
                    columns={columns}
                    data={analytics.viewedScreensByDay}
                    name="name"
                  />
                </div>
              </SimpleGrid>
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  )
}
