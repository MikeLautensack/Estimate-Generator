"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Customers } from "@/types/customers"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { Button } from "../../ui/button"
import { Checkbox } from "../../ui/checkbox"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<Customers>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original
      const router = useRouter()
      const deleteCustomer = async () => {
        const res = await fetch(`http://localhost:3000/api/customers/delete/${customer.id}`, {
          method: 'DELETE',
        })

        if(res.ok) {
          router.refresh()
        }
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Customer Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
              href={`http://localhost:3000/customers/${customer.id}`}
            >
              <DropdownMenuItem>View Customer</DropdownMenuItem>
            </Link>
            <Link
              href={`http://localhost:3000/customers/form/${customer.id}`}
            >
              <DropdownMenuItem>Edit Customer</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => deleteCustomer()}
            >
              Delete Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
