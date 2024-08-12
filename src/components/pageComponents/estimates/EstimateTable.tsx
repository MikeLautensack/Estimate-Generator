"use client";

import { LineItems } from "@/types/estimates";
import { formatPriceString, formatRate } from "@/utils/formatingFunctions";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

type EstimateTableProps = {
  lineItems: LineItems[];
};

const EstimateTable = ({ lineItems }: EstimateTableProps) => {
  return (
    <TableContainer
      component="div"
      className="flex"
      // sx={{ border: "solid 1px", borderColor: "outlineVariant" }}
    >
      <Table sx={{ minWidth: 700 }} size="small" aria-label="customized table">
        <TableHead sx={{ backgroundColor: "surfaceContainerHigh" }}>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Item Description</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems.map((item) => (
            <TableRow key={item.item}>
              <TableCell component="th" scope="row">
                {item.item}
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                {formatRate(item.rateType, item.price.toString(), item.item)}
              </TableCell>
              <TableCell>{formatPriceString(item.amount.toString())}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EstimateTable;
