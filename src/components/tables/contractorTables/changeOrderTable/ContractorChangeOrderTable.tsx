"use client";

import TableMenu from "@/components/misc/TableMenu";
import { ChangeOrder } from "@/types/changeOrders";
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

type ContractorChangeOrderTableProps = {
  changeOrders: ChangeOrder[];
};

const ContractorChangeOrderTable = ({
  changeOrders,
}: ContractorChangeOrderTableProps) => {
  return (
    <TableContainer
      component="div"
      sx={{ border: "solid 1px", borderColor: "outlineVariant" }}
      className="rounded-md"
    >
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Change Order Name</StyledTableCell>
            <StyledTableCell>Estimate Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell>Project Address</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {changeOrders.map((order) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell component="th" scope="row">
                {order.changeOrderName}
              </StyledTableCell>
              <StyledTableCell>{order.estimateName}</StyledTableCell>
              <StyledTableCell>{order.description}</StyledTableCell>
              <StyledTableCell>{order.customerName}</StyledTableCell>
              <StyledTableCell>{order.projectAddress}</StyledTableCell>
              <StyledTableCell>{order.status}</StyledTableCell>
              <StyledTableCell>
                <TableMenu
                  menuItems={[
                    {
                      id: 0,
                      name: "View Change Order",
                      link: `${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/change-orders/change-order/${order.id}`,
                    },
                    {
                      id: 2,
                      name: "View Estimate",
                      link: `${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/estimates/${order.estimate_id}`,
                    },
                  ]}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContractorChangeOrderTable;
