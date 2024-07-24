"use client";

import { Customers } from "@/types/customers";
import {
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
import ContractorsCustomersTableMenu from "./ContractorsCustomersTableMenu";
import { formatPhoneNumber } from "@/utils/formatingFunctions";

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

type ContractorsCustomersTableProps = {
  customers: Customers[];
};

const ContractorsCustomersTable = ({
  customers,
}: ContractorsCustomersTableProps) => {
  return (
    <TableContainer
      component="div"
      sx={{ border: "solid 1px", borderColor: "outlineVariant" }}
      className="rounded-md"
    >
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell>Customer Email</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <StyledTableRow key={customer.id}>
              <StyledTableCell component="th" scope="row">
                {customer.name}
              </StyledTableCell>
              <StyledTableCell>{customer.email}</StyledTableCell>
              <StyledTableCell>{customer.address}</StyledTableCell>
              <StyledTableCell>
                {formatPhoneNumber(customer.phone)}
              </StyledTableCell>
              <StyledTableCell>
                <ContractorsCustomersTableMenu customer={customer} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContractorsCustomersTable;
