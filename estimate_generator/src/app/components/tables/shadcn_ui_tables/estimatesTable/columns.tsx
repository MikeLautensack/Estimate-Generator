"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Estimates } from "@/types/estimates"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { Button } from "../../../ui/button"
import { Checkbox } from "../../../ui/checkbox"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export const columns: ColumnDef<Estimates>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "estimate_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estimate Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "project_address",
    header: "Project Address",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const estimates = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Estimate Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Estimates</DropdownMenuItem>
            <DropdownMenuItem>Edit Estimates</DropdownMenuItem>
            <DropdownMenuItem>Delete Estimates</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
