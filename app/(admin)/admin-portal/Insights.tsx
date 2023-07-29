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
    <section>
      <div className="container mx-auto sm:max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl space-y-2 py-8">
        <div className='grid grid-cols-1 gap-8'>
          <div>
            <div className="flex items-center">
              <Header
                title="User Stats"
                order={3}
                iconLeft={<FaUsers fontSize={24} color="#fff" />}
                subtitle="View your user stats"
                subOrder={6}
              />
            </div>
            <SimpleGrid
              cols={4}
              breakpoints={[{ maxWidth: 980, cols: 1, spacing: 'md' }]}
            >
              {defaultStats(stats).map((item, index) => (
                <StatsItem key={`stats-${index}`} {...item} />
              ))}
            </SimpleGrid>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="col-span-1">
                <Header
                  title="Performance"
                  order={3}
                  subtitle="Track your App performance over time"
                  subOrder={6}
                />
                <PerformanceChart data={performanceChartData} />
              </div>
              <div className="col-span-1">
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
                    <BreakdownChart
                      data={analytics.topFiveViewedScreensByDay || []}
                    />
                  </Suspense>
                </SimpleGrid>
              </div>
            </div>
          </div>
          <div>
            <Header
              title="Viewed Screens"
              order={3}
              subtitle="Viewed screens by day"
              subOrder={6}
            />
            <div className="rounded-md border p-2">
              <DataTable
                columns={columns}
                data={analytics.viewedScreensByDay}
                name="name"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
