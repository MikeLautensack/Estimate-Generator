"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Estimates } from "@/types/estimates";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    accessorKey: "estimateName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estimate Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "projectAddress",
    header: "Project Address",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const estimate = row.original;
      const USER_ID = estimate.contractor_user_id;
      const CUSTOMER_ID = estimate.customer_id;
      const ESTIMATE_ID = estimate.id;
      const router = useRouter();
      const deleteEstimate = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
          {
            method: "DELETE",
          },
        );

        if (res.ok) {
          router.refresh();
        }
      };
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
            <Link
              href={`${process.env.NEXT_PUBLIC_HOST}/contractor-dashboard/estimates/${estimate.id}`}
            >
              <DropdownMenuItem>View Estimate</DropdownMenuItem>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_HOST}/contractor-dashboard/estimates/form/${estimate.id}`}
            >
              <DropdownMenuItem>Edit Estimate</DropdownMenuItem>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_HOST}/contractor-dashboard/estimates/${estimate.id}`}
            >
              <DropdownMenuItem>Handle Change Orders</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => deleteEstimate()}>
              Delete Estimates
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
