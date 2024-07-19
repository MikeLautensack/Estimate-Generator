import TableMenu from "@/components/misc/TableMenu";
import { ChangeOrder } from "@/types/changeOrders";
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

type OrdersPerEstimateTableProps = {
  changeOrders: ChangeOrder[];
};

const OrdersPerEstimateTable = ({
  changeOrders,
}: OrdersPerEstimateTableProps) => {
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
              <StyledTableCell>{order.projectAddress}</StyledTableCell>
              <StyledTableCell>{order.status}</StyledTableCell>
              <StyledTableCell>
                <TableMenu
                  menuItems={[
                    {
                      id: 0,
                      name: "View Change Order",
                      link: `customer-dashboard/change-orders/change-order/${order.id}`,
                    },
                    {
                      id: 1,
                      name: "Edit Change Order",
                      link: `customer-dashboard/change-orders/edit-change-order/${order.id}`,
                    },
                    {
                      id: 2,
                      name: "View Estimate",
                      link: `customer-dashboard/estimates/${order.estimate_id}`,
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

export default OrdersPerEstimateTable;
