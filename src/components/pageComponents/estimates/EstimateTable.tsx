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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type EstimateTableProps = {
  lineItems: LineItems[];
};

const EstimateTable = ({ lineItems }: EstimateTableProps) => {
  return (
    <TableContainer
      component="div"
      className="flex rounded-lg"
      sx={{ border: "solid 1px", borderColor: "outlineVariant" }}
    >
      <Table sx={{ minWidth: 700 }} size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item Name</StyledTableCell>
            <StyledTableCell>Item Description</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Rate</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems.map((item) => (
            <StyledTableRow key={item.item}>
              <StyledTableCell component="th" scope="row">
                {item.item}
              </StyledTableCell>
              <StyledTableCell>{item.description}</StyledTableCell>
              <StyledTableCell>{item.quantity}</StyledTableCell>
              <StyledTableCell>
                {formatRate(item.rateType, item.price.toString(), item.item)}
              </StyledTableCell>
              <StyledTableCell>
                {formatPriceString(item.amount.toString())}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EstimateTable;
