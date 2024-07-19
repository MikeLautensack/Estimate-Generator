import TableMenu from "@/components/misc/TableMenu";
import { ChangeOrder } from "@/types/changeOrders";
import { formatPriceString } from "@/utils/formatingFunctions";
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
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

type CustomersEstimatesTableProps = {
  estimates: any[];
};

const CustomersEstimatesTable = ({
  estimates,
}: CustomersEstimatesTableProps) => {
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
                {formatPriceString(estimate.total)}
              </StyledTableCell>
              <StyledTableCell>{estimate.status}</StyledTableCell>
              <StyledTableCell>
                <TableMenu
                  menuItems={[
                    {
                      id: 0,
                      name: "View Estimate",
                      link: `customer-dashboard/estimates/${estimate.id}`,
                    },
                    {
                      id: 1,
                      name: "View Change Orders",
                      link: `customer-dashboard/change-orders?estimate-id=${estimate.id}`,
                    },
                    {
                      id: 2,
                      name: "Create New Change Order",
                      link: `customer-dashboard/change-orders/new-change-order?estimate-id=${estimate.id}`,
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

export default CustomersEstimatesTable;
