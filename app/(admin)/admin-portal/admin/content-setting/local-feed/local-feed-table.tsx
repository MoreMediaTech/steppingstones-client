// components
import { DataTable } from "@components/table/data-table";
import { columns } from "./table-column";
import { PartialLocalFeedContentSchemaProps } from "@models/LocalFeedContent";

interface IDistrictTableProps {
  localFeedData: PartialLocalFeedContentSchemaProps[];
}

export function DistrictTable({ localFeedData }: IDistrictTableProps) {
  return (
    <>
      <DataTable columns={columns} data={localFeedData} name="name" />
    </>
  );
}
