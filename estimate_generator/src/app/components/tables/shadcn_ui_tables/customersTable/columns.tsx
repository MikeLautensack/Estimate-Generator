"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChangeOrder } from "@/types/types"

export const columns: ColumnDef<ChangeOrder>[] = [
  {
    accessorKey: "customers",
    header: "Customers",
  },
]
