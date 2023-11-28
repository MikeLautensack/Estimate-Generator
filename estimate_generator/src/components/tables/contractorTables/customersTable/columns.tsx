"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Customers } from "@/types/customers"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../ui/dropdown-menu"
import { Button } from "../../../ui/button"
import { Checkbox } from "../../../ui/checkbox"
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
    cell: function Cell({ row }) {
      const customer = row.original
      const router = useRouter()
      const delCustomer = async (id: number) => {
        const deleteCustomer = await fetch(`${process.env["NEXT_PUBLIC_CUSTOMERS_DELETE_URL"]}/${id}`, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json"
          }
        })
        const deleteUser = await fetch(`${process.env["NEXT_PUBLIC_USER_DELETE_URL"]}/${customer.customer_user_id}`, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json"
          }
        })
        router.refresh()
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
              href={`${process.env["NEXT_PUBLIC_CUSTOMERS_URL"]}/${customer.id}`}
            >
              <DropdownMenuItem>View Customer</DropdownMenuItem>
            </Link>
            <Link
              href={`${process.env["NEXT_PUBLIC_CUSTOMERS_FORM_URL"]}/${customer.id}`}
            >
              <DropdownMenuItem>Edit Customer</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => delCustomer(customer.id as number)}
            >
              Delete Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
