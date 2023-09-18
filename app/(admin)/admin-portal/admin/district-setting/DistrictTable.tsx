// components
import { DataTable } from '@components/table/data-table'
import { columns } from './table-column'
import { DistrictSchemaProps } from '@models/District'

interface IDistrictTableProps {
  districtData: DistrictSchemaProps[]
}

export function DistrictTable({
  districtData,

}: IDistrictTableProps) {

  return (
    <>
      <DataTable columns={columns} data={districtData} name="name" />
    </>
  )
}
