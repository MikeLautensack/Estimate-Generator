"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChangeOrder } from "@/types/changeOrders";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<ChangeOrder>[] = [
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
    accessorKey: "changeOrderName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Change Order Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "estimateName",
    header: "Estimate Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "projectAddress",
    header: "Project Address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const changeOrder = row.original;
      // const router = useRouter()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Change Order Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
              href={`${process.env["NEXT_PUBLIC_CUSTOMER_CHANGE_ORDER"]}?changeOrderId=${changeOrder.id}`}
            >
              <DropdownMenuItem>View Change Order</DropdownMenuItem>
            </Link>
            <Link
              href={`${process.env["NEXT_PUBLIC_CUSTOMER_CHANGE_ORDERS"]}/edit-change-order?estimateId=${changeOrder.estimate_id}&changeOrderId=${changeOrder.id}`}
            >
              <DropdownMenuItem>Edit Change Order</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
