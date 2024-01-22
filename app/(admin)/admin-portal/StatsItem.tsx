"use client";

import React from "react";

import Header from "../../components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export type DefaultStatsProps = {
  title: string;
  count: number;
  icon: React.ReactElement;
  textColor: string;
  borderColor: string;
  bcg: string;
  percentageInc?: number;
};

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
    <Card className="w-full shadow-md shadow-green-300 dark:shadow-green-600">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Header title={title} order={5} />
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-xl font-semibold">{count}</div>
        {percentageInc ? (
          <p className="text-xs text-muted-foreground">
            {percentageInc} from last month
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default StatsItem;
