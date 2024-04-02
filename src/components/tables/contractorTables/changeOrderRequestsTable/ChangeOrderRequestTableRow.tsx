"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { ChangeOrderRequestRowProps } from "@/types/changeOrders";
import { useEffect, useState } from "react";

const ChangeOrderRequestTableRow = ({
  orderRequest,
  ordersSelectedID,
  setOrdersSelectedID,
}: ChangeOrderRequestRowProps) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (ordersSelectedID === orderRequest.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [ordersSelectedID, setSelected, orderRequest.id]);

  return (
    <TableRow className={`${selected ? "border border-red-500" : ""}`}>
      <TableCell>
        <input
          checked={selected}
          type="checkbox"
          onChange={() => {
            if (!selected) {
              setSelected(true);
              setOrdersSelectedID(orderRequest.id);
            }
          }}
        ></input>
      </TableCell>
      <TableCell>{orderRequest.name}</TableCell>
      <TableCell>{orderRequest.description}</TableCell>
      <TableCell>{orderRequest.status}</TableCell>
    </TableRow>
  );
};
export default ChangeOrderRequestTableRow;
