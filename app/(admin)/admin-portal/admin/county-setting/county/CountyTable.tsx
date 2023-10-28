import { CountySchemaProps } from "@models/County";
import { columns } from "./table-columns";
import { DataTable } from "@components/table/data-table";

interface CountyTableProps {
  countyData: CountySchemaProps[];
}

export function CountyTable({ countyData }: CountyTableProps) {
  return (
    <>
      <DataTable columns={columns} data={countyData} name="name" />
    </>
  );
}
