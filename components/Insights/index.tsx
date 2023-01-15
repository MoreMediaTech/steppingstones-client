import React from 'react'
import { Box, Container, Flex, SimpleGrid } from '@mantine/core'
import { HiUser, HiUserGroup } from 'react-icons/hi'
import { FaUsers } from 'react-icons/fa'
import { useGetAnalyticsQuery } from 'features/analytics/analyticsApiSlice'

import PerformanceChart from './PerformanceChart'
import Header from 'components/Header'
import StatsItem, { DefaultStatsProps } from './StatsItem'
import BreakdownChart from './BreakdownChart'

const defaultStats = (stats: any): DefaultStatsProps[] => {
  return [
    {
      title: 'Online Users',
      count: stats.onlineUsers || 0,
      icon: <HiUserGroup fontSize={18} color="#e9b949" />,
      textColor: 'text-amber-500',
      borderColor: 'border-amber-500',
      bcg: 'bg-amber-100',
    },
    {
      title: 'Users Online Today',
      count: stats.onlineUsersToday || 0,
      icon: <FaUsers fontSize={18} color="#647acb" />,
      textColor: 'text-indigo-500',
      borderColor: 'border-indigo-500',
      bcg: 'bg-indigo-100',
    },
    {
      title: '# of Users',
      count: stats.totalNumberUsers || 0,
      icon: <FaUsers fontSize={18} color="#647acb" />,
      textColor: 'text-indigo-500',
      borderColor: 'border-indigo-500',
      bcg: 'bg-indigo-100',
    },
    {
      title: 'isEmailVerified?',
      count: stats.totalNumberUsersEmailVerified || 0,
      icon: <FaUsers fontSize={18} color="#647acb" />,
      textColor: 'text-indigo-500',
      borderColor: 'border-indigo-500',
      bcg: 'bg-indigo-100',
    },
  ]
}

function RenderInsights() {
  const { data: analytics, isLoading } = useGetAnalyticsQuery()
  // add color scheme to bar in Performance Chart
  const performanceChartData = analytics?.averageLoadTimesByDay.map(
    (item: any) => {
      return {
        ...item,
        avgLoadTimeColor: '#9e9ac8',
      }
    }
  )
  const stats = {
    onlineUsers: analytics?.onlineUsers,
    onlineUsersToday: analytics?.onlineUsersToday,
    totalNumberUsers: analytics?.totalNumberUsers,
    totalNumberUsersEmailVerified: analytics?.totalNumberUsersEmailVerified,
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='overflow-y-auto'>
    <Container size="lg" px="xs">
      <Box
        sx={{
          marginTop: '1rem',
          marginLeft: '1rem',
        }}
      >
        <Header
          title="Insights"
          order={2}
          subtitle="See how your site is performing"
        />
      </Box>
      <SimpleGrid cols={1}>
        <Box
          sx={{
            marginTop: '0.5rem',
            marginLeft: '0.5rem',
          }}
        >
          <SimpleGrid cols={2}>
            {defaultStats(stats).map((item, index) => (
              <StatsItem key={`stats-${index}`} {...item} />
            ))}
          </SimpleGrid>
        </Box>
        <PerformanceChart data={performanceChartData} />
      </SimpleGrid>
      <SimpleGrid cols={2}>
        <BreakdownChart data={analytics.topFiveViewedScreensByDay} />
      </SimpleGrid>
    </Container>
    </div>
  )
}

export default RenderInsights
