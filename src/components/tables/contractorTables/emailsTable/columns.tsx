"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChangeOrder } from "../../../../types/changeOrders";

export const columns: ColumnDef<ChangeOrder>[] = [
  {
    accessorKey: "sender",
    header: "Sender",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
];
