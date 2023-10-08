"use client";
import React, { Suspense } from "react";
import { Loader, SimpleGrid } from "@components/mantine-components";

import { FaUsers } from "react-icons/fa";

// redux
import { useGetAnalyticsQuery } from "app/global-state/features/analytics/analyticsApiSlice";

import PerformanceChart from "./PerformanceChart";
import Header from "app/components/Header";
import StatsItem, { DefaultStatsProps } from "./StatsItem";
import BreakdownChart from "./BreakdownChart";
import { columns } from "./table-column";
import { DataTable } from "@components/table/data-table";

const defaultStats = (stats: any): DefaultStatsProps[] => {
  return [
    {
      title: "Online Users",
      count: stats.onlineUsers || 0,
      icon: <FaUsers fontSize={24} color="#005848" />,
      textColor: "text-[#005848]",
      borderColor: "border-[#005848]",
      bcg: "dark:bg-primary-dark-200 bg-primary-light-200",
    },
    {
      title: "Users Online Today",
      count: stats.onlineUsersToday || 0,
      icon: <FaUsers fontSize={24} color="#005848" />,
      textColor: "text-[#005848]",
      borderColor: "border-[#005848]",
      bcg: "dark:bg-primary-dark-200 bg-primary-light-200",
    },
    {
      title: "# of Users",
      count: stats.totalNumberUsers || 0,
      icon: <FaUsers fontSize={24} color="#005848" />,
      textColor: "text-[#005848]",
      borderColor: "border-[#005848]",
      bcg: "dark:bg-primary-dark-200 bg-primary-light-200",
    },
    {
      title: "isEmailVerified?",
      count: stats.totalNumberUsersEmailVerified || 0,
      icon: <FaUsers fontSize={24} color="#005848" />,
      textColor: "text-[#005848]",
      borderColor: "border-[#005848]",
      bcg: "dark:bg-primary-dark-200 bg-primary-light-200",
    },
  ];
};

export function RenderInsights() {
  const { data: analytics, isLoading } = useGetAnalyticsQuery();
  // add color scheme to bar in Performance Chart
  const performanceChartData = analytics?.averageLoadTimesByDay.map(
    (item: any) => {
      return {
        ...item,
        avgLoadTimeColor: "#005848",
      };
    }
  );

  const stats = {
    onlineUsers: analytics?.onlineUsers,
    onlineUsersToday: analytics?.onlineUsersToday,
    totalNumberUsers: analytics?.totalNumberUsers,
    totalNumberUsersEmailVerified: analytics?.totalNumberUsersEmailVerified,
  };

  if (isLoading) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader size="xl" variant="bars" />
      </div>
    );
  }
  return (
    <section>
      <div className="container mx-auto space-y-2 sm:max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl ">
        <div className="grid grid-cols-1 gap-8 w-full">
          <div className="mb-2 space-y-4 w-full">
            <Header
              title="User Stats"
              order={3}
              subtitle="View your user stats"
              subOrder={6}
            />

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" className="w-full">
              {defaultStats(stats).map((item, index) => (
                <StatsItem key={`stats-${index}`} {...item} />
              ))}
            </SimpleGrid>
          </div>
          <div className="mb-2 space-y-4">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="col-span-1 space-y-4">
                <Header
                  title="Performance"
                  order={3}
                  subtitle="Track your App performance over time"
                  subOrder={6}
                />
                <PerformanceChart data={performanceChartData} />
              </div>
              <div className="col-span-1 space-y-4">
                <Header
                  title="Breakdown"
                  order={3}
                  subtitle="Breakdown of screens viewed by users"
                  subOrder={6}
                />
                <SimpleGrid cols={1} spacing="lg">
                  <Suspense fallback={<Loader size="xl" variant="bars" />}>
                    <BreakdownChart
                      data={analytics.topFiveViewedScreensByDay || []}
                    />
                  </Suspense>
                </SimpleGrid>
              </div>
            </div>
          </div>
          <div className="mb-6 space-y-4">
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
  );
}
