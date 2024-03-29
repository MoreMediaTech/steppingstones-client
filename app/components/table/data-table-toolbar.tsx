"use client";

import { Table } from "@tanstack/react-table";
import { Trash, X } from "lucide-react";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DataTableViewOptions } from ".//data-table-view-options";

import { priorities, statuses } from "../../../data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  name: string;
  handleDeleteManyById?: (rows: TData[]) => void;
}

export function DataTableToolbar<TData>({
  table,
  name,
  handleDeleteManyById,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  const selectedRows = table
    .getRowModel()
    .rows.filter((row) => row.getIsSelected())
    .map((row) => row.original);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn(name)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(name)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn('status') ? (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        ) : null}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title="Priority"
            options={priorities}
          />
        )} */}
        {selectedRows.length > 0 && (
          <Button
            variant="outline"
            onClick={() => handleDeleteManyById?.(selectedRows)}
            className=" gap-2 border-red-500 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash fontSize={28} />
            <span>Delete</span>
          </Button>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
