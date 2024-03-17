"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LineItems } from "@/types/estimates";
import { Button } from "../../../ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<LineItems>[] = [
  {
    accessorKey: "item",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]