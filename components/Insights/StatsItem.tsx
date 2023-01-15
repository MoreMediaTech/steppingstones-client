import React from 'react'

import Header from '../Header'

export type DefaultStatsProps = {
  title: string
  count: number
  icon: React.ReactElement
  textColor: string
  borderColor: string
  bcg: string
}

function StatsItem({
  count,
  title,
  icon,
  textColor,
  borderColor,
  bcg,
}: DefaultStatsProps) {
  return <div
      className={`p-2 bg-white $ dark:bg-gray-900 shadow-xl mt-5 mx-2 md:p-4 border-b-4 rounded-md ${borderColor}`}
    >
        <Header title={title} order={5} icon={icon} />
 <span
          className={`inline-flex items-center justify-center p-2 ${textColor} rounded-md shadow-lg text-white w-12 h-12`}
        >
          {count}
        </span>
    </div>
}

export default StatsItem