import { CountyDataProps } from '@lib/types'

import { columns } from './table-columns'
import { DataTable } from '@components/table/data-table'

interface CountyTableProps {
  countyData: CountyDataProps[]
}

export function CountyTable({ countyData }: CountyTableProps) {
  return (
    <>
      <DataTable columns={columns} data={countyData} name="name" />
    </>
  )
}
