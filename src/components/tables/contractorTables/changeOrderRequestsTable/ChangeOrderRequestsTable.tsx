"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChangeOrderRequestsTableProps } from "@/types/types";
import { useEffect, useState } from "react";
import ChangeOrderRequestTableRow from "./ChangeOrderRequestTableRow";

export default function ChangeOrderRequestsTable({
  data,
  setId,
  id,
}: ChangeOrderRequestsTableProps) {
  const [ordersSelectedID, setOrdersSelectedID] = useState<number | null>(id);

  useEffect(() => {
    setId(ordersSelectedID);
  }, [ordersSelectedID, setId]);

  return (
    <div className="flex w-full h-32 rounded bg-neutral100 desktop:h-[calc(100vh-328px)]">
      <Table className="relative">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-scroll">
          {data.map((element) => (
            <ChangeOrderRequestTableRow
              orderRequest={{
                id: element.id,
                name: element.changeOrderName,
                description: element.description,
                status: element.status,
              }}
              ordersSelectedID={ordersSelectedID}
              setOrdersSelectedID={setOrdersSelectedID}
              key={element.id}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
