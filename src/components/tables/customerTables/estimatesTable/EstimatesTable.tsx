"use client";

import { 
  flexRender, 
  SortingState, 
  ColumnFiltersState, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  useReactTable, 
  getPaginationRowModel, 
  RowSelectionState 
} from "@tanstack/react-table";
import { 
  Table, 
  TableBody,
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TableProps } from "@/types/types";
import EstimatesPagination from "./EstimatesPagination";
import { useState } from "react";
import { Input } from "../../../ui/input";

export default function EstimatesTable<TData, TValue>({
  columns,
  data,
}: TableProps<TData, TValue>) {

  const [ sorting, setSorting ] = useState<SortingState>([]);
  const [ columnFilters, setColumnFilters ] = useState<ColumnFiltersState>([]);
  const [ rowSelection, setRowSelection ] = useState<RowSelectionState>({});
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <div className="">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter estimate..."
          value={(table.getColumn("estimateName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("estimateName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headersGroup) => (
              <TableRow key={headersGroup.id}>
                {headersGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <EstimatesPagination
        table={table}
      />
    </div>
  )
}
