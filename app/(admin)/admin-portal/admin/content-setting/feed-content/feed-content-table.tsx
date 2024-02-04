import { FeedContentSchemaProps } from "@models/FeedContent";
import { columns } from "./table-columns";
import { DataTable } from "@components/table/data-table";

interface CountyTableProps {
  countyData: FeedContentSchemaProps[];
}

export function CountyTable({ countyData }: CountyTableProps) {
  return (
    <>
      <DataTable columns={columns} data={countyData} name="name" />
    </>
  );
}
