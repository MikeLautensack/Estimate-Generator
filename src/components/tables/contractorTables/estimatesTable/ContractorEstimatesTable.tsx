"use client";

import { Estimates } from "@/types/estimates";
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
import EstimatesTableMenu from "./EstimatesTableMenu";
import { formatPriceString } from "@/utils/formatingFunctions";

type ContractorEstimatesTableProps = {
  estimates: Estimates[];
};

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

const ContractorEstimatesTable = ({
  estimates,
}: ContractorEstimatesTableProps) => {
  return (
    <TableContainer
      component="div"
      sx={{ border: "solid 1px", borderColor: "outlineVariant" }}
      className="rounded-md"
    >
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Estimate Name</StyledTableCell>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell>Project Address</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {estimates.map((estimate) => (
            <StyledTableRow key={estimate.id}>
              <StyledTableCell component="th" scope="row">
                {estimate.estimateName}
              </StyledTableCell>
              <StyledTableCell>{estimate.customerName}</StyledTableCell>
              <StyledTableCell>{estimate.projectAddress}</StyledTableCell>
              <StyledTableCell>
                {formatPriceString(estimate.total.toString())}
              </StyledTableCell>
              <StyledTableCell>{estimate.status}</StyledTableCell>
              <StyledTableCell>
                <EstimatesTableMenu estimate={estimate} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContractorEstimatesTable;
