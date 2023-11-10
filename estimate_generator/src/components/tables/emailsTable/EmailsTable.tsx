'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { TableProps } from "@/types/types"
import EmailsPagination from "./EmailsPagination"
import { Button } from "@/components/ui/button"
import PlaidVerifyIdentityEmail from "@/emails/plaid-verify-identity"
import { sendEmail } from "@/actions/emailActions"


export default function ChangeOrdersTable<TData, TValue>({
  columns,
  data,
}: TableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="">
      <Button
        className=""
        onClick={() => {
          sendEmail(
            'onboarding@resend.dev',
            'mikelautensack100@gmail.com',
            'testing action 123',
          )
        }}
      >
        testing resend
      </Button>
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
      <EmailsPagination
        table={table}
      />
    </div>
  )
}
