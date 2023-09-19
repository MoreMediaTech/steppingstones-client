import { columns } from "./table-column";
import { DataTable } from "@components/table/data-table";
import { PartialSourceDirectoryProps } from "@models/SourceDirectory";

interface ISourceDirectoryTableProps {
  data: PartialSourceDirectoryProps[];
}

export function SourceDirectoryTable({ data }: ISourceDirectoryTableProps) {
  return (
    <>
      <DataTable columns={columns} data={data} name="description" />
    </>
  );
}
