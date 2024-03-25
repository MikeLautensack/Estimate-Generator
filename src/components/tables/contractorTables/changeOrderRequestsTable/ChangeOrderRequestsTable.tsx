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
  const [ordersSelectedState, setOrdersSelectedState] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    setOrdersSelectedState(
      data.reduce(
        (obj, item) => {
          if (id === item.id) {
            obj[item.id] = true;
          } else {
            obj[item.id] = false;
          }

          return obj;
        },
        {} as { [key: number]: boolean },
      ),
    );
  }, []);

  useEffect(() => {
    setOrdersSelectedState(
      data.reduce(
        (obj, item) => {
          if (id === item.id) {
            obj[item.id] = true;
          } else {
            obj[item.id] = false;
          }
          return obj;
        },
        {} as { [key: number]: boolean },
      ),
    );
  }, [data]);

  useEffect(() => {
    const obj = { ...ordersSelectedState };
    for (const key in ordersSelectedState) {
      if (obj[key] == true) {
        setId(parseInt(key));
      }
    }
  }, [ordersSelectedState]);

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
          {data.map((element, index) => (
            <ChangeOrderRequestTableRow
              orderRequest={{
                name: data[index].changeOrderName as string,
                description: data[index].description as string,
                status: data[index].status as string,
              }}
              ordersSelectedState={ordersSelectedState}
              setOrdersSelectedState={setOrdersSelectedState}
              key={data[index].id}
              id={data[index].id}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
