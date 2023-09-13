"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChangeOrder } from "@/types/types"

export const columns: ColumnDef<ChangeOrder>[] = [
  {
    accessorKey: "estimateName",
    header: "Estimate Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
