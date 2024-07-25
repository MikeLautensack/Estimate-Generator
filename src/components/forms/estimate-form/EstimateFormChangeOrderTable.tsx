import ChangeOrdersTableMenu from "@/components/misc/ChangeOrdersTableMenu";
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

type EstimateFormChangeOrderTableProps = {
  changeOrders: any[];
};

const EstimateFormChangeOrderTable = ({
  changeOrders,
}: EstimateFormChangeOrderTableProps) => {
  console.log("testing change orders", changeOrders);
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
            <StyledTableCell>Description</StyledTableCell>
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
              <StyledTableCell>{order.description}</StyledTableCell>
              <StyledTableCell>{order.status}</StyledTableCell>
              <StyledTableCell>
                <ChangeOrdersTableMenu order={order} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EstimateFormChangeOrderTable;
